import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getFeedbacks = async (_req: Request, res: Response): Promise<void> => {
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const createFeedback = async (req: Request, res: Response): Promise<void> => {
  try {
    const { rating, comment, imageUrl, userId } = req.body;
    
    // Simple check for image size (if provided as base64 or url)
    // Real image validation should happen via multer/middleware, 
    // but for now we trust the client to send < 5MB or check string length.
    if (imageUrl && imageUrl.length > 5 * 1024 * 1024 * 1.37) { // roughly 5MB in base64
        res.status(400).json({ message: 'Image too large (Max 5MB)' });
        return;
    }

    if (!userId) {
        res.status(400).json({ message: 'User ID is required' });
        return;
    }

    const feedback = await prisma.feedback.create({
      data: { rating: parseInt(rating), comment, imageUrl, userId },
    });
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
