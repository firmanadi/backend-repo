import { Request, Response } from 'express';
import * as userRepository from '../repository/userCollection';
import { User } from '../entities/ApiError';

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userRepository.getUserById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userData: Partial<User> = req.body;
        await userRepository.updateUser(req.params.id, userData);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
