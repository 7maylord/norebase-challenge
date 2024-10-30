import express from 'express';
import articleRoutes from './routes/articleRoutes.js'
import path, { resolve } from 'path';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Views
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'views'));


// Routes
app.use("/api", articleRoutes);

//Later for views
// renders the home page
app.get('/', (req, res) => {
  res.status(200);
  res.json({
    message: "Welcome to Olumide Article API",
  });
});


//catch all route
app.all("*", (req, res) => {
  res.status(404);
  res.json({
    message: "Not found",
  });
});

//Later for views
// app.all('*', (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// });

export default app;
