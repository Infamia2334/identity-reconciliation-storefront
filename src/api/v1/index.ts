import { Router } from "express";
const router = Router();

router.get('/hub/health', (req, res, next) => {
    res.json({ message: 'Server is running...' });
});
export default router;