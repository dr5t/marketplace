"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecommendations = exports.getProductById = exports.getProducts = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const getProducts = async (req, res) => {
    try {
        const { search, categoryId } = req.query;
        const products = await prisma_1.default.product.findMany({
            where: {
                ...(search ? { title: { contains: search, mode: 'insensitive' } } : {}),
                ...(categoryId ? { categoryId: categoryId } : {}),
            },
            include: { seller: true, category: true },
        });
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma_1.default.product.findUnique({
            where: { id: id },
            include: { seller: true, category: true, reviews: { include: { user: true } } },
        });
        if (!product) {
            res.status(404).json({ message: 'Not found' });
            return;
        }
        res.json(product);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
exports.getProductById = getProductById;
const getRecommendations = async (req, res) => {
    try {
        const { id } = req.params;
        const currentProduct = await prisma_1.default.product.findUnique({ where: { id: id } });
        if (!currentProduct) {
            res.status(404).json({ message: 'Not found' });
            return;
        }
        const recommendations = await prisma_1.default.product.findMany({
            where: {
                categoryId: currentProduct.categoryId,
                NOT: { id: id }
            },
            take: 4,
        });
        res.json(recommendations);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
exports.getRecommendations = getRecommendations;
