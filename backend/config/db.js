const mongoose = require('mongoose');
// const path = require('path'); <-- We don't need this anymore

// Configure dotenv to find the .env file in the 'backend' directory
// We go one level up ('../') from the 'config' directory to find '.env'
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); <-- REMOVE THIS LINE
// server.js is already loading the .env file for us.

const connectDB = async () => {
  try {
    // Check if the MONGO_URI is loaded
    if (!process.env.MONGO_URI) {
      console.error('Error: MONGO_URI is not defined in your .env file');
      process.exit(1); // Exit with failure
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;