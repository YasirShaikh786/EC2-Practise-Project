import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log("Error connecting to MongoDB", error.message);
    process.exit(1);
  }
};
//  ssh -i "C:\Users\yasir\aws-key\task-manager-key.pem" ubuntu@65.1.112.228