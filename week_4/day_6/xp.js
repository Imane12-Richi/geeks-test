// advancedPatterns.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/advancedPatternsDB')
  .then(() => console.log('✅Connection Successful!'))
  .catch(err => console.error(' Connection Failed:', err));

// ==========================
// Exercise 1: Who Wrote What
// ==========================

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String }
});

const User = mongoose.model('User', userSchema);

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Post = mongoose.model('Post', postSchema);

// ==========================
// Exercise 2: Self-Updating Field
// ==========================

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  updatedAt: Date
});

// Pre-Save Hook: automatically update the updatedAt field
studentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Student = mongoose.model('Student', studentSchema);

// ==========================
// Practical Test
// ==========================
const run = async () => {
  // Clear collections for demo
  await User.deleteMany({});
  await Post.deleteMany({});
  await Student.deleteMany({});

  // Exercise 1: Create user and post
  const admin = await User.create({ name: 'Lina', email: 'lina@dev.com' });
  await Post.create({ title: 'Mongoose is Awesome', content: 'Relationships made easy!', author: admin._id });

  const postWithData = await Post.findOne({ title: 'Mongoose is Awesome' }).populate('author');
  console.log('--- Exercise 1 ---');
  console.log(`Post Title: ${postWithData.title}`);
  console.log(`Author Name: ${postWithData.author.name}`);

  // Exercise 2: Create student and verify updatedAt
  const student = new Student({ name: 'Omar' });
  await student.save();

  console.log('--- Exercise 2 ---');
  console.log(`Student Name: ${student.name}`);
  console.log(`Updated At: ${student.updatedAt}`);

  // Update student to test pre-save hook again
  student.name = 'Omar Updated';
  await student.save();
  console.log(`Updated Name: ${student.name}`);
  console.log(`Updated At After Save: ${student.updatedAt}`);

  mongoose.connection.close();
};

run();