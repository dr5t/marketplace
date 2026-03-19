"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const generateToken = (id, role) => jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const exists = await prisma_1.default.user.findUnique({ where: { email } });
        if (exists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        const hashed = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma_1.default.user.create({ data: { name, email, password: hashed, role } });
        const token = generateToken(user.id, user.role);
        res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const token = generateToken(user.id, user.role);
        res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
exports.login = login;
