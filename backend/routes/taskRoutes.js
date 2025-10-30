// --- FILE: backend/routes/taskRoutes.js ---
// This file defines the URL paths for our task API

const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

// We import our 'protect' middleware
const { protect } = require('../middleware/authMiddleware');

// --- Protected Routes ---
// Any request to these routes will first go through our 'protect' middleware
// If the token is valid, 'req.user' will be attached to the request object

// http://localhost:5000/api/tasks/
router.route('/')
  .get(protect, getTasks)       // GET all tasks for this user
  .post(protect, createTask);   // POST a new task for this user

// http://localhost:5000/api/tasks/:id
router.route('/:id')
  .put(protect, updateTask)     // PUT (update) a specific task
  .delete(protect, deleteTask); // DELETE a specific task

module.exports = router;

