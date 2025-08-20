import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let client = await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("Database Connected to :", client.connection.host);
  } catch (error) {
    console.log("Error in the connection of the Database", error);
  }
};

export default  connectDB;
