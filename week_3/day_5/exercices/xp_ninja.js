// app.js - Tous les exercices combinés

const express = require("express");
const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // pour le quiz frontend

const PORT = 5000;
const JWT_SECRET = "super_secret_key";

/* =====================================================
   EXERCISE 1 — CRUD API Intermédiaire avec Axios
===================================================== */
const JSON_URL = "https://jsonplaceholder.typicode.com/posts";

app.get("/api/posts", async (req, res) => {
  try {
    const response = await axios.get(JSON_URL);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});

app.get("/api/posts/:id", async (req, res) => {
  try {
    const response = await axios.get(`${JSON_URL}/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch post" });
  }
});

app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(JSON_URL, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to create post" });
  }
});

app.put("/api/posts/:id", async (req, res) => {
  try {
    const response = await axios.put(`${JSON_URL}/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to update post" });
  }
});

app.delete("/api/posts/:id", async (req, res) => {
  try {
    await axios.delete(`${JSON_URL}/${req.params.id}`);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post" });
  }
});

/* =====================================================
   EXERCISE 2 — User Login System
===================================================== */
let users = [];

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Missing data" });
  if (users.find(u => u.username === username)) return res.status(400).json({ error: "User exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, username, password: hashedPassword };
  users.push(newUser);
  res.status(201).json({ message: "User registered successfully" });
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

app.get("/api/profile", authenticateToken, (req, res) => {
  res.json({ message: "Profile accessed", user: req.user });
});

/* =====================================================
   EXERCISE 3 — Todo List API
===================================================== */
let todos = [];
let currentTodoId = 1;

app.post("/api/todos", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title required" });

  const newTodo = { id: currentTodoId++, title, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.get("/api/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  res.json(todo);
});

app.put("/api/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  const { title, completed } = req.body;
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;
  res.json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  const index = todos.findIndex(t => t.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Todo not found" });
  todos.splice(index, 1);
  res.json({ message: "Todo deleted successfully" });
});

/* =====================================================
   EXERCISE 4 — Quiz Game
===================================================== */
const quizQuestions = [
  { question: "What does HTML stand for?", answers: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], correct: 0 },
  { question: "What is Node.js?", answers: ["Frontend framework", "Server-side runtime", "Database"], correct: 1 },
  { question: "Which company developed JavaScript?", answers: ["Microsoft", "Netscape", "Google"], correct: 1 }
];

let quizState = {}; // score par utilisateur simulé

app.get("/api/quiz", (req, res) => {
  res.json(quizQuestions);
});

/* =====================================================
   INVALID ROUTE HANDLER
===================================================== */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* =====================================================
   SERVER
===================================================== */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});