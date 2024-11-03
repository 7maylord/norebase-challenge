import express from 'express';
import articleRoutes from './routes/articleRoutes.js'
import path from 'path';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Views
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));

// Routes
app.use("/api", articleRoutes);

// renders the home page
app.get('/', (req, res) => {
  res.status(200);
  res.json({
    message: "Welcome to Olumide Like Button API",
  });
});


//catch all route
app.all("*", (req, res) => {
  res.status(404);
  res.json({
    message: "Not found",
  });
});


export default app;
