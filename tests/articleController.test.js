import request from 'supertest';
import mongoose from 'mongoose';
import express from 'express';
import connectionToMongodb from '../src/config/db.js';
import articleRoutes from '../src/routes/articleRoutes.js';
import Article from '../src/models/article.js';

const app = express();
app.use(express.json());
app.use('/api', articleRoutes);

// Connect to a test database
beforeAll(async () => {
    await connectionToMongodb();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Article API Endpoints', () => {
    let articleId;

    // Setup: create a new article in the test database
    beforeEach(async () => {
        const article = await Article.create({
            title: 'Test Article',
            content: 'Test content for the article',
            likeCount: 0
        });
        articleId = article._id;
    });

    // Cleanup after each test
    afterEach(async () => {
        await Article.deleteMany();
    });

    // Test to get the like count of an article
    it('should get the like count for an article', async () => {
        const res = await request(app).get(`/api/articles/${articleId}/likes`);
        expect(res.statusCode).toBe(200);
        expect(res.body.likes).toBe(0);
    });

    // Test to increment the like count
    it('should increment the like count for an article', async () => {
        const res = await request(app).post(`/api/articles/${articleId}/likes`);
        expect(res.statusCode).toBe(200);
        expect(res.body.likes).toBe(1);

        // Verify that the count increased in the database
        const updatedArticle = await Article.findById(articleId);
        expect(updatedArticle.likeCount).toBe(1);
    });
});
