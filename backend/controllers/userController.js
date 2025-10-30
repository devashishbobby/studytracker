// --- FILE: backend/controllers/userController.js ---
// This file holds all the logic for registering and logging in users

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // --- 1. Validation ---
  if (!name || !email || !password) {
    res.status(400); // 400 Bad Request
    throw new Error('Please add all fields');
  }

  // --- 2. Check if user already exists ---
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // --- 3. Hash the password ---
  // We already do this in the userModel.js 'pre.save' hook,
  // so we don't need to do it here again.

  // --- 4. Create the user in the database ---
  const user = await User.create({
    name,
    email,
    password,
  });

  // --- 5. Send back a response ---
  if (user) {
    res.status(201).json({ // 201 Created
      _id: user._id,
      name: user.name,
      email: user.email,
      isPremium: user.isPremium,
      token: generateToken(user._id), // Generate a token for them
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

// @desc    Authenticate (login) a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // 1. Find the user by email
  const user = await User.findOne({ email });

  // 2. Check if user exists AND if password matches
  // We use the 'matchPassword' method we created in userModel.js
  if (user && (await user.matchPassword(password))) {
    // 3. Send back user data and a new token
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isPremium: user.isPremium,
      token: generateToken(user._id),
    });
  } else {
    res.status(401); // 401 Unauthorized
    throw new Error('Invalid email or password');
  }
};

module.exports = {
  registerUser,
  loginUser,
};

