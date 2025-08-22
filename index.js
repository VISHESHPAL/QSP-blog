import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import blogRoutes from "./routes/blog.route.js";
import userRouter from "./routes/user.route.js";
dotenv.config();

const app = express();
app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/blogs", blogRoutes)
app.use("/api/v1/users", userRouter)

connectDB();
const port = process.env.PORT;
app.listen(port, (error) => {
  if (error) {
    console.log(error);
    console.log(`Error while connecting to port ${process.env.PORT}`);
  }
  console.log(`App is listning on the port ${port}`);
});
