import express from 'express';
import { createArticle, getArticle, getLikes, incrementLike } from '../controllers/articleController.js';

const router = express.Router();

// Route to render article page with like button
router.get('/articles/:id', getArticle);

// API route to get like count
router.get('/articles/:id/likes', getLikes);

// API route to increment like count
router.post('/articles/:id/likes', incrementLike);

// API route to create a new article
router.post('/articles', createArticle);

export default router;