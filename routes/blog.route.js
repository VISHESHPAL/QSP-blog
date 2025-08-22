import express from 'express';
import { createBlog, deleteBlog, getBlogs, getSingleBlog, updateBlog, updateBlogPut } from '../controllers/blog.controller.js';
import validateRequest from '../middleware/blog.validation.middleware.js';
import { addBlogValidation, updateBlogValidation } from '../validation/blog.validation.js';

const blogRoutes = express.Router();

blogRoutes.post("/add", validateRequest(addBlogValidation) , createBlog)
blogRoutes.get("/all", getBlogs)
blogRoutes.get("/:id", getSingleBlog)
blogRoutes.get("/:id", updateBlog)
blogRoutes.patch("/:id", validateRequest(updateBlogValidation) , updateBlog)
blogRoutes.delete("/:id", deleteBlog)
blogRoutes.put("/:id", updateBlogPut)

export default blogRoutes