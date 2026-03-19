import { Request, Response } from 'express';
import { Server } from 'socket.io';
import prisma from '../utils/prisma';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, categoryId } = req.query;
    const products = await prisma.product.findMany({
      where: {
        ...(search ? { title: { contains: (search as string), mode: 'insensitive' as const } } : {}),
        ...(categoryId ? { categoryId: categoryId as string } : {}),
      },
      include: { seller: true, category: true },
    });
    res.json(products);
  } catch (err) {
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
    res.json(product);
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
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await prisma.product.create({
      data: req.body,
    });
    
    // Emit real-time update
    const io: Server = req.app.get('io');
    io.emit('product_created', product);

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
