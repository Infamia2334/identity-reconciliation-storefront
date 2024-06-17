import { Router } from "express";
import  { identifyUsers } from "./user";

const router = Router();

router.get('/health', (req, res, next) => {
    res.json({ message: 'Server is running...' });
});

router.post('/identify', identifyUsers);

export default router;