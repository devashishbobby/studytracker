// --- FILE: backend/utils/generateToken.js ---
// This file creates a reusable function to sign JWT tokens

const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // The token will be valid for 30 days
  });
};

module.exports = generateToken;

