"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCart = exports.getCart = exports.addToCart = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;
        const existing = await prisma_1.default.cartItem.findFirst({ where: { userId, productId } });
        if (existing) {
            const updated = await prisma_1.default.cartItem.update({
                where: { id: existing.id },
                data: { quantity: existing.quantity + quantity },
            });
            res.json(updated);
            return;
        }
        const item = await prisma_1.default.cartItem.create({ data: { userId, productId, quantity } });
        res.status(201).json(item);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
exports.addToCart = addToCart;
const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await prisma_1.default.cartItem.findMany({
            where: { userId },
            include: { product: true },
        });
        res.json(cart);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
exports.getCart = getCart;
const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.params;
        await prisma_1.default.cartItem.delete({ where: { id: itemId } });
        res.json({ message: 'Item removed' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
exports.removeFromCart = removeFromCart;
