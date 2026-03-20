import { Request, Response } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import prisma from '../utils/prisma';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY as string,
  key_secret: process.env.RAZORPAY_SECRET as string,
});

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export const createPayment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { amount } = req.body;
    const options = {
      amount: Math.round(amount * 100), // in paisa
      currency: 'INR',
      receipt: 'vrindaa_rcpt_' + Date.now(),
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Payment creation failed', error: err });
  }
};

export const verifyPayment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cartItems, totalAmount } = req.body;
    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET as string)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      res.status(400).json({ success: false, message: 'Invalid signature' });
      return;
    }

    // Create the order in DB after payment verification
    const order = await prisma.order.create({
      data: {
        userId: req.user!.id,
        total: totalAmount,
        status: 'PAID',
        items: {
          create: cartItems.map((item: { productId: string; quantity: number }) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
    });

    // Clear the cart after successful payment and order creation
    await prisma.cartItem.deleteMany({
      where: { userId: req.user!.id }
    });

    res.json({ success: true, orderId: order.id });
  } catch (err) {
    res.status(500).json({ message: 'Payment verification failed', error: err });
  }
};
