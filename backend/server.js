// --- FILE: backend/server.js ---
// This is your main server file, now fully updated

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors =require('cors');
const connectDB = require('./config/db'); // Import the DB connection
const { errorHandler } = require('./middleware/errorMiddleware'); // 1. Import error handler

// Connect to database
connectDB();

const app = express();

// --- Middleware ---

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Body parser for JSON
app.use(express.json());

// Body parser for URL-encoded data
app.use(express.urlencoded({ extended: false }));

// --- End Middleware ---


// --- API Routes ---
// 2. Add User Routes
app.use('/api/users', require('./routes/userRoutes'));

// 3. Add Task Routes
app.use('/api/tasks', require('./routes/taskRoutes'));

// --- End API Routes ---


// Basic test route
app.get('/', (req, res) => {
  res.send('Study Planner API is running!');
});


// 4. Add Custom Error Handler (must be after routes)
app.use(errorHandler);


// --- Server Setup ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

