import express from 'express';
import { addPost, deletePost, getAllPosts, updatePost } from '../controllers/postController';

const router = express.Router();

router.get('/', getAllPosts) 

router.post('/', addPost) 

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

export default router;