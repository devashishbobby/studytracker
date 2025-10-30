// --- FILE: backend/routes/userRoutes.js ---
// This file defines the URL paths for our user API

const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
} = require('../controllers/userController');

// http://localhost:5000/api/users/register
router.post('/register', registerUser);

// http://localhost:5000/api/users/login
router.post('/login', loginUser);

module.exports = router;

