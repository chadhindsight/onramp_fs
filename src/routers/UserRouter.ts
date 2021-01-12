import express, { Router } from 'express';
import UserController from '../controllers/UserController';
import { protect } from '../middleware/authMiddleware';

const router = Router();
const userController = new UserController();

// Register and signup new user
router.route('/').post(userController.createUser);

// User dashboard and profile related stuff
router.route('/:id').put(protect, userController.updateUser);

router.post('/login', userController.loginUser);

export default router;