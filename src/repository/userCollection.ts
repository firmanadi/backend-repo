import { db } from '../config/firebaseConfig';
import { User } from '../entities/ApiError';

const usersCollection = db.collection('user');

export const getUserById = async (id: string): Promise<User | null> => {
    const userDoc = await usersCollection.doc(id).get();
    if (userDoc.exists) {
        return userDoc.data() as User;
    } else {
        return null;
    }
};

export const updateUser = async (id: string, userData: Partial<User>): Promise<void> => {
    await usersCollection.doc(id).update(userData);
};
