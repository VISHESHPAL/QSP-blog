import express from 'express';
import { createBlog, deleteBlog, getBlogs, getSingleBlog, updateBlog } from '../controllers/blog.controller.js';
import validateRequest from '../middleware/blog.validation.middleware.js';
import { addBlogValidation, updateBlogValidation } from '../validation/blog.validation.js';

const blogRoutes = express.Router();

blogRoutes.post("/add", validateRequest(addBlogValidation) , createBlog)
blogRoutes.get("/all", getBlogs)
blogRoutes.get("/:id", getSingleBlog)
blogRoutes.patch("/:id", validateRequest(updateBlogValidation) , updateBlog)
blogRoutes.delete("/:id", deleteBlog)

export default blogRoutes