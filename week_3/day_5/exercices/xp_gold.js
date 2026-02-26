

// Import modules
const express = require('express');
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());


// CONFIGURATION

const PORT = 5000;
const SECRET_KEY = 'mysecretkey123'; // Pour JWT (en vrai projet, à sécuriser)


// EXERCISE 1: CRUD API avec JSONPlaceholder

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

// Read All Posts
app.get('/api/posts', async (req, res) => {
  try {
    const response = await axios.get(POSTS_URL);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
});

// Read Single Post
app.get('/api/posts/:id', async (req, res) => {
  try {
    const response = await axios.get(`${POSTS_URL}/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error: error.message });
  }
});

// Create Post
app.post('/api/posts', async (req, res) => {
  try {
    const response = await axios.post(POSTS_URL, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
});

// Update Post
app.put('/api/posts/:id', async (req, res) => {
  try {
    const response = await axios.put(`${POSTS_URL}/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error: error.message });
  }
});

// Delete Post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    await axios.delete(`${POSTS_URL}/${req.params.id}`);
    res.json({ message: `Post ${req.params.id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
});


// EXERCISE 2: User Login System

const users = [];

// Register User
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Missing username or password' });

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ id: users.length + 1, username, password: hashedPassword });
  res.status(201).json({ message: 'User registered successfully' });
});

// Login User
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
});

// Middleware to authenticate token
const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// User Profile (protected)
app.get('/api/profile', authenticate, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  res.json({ id: user.id, username: user.username });
});


// EXERCISE 3: Todo List API

let todos = [];

// Create a new todo
app.post('/api/todos', (req, res) => {
  const { title, completed = false } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });

  const newTodo = { id: uuidv4(), title, completed };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Get a specific todo
app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  res.json(todo);
});

// Update a todo
app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });

  const { title, completed } = req.body;
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Todo not found' });

  todos.splice(index, 1);
  res.json({ message: 'Todo deleted successfully' });
});


// START SERVER

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));