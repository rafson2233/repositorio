require('dotenv').config();
const mongoose = require('mongoose');

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@ticketflow.hcfzowf.mongodb.net/ticketflow?retryWrites=true&w=majority`);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;