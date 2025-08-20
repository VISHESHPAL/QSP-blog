import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import blogRoutes from "./routes/blog.route.js";
dotenv.config();

const app = express();
app.use(express.json())

app.use("/api/v1/blog", blogRoutes)

connectDB();
const port = process.env.PORT;
app.listen(port, (error) => {
  if (error) {
    console.log(error);
    console.log("Error while connecting the PORT ", error);
  }
  console.log(`App is listning on the port ${port}`);
});
