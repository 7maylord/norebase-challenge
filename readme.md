# Like Button API

This project is a simple API for an article "Like" button feature. Users can view the total number of likes on an article and increment it by pressing a button. The project uses Express.js, MongoDB, and EJS templating to serve views and provides REST API endpoints for interacting with the like feature.


## Requirements

- npm
- Node.js
- Express.js
- MongoDB (Mongoose for ODM)
- EJS for templating views
- Nodemon
- Jest and Supertest for testing


## Setup and Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/7maylord/norebase-challenge.git
   cd norebase-challenge

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following:
    ```env
    # Server configuration
    PORT=3030

    # Database configuration
    MONGODB_URI=mongodb://localhost:27017/yourdbname
    ```

4. Development Mode: To run the server in development mode.
    ```sh
   npm run dev
    ```

5. Access the API: The server should now be running on http://localhost:3030.

6. Running Tests: 
To run the tests, use:

```bash
npm run test
```

## Usage
### Endpoints
- Create an Article
    - POST `/api/articles`
    - Body: `{ "title": "Article Title", "content": "Article Content" }`
    - Response: `{ "message": "Article created successfully", "article": {...} }`

- Get Like Count
    - GET `/api/articles/:id/likes`
    - Response: `{ "likes": <like count> }`

- Increment Like Count
    - POST `/api/articles/:id/likes`
    - Response: `{ "likes": <updated like count> }`

- Render Article Page
    - GET `/api/articles/:id`
    - Renders an article page showing the title, content, like count, and a "Like" button.


### Example Requests with cURL
- Create an Article:
```bash
curl -X POST http://localhost:3030/api/articles -H "Content-Type: application/json" -d '{"title": "My New Article", "content": "Some interesting content"}'
```

- Get Like Count:
```bash
curl http://localhost:3030/api/articles/<ARTICLE_ID>/likes
```

- Increment Like Count:
```bash
curl -X POST http://localhost:3030/api/articles/<ARTICLE_ID>/likes
```
Replace <ARTICLE_ID> with the actual ID of the article.


## EJS Template Rendering
To view the article page with the "Like" button, go to:

```bash
http://localhost:3000/articles/{articleId}
```
Replace {articleId} with an existing article ID in the database.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.