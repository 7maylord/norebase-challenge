import express from 'express';
import { getArticle, getLikes, incrementLike } from '../controllers/articleController.js';

const router = express.Router();

// Route to render article page with like button
router.get('/articles/:id', getArticle);

// API route to get like count
router.get('/articles/:id/likes', getLikes);

// API route to increment like count
router.post('/articles/:id/likes', incrementLike);

export default router;