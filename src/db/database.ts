import { config } from 'dotenv';
import mongoose from 'mongoose';

config();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/my-project';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('🟢 MongoDB connected successfully');
  } catch (error) {
    console.error('🔴 MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
