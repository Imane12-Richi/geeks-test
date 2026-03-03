// finalBossBlog.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blogProDB')
  .then(() => console.log(' Connected to MongoDB'))
  .catch(err => console.error(' Connection Failed:', err));

// ===== USER SCHEMA =====
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true }
});

const User = mongoose.model('User', userSchema);

// ===== POST SCHEMA =====
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [{
    text: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
  }]
});

const Post = mongoose.model('Post', postSchema);

// ===== Seed Data =====
const seedData = async () => {
  await User.deleteMany({});
  await Post.deleteMany({});

  const lina = await User.create({ username: 'LinaDev', email: 'lina@test.com' });
  const adam = await User.create({ username: 'AdamCode', email: 'adam@test.com' });

  await Post.create({
    title: "MongoDB Relationships",
    content: "Today we learned about population and hybrid schemas...",
    author: lina._id,
    comments: [
      { text: "Great post!", author: adam._id },
      { text: "Thanks for sharing!", author: lina._id }
    ]
  });

  console.log('✅ Seed Data Created');
};

// ===== Deep Population =====
const getFullBlogFeed = async () => {
  const feed = await Post.find()
    .populate('author', 'username')            // Post author
    .populate('comments.author', 'username')   // Comment authors

  console.log('--- Full Blog Feed ---');
  console.log(JSON.stringify(feed, null, 2));
};

// ===== Run Everything =====
const run = async () => {
  await seedData();
  await getFullBlogFeed();
  mongoose.connection.close();
};

run();