// api/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); // Import UUID library
const app = express();

let comments = []; // In-memory storage for comments

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Route to handle form submissions (Create)
app.post('/api/contact', (req, res) => {
  const { name, email, message, rating } = req.body;
  const newComment = {
    id: uuidv4(),
    name,
    email,
    message,
    rating,
    date: new Date().toISOString()
  };
  comments.push(newComment);
  res.status(200).json({
    status: 'success',
    message: 'Message received!',
    data: newComment
  });
});

// Route to get all comments (Read)
app.get('/api/message', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: comments.length,
    data: comments
  });
});

module.exports = app;
