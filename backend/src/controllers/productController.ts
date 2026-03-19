import { Response } from 'express';
import { Server } from 'socket.io';
import prisma from '../utils/prisma';

// Define a custom Request type to include the user property from auth middleware
import { Request } from 'express';
interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export const getProducts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { search, categoryId, sellerId } = req.query;
    
    let targetSellerId = sellerId as string;
    if (sellerId === 'current' && req.user) {
      const profile = await prisma.sellerProfile.findUnique({ where: { userId: req.user.id } });
      if (profile) targetSellerId = profile.id;
    }

    const products = await prisma.product.findMany({
      where: {
        ...(search ? { title: { contains: (search as string), mode: 'insensitive' as const } } : {}),
        ...(categoryId ? { categoryId: categoryId as string } : {}),
        ...(targetSellerId ? { sellerId: targetSellerId } : {}),
      },
      include: { seller: true, category: true },
      orderBy: { createdAt: 'desc' },
    });
    
    // Parse images string back to array for each product
    const parsedProducts = products.map(p => ({
      ...p,
      images: JSON.parse(p.images)
    }));

    res.json(parsedProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: id as string },
      include: { seller: true, category: true, reviews: { include: { user: true } } },
    });
    if (!product) { res.status(404).json({ message: 'Not found' }); return; }
    
    const parsedProduct = {
      ...product,
      images: JSON.parse(product.images)
    };
    
    res.json(parsedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const getRecommendations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const currentProduct = await prisma.product.findUnique({ where: { id: id as string } });
    if (!currentProduct) { res.status(404).json({ message: 'Not found' }); return; }

    const recommendations = await prisma.product.findMany({
      where: {
        categoryId: currentProduct.categoryId,
        NOT: { id: id as string }
      },
      take: 4,
    });
    
    const parsedRecommendations = recommendations.map(r => ({
      ...r,
      images: JSON.parse(r.images)
    }));

    res.json(parsedRecommendations);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const createProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) { res.status(401).json({ message: 'Unauthorized' }); return; }
    
    const profile = await prisma.sellerProfile.findUnique({ where: { userId: req.user.id } });
    if (!profile) {
      // Auto-create profile if user is SELLER but profile missing
      if (req.user.role === 'SELLER') {
        const user = await prisma.user.findUnique({ where: { id: req.user.id } });
        await prisma.sellerProfile.create({
          data: { userId: req.user.id, storeName: user?.name || 'My Shop' }
        });
      } else {
        res.status(403).json({ message: 'Only sellers can create products' });
        return;
      }
    }

    const sellerProfile = await prisma.sellerProfile.findUnique({ where: { userId: req.user.id } });
    if (!sellerProfile) throw new Error("Could not find or create seller profile");

    // Ensure category exists or use default
    let { categoryId, categoryName } = req.body;
    if (!categoryId && categoryName) {
      const cat = await prisma.category.upsert({
        where: { name: categoryName },
        update: {},
        create: { name: categoryName }
      });
      categoryId = cat.id;
    }

    const { title, description, price, stock, images } = req.body;

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        images: JSON.stringify(images || []),
        sellerId: sellerProfile.id,
        categoryId: categoryId || (await prisma.category.findFirst())?.id || "",
      },
    });
    
    // Emit real-time update
    const io: Server = req.app.get('io');
    if (io) io.emit('product_created', product);

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};
