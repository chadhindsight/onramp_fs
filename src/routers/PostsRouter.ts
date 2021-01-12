import express, { Router } from 'express';
import PostsController from '../controllers/PostsController';
import { protect } from '../middleware/authMiddleware';
import SpecialReq from '../utils/reqDefinition';

const router = Router();
const postsController = new PostsController();

// View all posts, View user's posts, create new post
router.route('/')
    .get(postsController.viewAllPosts)
    .get(protect, postsController.viewFavPosts)
    .post(protect, postsController.createPost)

router.route('/:id').get().delete(protect, postsController.deletePost).put(protect, postsController.updatePost)

export default router;