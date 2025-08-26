import expressAsyncHandler from "express-async-handler";
import Blog from "../models/blog.model.js";
import ApiResponse from "../utils/ApiResponse.util.js";
import CustomError from "../utils/CustomError.util.js";
import User from "../models/user.model.js";

export const createBlog = expressAsyncHandler(async (req, res, next) => {
  //   const {error , value} = addBlogValidation.validate(req.body);
  //   console.log(value)

  //   if(error){
  //     console.log(error);
  //     let message  = error.details[0].message
  //     return next(new CustomError(message, 400))
  //   }

  //   req.body = value

  const { title, description, category } = req.body;
  let userId = req.user._id;

  let newBlog = await Blog.create({
    title,
    description,
    category,
    createdBy: userId,
  });

  if (newBlog)
    await User.findByIdAndUpdate(userId, { $inc: { totalBlogs: 1 } });

  new ApiResponse(201, true, "Blog Added Successfully ! ", newBlog).send(res);
});

export const getBlogs = expressAsyncHandler(async (req, res, next) => {
  let blogs = await Blog.find().populate({
    path: "createdBy",
    select: "email -_id",
  });
  if (blogs.length === 0) return next(new CustomError("No Blogs Found !", 404));

  new ApiResponse(200, true, "Blogs Fetehed Successfully ! ", blogs).send(res);
});

export const getSingleBlog = expressAsyncHandler(async (req, res, next) => {
  let blog = await Blog.findById(req.params.id).populate({
    path: "createdBy",
    select: "name totalBlogs email -_id",
  });
  if (!blog) return next(new CustomError("No Blog Found !", 404));

  new ApiResponse(200, true, "Blog Fetehed Successfully ! ", blog).send(res);
});

export const updateBlog = expressAsyncHandler(async (req, res, next) => {
  let updateBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updateBlog) return next(new CustomError("Blog Not Found ", 404));

  new ApiResponse(201, true, "Blog Updated Successfully ! ", updateBlog).send(
    res
  );
});

export const updateBlogPut = expressAsyncHandler(async (req, res, next) => {
  let userId = req.user._id;
  let updateBlog = await Blog.findOneAndUpdate(
    {
      _id: req.params.id,
      createdBy: userId,
    },
    req.body,
    {
      new  : true ,
      runValidators : true
    }
  );

  if (!updateBlog) return next(new CustomError("Blog Not Found ", 404));

  new ApiResponse(201, true, "Blog Updated Successfully ! ", updateBlog).send(
    res
  );
});

export const deleteBlog = expressAsyncHandler(async (req, res, next) => {
  let userId = req.user._id;
  let deleteBlog = await Blog.findOneAndDelete({
    _id: req.params.id,
    createdBy: userId,
  });

  // let deleteBlog = await Blog.findOneAndDelete({
  //   $and: [{ _id: req.params.id }, { createdBy: userId }],
  //! });  LOGICAL AND IN THE MONGODB

  if (!deleteBlog) return next(new CustomError("Blog Not Found ", 404));

  await User.findByIdAndUpdate(userId, { $inc: { totalBlogs: -1 } });

  new ApiResponse(201, true, "Blog Deleted Successfully ! ").send(res);
});
