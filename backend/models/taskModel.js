// --- FILE: backend/models/taskModel.js ---
// This file defines the Mongoose schema for our Tasks

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    // This connects the task to a specific User's _id
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // This tells Mongoose the 'User' model is the one to link
    },
    title: {
      type: String,
      required: [true, 'Please add a task title'],
    },
    description: {
      type: String,
      required: false, // Description is optional
      default: '',
    },
    // For our premium analytics feature
    hoursPerTask: {
      type: Number,
      required: false,
      default: 0,
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    // This automatically adds 'createdAt' and 'updatedAt' fields
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);

