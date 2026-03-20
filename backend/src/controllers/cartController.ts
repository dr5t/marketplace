import { Request, Response } from 'express';
import prisma from '../utils/prisma';

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export const addToCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user!.id;

    const existing = await prisma.cartItem.findFirst({ where: { userId, productId } });

    if (existing) {
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
      res.json(updated);
      return;
    }

    const item = await prisma.cartItem.create({ data: { userId, productId, quantity } });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const getCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const cart = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const removeFromCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { itemId } = req.params;
    const userId = req.user!.id;
    
    await prisma.cartItem.deleteMany({ 
      where: { 
        id: itemId as string,
        userId: userId
      } 
    });
    res.json({ message: 'Item removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
