import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app.js';
import connectionToMongodb from '../src/config/db.js'; 
import Article from '../src/models/article.js'; 

// Connect to a test database before running tests
beforeAll(async () => {
    await connectionToMongodb();
});

// Close the database connection after all tests are done
afterAll(async () => {
    await mongoose.connection.close();
});

// Test suite for Article API Endpoints
describe('Article API Endpoints', () => {
    let articleId;

    // Setup: create a new article in the test database before each test
    beforeEach(async () => {
        const article = await Article.create({
            title: 'Test Article',
            content: 'Test content for the article',
            likeCount: 0
        });
        articleId = article._id; // Store the article ID for further tests
    });

    // Cleanup: remove all articles after each test
    afterEach(async () => {
        await Article.deleteMany();
    });

    // Test to get the like count of an article
    it('should get the like count for an article', async () => {
        const res = await request(app).get(`/api/articles/${articleId}/likes`);
        expect(res.statusCode).toBe(200);
        expect(res.body.likes).toBe(0); // Expect initial like count to be 0
    });

    // Test to increment the like count
    it('should increment the like count for an article', async () => {
        const res = await request(app).post(`/api/articles/${articleId}/likes`);
        expect(res.statusCode).toBe(200);
        expect(res.body.likes).toBe(1); // Expect like count to increment to 1

        // Verify that the count increased in the database
        const updatedArticle = await Article.findById(articleId);
        expect(updatedArticle.likeCount).toBe(1); // Check if the like count in DB is updated
    });

    // Test to get likes for a non-existent article
    it('should return a 404 error for a non-existent article', async () => {
        const nonExistentId = new mongoose.Types.ObjectId(); // Generate a random ObjectId
        const res = await request(app).get(`/api/articles/${nonExistentId}/likes`);
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('Article not found'); 
    });

    // Test to increment likes for a non-existent article
    it('should return a 404 error when incrementing likes for a non-existent article', async () => {
        const nonExistentId = new mongoose.Types.ObjectId(); // Generate a random ObjectId
        const res = await request(app).post(`/api/articles/${nonExistentId}/likes`);
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('Article not found'); 
    });

    // Test to handle invalid data when creating an article
    it('should return a 400 error when the article data is invalid', async () => {
        const res = await request(app).post('/api/articles').send({}); // Sending empty data
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Validation error'); 
    });
});
