import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
  try {
    const connectInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `MONGODB connected successfully!! DB host: ${connectInstance.connection.host}`,
    );
  } catch (error) {
    console.error("MONGODB connection error: ", error);
    process.exit();
  }
};

export default connectDB;
