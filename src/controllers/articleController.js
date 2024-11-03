import Article from "../models/article.js";

// Get the article page with the like button
export const getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.render("article", { article });
  } catch (error) {
    res.status(500).send("Internal Server error");
  }
};

// Get like count for an article
export const getLikes = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({ likes: article.likeCount });
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
};

// Increment like count for an article
export const incrementLike = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    article.likeCount += 1;
    await article.save();
    res.status(200).json({ likes: article.likeCount });
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
};

// Create a new article
export const createArticle = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Validation error" });
  }
  try {
    const article = new Article({ title, content });
    await article.save();
    res.status(201).json({ message: "Article created successfully", article });
  } catch (error) {
    res.status(400).json({ error: "Error creating article" });
  }
};
