import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on('connected',()=> console.log('Database connected'))
    await mongoose.connect(`${process.env.MONGO_URI}/projectManagerApplication`);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;