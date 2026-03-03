// nexusMarketFinal.js
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/nexusMarketDB')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Connection Failed:', err));

// ===== User Schema =====
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }, // Privacy
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// ===== Product Schema =====
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  image: String
}, { timestamps: true });

// Compound index for fast category + price search
productSchema.index({ category: 1, price: -1 });

const Product = mongoose.model('Product', productSchema);

// ===== Order Schema =====
// Good Design: Reference User and embed only product snapshot
const orderSchema = new mongoose.Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    title: { type: String, required: true }, // Embedded snapshot
    price: { type: Number, required: true }  // Embedded snapshot
  }],
  status: { type: String, enum: ['pending','completed','canceled'], default: 'pending' }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

// ===== Infinite Scroll Pagination Endpoint =====
app.get('/api/products', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 12; // 12 products per page

    const products = await Product.find()
      .select('title price image')
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ===== Example Seed & Test =====
const seedData = async () => {
  await User.deleteMany({});
  await Product.deleteMany({});
  await Order.deleteMany({});

  const alice = await User.create({ username: 'Alice', email: 'alice@test.com', password: 'secret123' });
  const bob = await User.create({ username: 'Bob', email: 'bob@test.com', password: 'secret456' });

  const prod1 = await Product.create({ title: 'Laptop', category: 'Electronics', price: 1500 });
  const prod2 = await Product.create({ title: 'Headphones', category: 'Electronics', price: 200 });

  await Order.create({
    buyerId: alice._id,
    products: [
      { productId: prod1._id, title: prod1.title, price: prod1.price },
      { productId: prod2._id, title: prod2.title, price: prod2.price }
    ],
    status: 'pending'
  });

  console.log('✅ Seed Data Created');
};

// ===== Start Server =====
const PORT = 3000;
app.listen(PORT, async () => {
  await seedData();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});