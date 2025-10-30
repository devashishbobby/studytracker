// --- FILE: backend/controllers/taskController.js ---
// This file holds all the logic for what happens at each task endpoint

const Task = require('../models/taskModel');
const User = require('../models/userModel');

// @desc    Get all tasks for a logged-in user
// @route   GET /api/tasks
// @access  Private (requires token from authMiddleware)
const getTasks = async (req, res) => {
  // We have access to 'req.user' because our 'protect' middleware ran first
  const tasks = await Task.find({ user: req.user._id });
  res.status(200).json(tasks);
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private (requires token from authMiddleware)
const createTask = async (req, res) => {
  const { title, description, hoursPerTask } = req.body;

  if (!title) {
    res.status(400);
    throw new Error('Please add a task title');
  }

  const task = await Task.create({
    title,
    description: description || '', // Optional field
    hoursPerTask: hoursPerTask || 0, // Optional field
    isCompleted: false,
    user: req.user._id, // Link the task to the logged-in user
  });

  res.status(201).json(task); // 201 Created
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private (requires token from authMiddleware)
const updateTask = async (req, res) => {
  // 1. Find the task by its ID (from the URL parameters)
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404); // 404 Not Found
    throw new Error('Task not found');
  }

  // 2. Check that the logged-in user owns this task
  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401); // 401 Unauthorized
    throw new Error('User not authorized to update this task');
  }

  // 3. Perform the update
  // We can update any/all fields provided in the body (e.g., title, isCompleted)
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // This option returns the modified document
    runValidators: true, // This ensures new data follows our schema rules
  });

  res.status(200).json(updatedTask);
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private (requires token from authMiddleware)
const deleteTask = async (req, res) => {
  // 1. Find the task by its ID
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404); // 404 Not Found
    throw new Error('Task not found');
  }

  // 2. Check that the logged-in user owns this task
  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401); // 401 Unauthorized
    throw new Error('User not authorized to delete this task');
  }

  // 3. Remove the task
  await Task.findByIdAndDelete(req.params.id);

  res.status(200).json({
    id: req.params.id,
    message: 'Task removed successfully',
  });
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};

