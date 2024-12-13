// src/controllers/authController.ts
import { Request, Response } from 'express';
import User from '../models/User';
import { generateToken } from '../middleware/auth';

export const authController = {
    register: async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password, name } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                res.status(400).json({ message: 'El usuario ya existe' });
                return;
            }

            const user = new User({ email, password, name });
            await user.save();

            const token = generateToken(user._id);

            res.status(201).json({
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
                token,
            });
        } catch (error) {
            res.status(400).json({ message: 'Error en el registro', error });
        }
    },

    login: async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                res.status(401).json({ message: 'Credenciales inválidas' });
                return;
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                res.status(401).json({ message: 'Credenciales inválidas' });
                return;
            }

            const token = generateToken(user._id);

            res.json({
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
                token,
            });
        } catch (error) {
            res.status(500).json({ message: 'Error en el login', error });
        }
    },
};