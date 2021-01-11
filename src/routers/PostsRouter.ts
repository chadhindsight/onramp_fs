import express, { Router } from 'express';
import PostsController from '../controllers/PostsController';

const router = Router();
const postsController = new PostsController();

router.get('/', postsController.viewMyPosts);

// router.get('/', (req, res) => {
//     res.send('I hate myself:)')
// })

export default router;