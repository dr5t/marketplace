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

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export const createFeedback = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { rating, comment, imageUrl } = req.body;
    const userId = req.user!.id;
    
    // Simple check for image size (if provided as base64 or url)
    // Real image validation should happen via multer/middleware, 
    // but for now we trust the client to send < 5MB or check string length.
    if (imageUrl && imageUrl.length > 5 * 1024 * 1024 * 1.37) { // roughly 5MB in base64
        res.status(400).json({ message: 'Image too large (Max 5MB)' });
        return;
    }

    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const feedback = await prisma.feedback.create({
      data: { rating: Number(rating), comment, imageUrl, userId },
    });
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
