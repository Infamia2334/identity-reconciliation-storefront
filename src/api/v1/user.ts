import { RequestHandler } from 'express';
import { UserService } from '../../services/userService';
import { UserRepository } from '../../models/repositories/userRepository';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const identifyUsers: RequestHandler = async (req, res, next) => {
    try {
        const { email, phoneNumber } = req.body;
        const userContacts = await userService.identifyUser(email, phoneNumber);

        return res.status(200).json({ message: 'Success', data: userContacts });
    } catch (error) {
        console.error(error);
        return next(error);
    }
}