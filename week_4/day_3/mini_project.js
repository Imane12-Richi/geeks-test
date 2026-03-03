// weekend-mini-project.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/weekendProject', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// --------------------
// Option 1: Todo Manager
// --------------------
const todoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  category: { type: String, enum: ['Work', 'Personal', 'Other'], required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  dueDate: { type: Date }
}, { timestamps: true });

todoSchema.index({ category: 1 }); // Pro-Challenge Index

const Todo = mongoose.model('Todo', todoSchema);

// --------------------
// Option 2: Blog Platform
// --------------------
const commentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  body: { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String }],
  comments: [commentSchema]
}, { timestamps: true });

// Pre-save hook to generate slug
postSchema.pre('validate', function(next) {
  this.slug = this.title.toLowerCase().replace(/\s+/g, '-');
  next();
});

const Post = mongoose.model('Post', postSchema);

// --------------------
// Option 3: E-Commerce
// --------------------
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 }
});

productSchema.index({ category: 1, price: 1 }); // Pro-Challenge Compound Index

const Product = mongoose.model('Product', productSchema);

const orderSchema = new mongoose.Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true }, // Embedded snapshot
    price: { type: Number, required: true } // Embedded snapshot
  }],
  status: { type: String, enum: ['pending', 'completed', 'canceled'], default: 'pending' }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

// --------------------
// Users Collection (common for all options)
// --------------------
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false }, // Privacy
  bio: { type: String },
  socialLinks: {
    twitter: String,
    github: String
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// --------------------
// Example usage
// --------------------
async function runExample() {
  await mongoose.connection.dropDatabase();

  // Create a user
  const user = await User.create({ username: 'DevUser', email: 'dev@example.com', password: 'secret123', bio: 'Coder', socialLinks: { twitter: '', github: '' } });

  // Option 1: Add a Todo
  await Todo.create({ userId: user._id, title: 'Finish Mini-Project', category: 'Work', status: 'pending', dueDate: new Date() });

  // Option 2: Add a Post with comments
  const post = await Post.create({ title: 'My First Blog', body: 'Hello World!', authorId: user._id, tags: ['Intro'] });
  post.comments.push({ username: 'DevUser', text: 'First comment!' });
  await post.save();

  // Option 3: Add a Product and Order
  const product = await Product.create({ name: 'Laptop', category: 'Electronics', price: 1500 });
  await Order.create({ buyerId: user._id, products: [{ productId: product._id, name: product.name, price: product.price }] });

  // Queries with .lean()
  const todos = await Todo.find({ status: 'pending' }).lean();
  const posts = await Post.find().populate('authorId', 'username bio').lean();
  const orders = await Order.find().populate('buyerId', 'username').lean();

  console.log('Todos:', todos);
  console.log('Posts:', posts);
  console.log('Orders:', orders);

  mongoose.connection.close();
}

runExample();