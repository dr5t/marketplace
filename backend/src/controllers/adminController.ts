import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getSiteConfig = async (_req: Request, res: Response): Promise<void> => {
  try {
    let config = await prisma.siteConfig.findUnique({ where: { id: 'default' } });
    if (!config) {
      config = await prisma.siteConfig.create({
        data: { id: 'default' }
      });
    }
    res.json(config);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const updateSiteConfig = async (req: Request, res: Response): Promise<void> => {
  try {
    const config = await prisma.siteConfig.upsert({
      where: { id: 'default' },
      update: req.body,
      create: { ...req.body, id: 'default' },
    });
    res.json(config);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
