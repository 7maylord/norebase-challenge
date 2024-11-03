import Article from "../models/article.js";
import { validationResult } from 'express-validator';

// Get the article page with the like button
export const getArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).send('Article not found');
        res.render('article', { article });
    } catch (error) {
        res.status(500).send('Internal Server error');
    }
};

// Get like count for an article
export const getLikes = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ error: 'Article not found' });
        res.json({ likes: article.likeCount });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server error' });
    }
};

// Increment like count for an article
export const incrementLike = async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(
            req.params.id,
            { $inc: { likeCount: 1 } },
            { new: true }
        );
        if (!article) return res.status(404).json({ error: 'Article not found' });
        res.json({ likes: article.likeCount });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server error' });
    }
};

// Create a new article
export const createArticle = async (req, res) => {
    try {
         // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, content } = req.body;
        const article = new Article({ title, content });
        await article.save();
        res.status(201).json({ message: 'Article created successfully', article });
    } catch (error) {
        res.status(400).json({ error: 'Error creating article' });
    }
};
