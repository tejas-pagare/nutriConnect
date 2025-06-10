const mongoose = require('mongoose');

const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI not set in environment variables");
  }

  await mongoose.connect(MONGODB_URI);

  console.log('🟢 Connected to MongoDB');
};

module.exports = connectDB;
