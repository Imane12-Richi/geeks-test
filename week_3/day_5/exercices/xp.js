const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(express.json());

/* =====================================================
   EXERCISE 1 — BLOG REST API
===================================================== */

let posts = [
  { id: 1, title: "First Post", content: "Blog content 1" },
  { id: 2, title: "Second Post", content: "Blog content 2" }
];

// GET all posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// GET single post
app.get('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json(post);
});

// CREATE post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content required" });
  }

  const newPost = {
    id: posts.length + 1,
    title,
    content
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// UPDATE post
app.put('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;

  res.json(post);
});

// DELETE post
app.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  posts.splice(index, 1);
  res.json({ message: "Post deleted successfully" });
});

/* =====================================================
   EXERCISE 2 — BOOK CRUD API
===================================================== */

let books = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", publishedYear: 2008 },
  { id: 2, title: "The Pragmatic Programmer", author: "Andrew Hunt", publishedYear: 1999 }
];

// GET all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// GET one book
app.get('/api/books/:bookId', (req, res) => {
  const id = parseInt(req.params.bookId);
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
});

// CREATE book
app.post('/api/books', (req, res) => {
  const { title, author, publishedYear } = req.body;

  if (!title || !author || !publishedYear) {
    return res.status(400).json({ message: "All fields required" });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
    publishedYear
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

/* =====================================================
   EXERCISE 3 — EXPRESS + AXIOS (External API Proxy)
===================================================== */

app.get('/external/posts', async (req, res) => {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );

    console.log("External data retrieved successfully");
    res.json(response.data);

  } catch (error) {
    res.status(500).json({ message: "Error retrieving external data" });
  }
});

/* =====================================================
   ERROR HANDLING
===================================================== */

// Invalid route
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});