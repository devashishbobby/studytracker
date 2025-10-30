const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minLength: [6, 'Password must be at least 6 characters'],
    },
    isPremium: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// --- Mongoose Middleware & Methods ---

// Hash password before saving the user to the database
userSchema.pre('save', async function (next) {
  // 'this' refers to the user document being saved
  
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  // Generate a salt (random string to add to the hash)
  const salt = await bcrypt.genSalt(10);
  
  // Re-assign the user's password to the hashed version
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with the hashed password in DB
userSchema.methods.matchPassword = async function (enteredPassword) {
  // 'this.password' is the hashed password stored in the database
  return await bcrypt.compare(enteredPassword, this.password);
};

// --- End Mongoose Middleware & Methods ---

const User = mongoose.model('User', userSchema);
module.exports = User;

