import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on('connected',()=> console.log('Database connected'))
    const conn = await mongoose.connect(`${process.env.MONGO_URI}/projectManagerApplication`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
     console.error(`DB Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;