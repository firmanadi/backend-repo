import { Request, Response, NextFunction } from 'express';
import { admin } from '../config/firebaseConfig';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ message: 'Authorization header is missing' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        (req as any).user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
