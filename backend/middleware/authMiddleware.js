// --- FILE: backend/middleware/authMiddleware.js ---

const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

// This middleware function will protect our routes
const protect = async (req, res, next) => {
  let token;

  // Check if the request headers contain an authorization token
  // It usually looks like "Bearer <token>"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 1. Get the token from the header
      token = req.headers.authorization.split(' ')[1];

      // 2. Verify the token using our JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Find the user in the database using the ID from the token
      // We attach this user to the 'req' (request) object
      // We exclude the password when fetching the user
      req.user = await User.findById(decoded.id).select('-password');

      // 4. Call 'next()' to move on to the next piece of middleware
      // or to the actual route controller (like 'getTasks')
      next();
    } catch (error) {
      console.error(error);
      res.status(401); // 401 Unauthorized
      throw new Error('Not authorized, token failed');
    }
  }

  // If no token is found at all
  if (!token) {
    res.status(401); // 401 Unauthorized
    throw new Error('Not authorized, no token');
  }
};

module.exports = { protect };

