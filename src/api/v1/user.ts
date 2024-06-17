import { RequestHandler } from 'express';
import { UserService } from '../../services/userService';
import { UserRepository } from '../../models/repositories/userRepository';
import { ApiError } from '../../customError.ts/apiError';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const identifyUsers: RequestHandler = async (req, res, next) => {
    try {
        const { email, phoneNumber } = req.body;

        if (!email && !phoneNumber) {
            const apiError = new ApiError(400, 'Bad Request');
            throw apiError;
        }

        const userContacts = await userService.identifyUser(email, phoneNumber);

        return res.status(200).json({ message: 'Success', data: userContacts });
    } catch (error) {
        console.error(error);
        return next(error);
    }
}