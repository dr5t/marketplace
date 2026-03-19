"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = exports.createPayment = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const razorpay = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
});
const createPayment = async (req, res) => {
    try {
        const { amount } = req.body;
        const options = {
            amount: Math.round(amount * 100), // in paisa
            currency: 'INR',
            receipt: 'vrindaa_rcpt_' + Date.now(),
        };
        const order = await razorpay.orders.create(options);
        res.json(order);
    }
    catch (err) {
        res.status(500).json({ message: 'Payment creation failed', error: err });
    }
};
exports.createPayment = createPayment;
const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cartItems, totalAmount } = req.body;
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto_1.default
            .createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(body)
            .digest('hex');
        if (expectedSignature !== razorpay_signature) {
            res.status(400).json({ success: false, message: 'Invalid signature' });
            return;
        }
        // Create the order in DB after payment verification
        const order = await prisma_1.default.order.create({
            data: {
                userId: req.user.id,
                total: totalAmount,
                status: 'PAID',
                items: {
                    create: cartItems.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    })),
                },
            },
        });
        res.json({ success: true, orderId: order.id });
    }
    catch (err) {
        res.status(500).json({ message: 'Payment verification failed', error: err });
    }
};
exports.verifyPayment = verifyPayment;
