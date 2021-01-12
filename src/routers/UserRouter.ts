import express, { Router } from 'express';
import UserController from '../controllers/UserController';
import { protect } from '../middleware/authMiddleware';

const router = Router();
const userController = new UserController();

// register and signup new user
router.route('/').post(userController.createUser).get(protect, userController.viewDash)
router.post('/login', userController.loginUser);
// router.post('/users', (req, res) => {
//     res.send('sdfdfds')
// })
export default router;