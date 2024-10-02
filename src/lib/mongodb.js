import mongoose from "mongoose";

export async function ConnectMongodb() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log("Error on ConnectMongodb Function", error);
  }
}
