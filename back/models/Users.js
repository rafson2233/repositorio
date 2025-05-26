const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long']
  },  
  accessCode: {
    type: String,
    required: [true, 'Access code is required'],
    minlength: [5, 'Access code must be at least 5 characters long'],
    trim: true
  },
  userType: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
    required: [true, 'User type is required']
  },
  resetToken: {
    type: String
  },
  resetTokenExpiry: {
    type: Date
  }
});

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    if (this.password.length < 8) {
      return next(new Error('Password must be at least 8 characters long'));
    }
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
      return next(err);
    }
  }
  next();
});

module.exports = mongoose.model('Users', UserSchema, 'Users');