// taskmaster.js
const mongoose = require('mongoose');

// ===== Connection to MongoDB =====
mongoose.connect('mongodb://localhost:27017/taskMasterDB')
  .then(() => console.log('✅ Connection Successful! Node.js is talking to MongoDB.'))
  .catch(err => console.error('❌ Connection Failed:', err));

// ===== Task Schema =====
const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, "You must provide a task title"] 
  },
  description: String,
  status: { 
    type: String, 
    enum: ['pending', 'completed'], 
    default: 'pending' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Task = mongoose.model('Task', taskSchema);

// ===== CRUD Functions =====

// 1. Create a Task
const createTask = async (title, description, status) => {
  try {
    const newTask = await Task.create({ title, description, status });
    console.log("✅ Task Created:", newTask);
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
};

// 2. Retrieve All Tasks
const getAllTasks = async () => {
  const tasks = await Task.find().lean();
  console.log("📋 Current Tasks:", tasks);
};

// 3. Update Task Status
const completeTask = async (taskId) => {
  try {
    await Task.findByIdAndUpdate(taskId, { status: 'completed' });
    console.log("🚀 Task marked as completed!");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
};

// ===== Example Usage =====
const runExample = async () => {
  // Test 1: Create valid task
  await createTask("Learn Mongoose Validation", "Complete the daily challenge for MongoDB bootcamp");

  // Test 2: Create task with no title (should fail)
  await createTask("", "This task has no title");

  // Test 3: Create task with invalid status (should fail)
  await createTask("Invalid Status Task", "Status not allowed", "in-progress");

  // Retrieve all tasks
  await getAllTasks();

  // Complete first task (if exists)
  const firstTask = await Task.findOne().lean();
  if (firstTask) await completeTask(firstTask._id);

  // Retrieve tasks again to see status update
  await getAllTasks();

  // Close connection
  mongoose.connection.close();
};

runExample();