import express, { Router } from 'express';
import PostsController from '../controllers/PostsController';
import { protect } from '../middleware/authMiddleware';

const router = Router();
const postsController = new PostsController();

// View all posts, View user's posts, create new post
router.route('/')
    .get(postsController.viewAllPosts)
    .get(protect, postsController.viewFavPosts)
    .post(protect, postsController.createPost)

router.route('/:id').get().delete().put()

// router.get('/', (req, res) => {
//     res.send('I hate myself:)')
// })

export default router;