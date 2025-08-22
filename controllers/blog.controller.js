import expressAsyncHandler from "express-async-handler";
import Blog from "../models/blog.model.js";
import ApiResponse from "../utils/ApiResponse.util.js";
import CustomError from "../utils/CustomError.util.js";

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
  let newBlog = await Blog.create({ title, description, category });

  new ApiResponse(201, true, "Blog Added Successfully ! ", newBlog).send(res);
});

export const getBlogs = expressAsyncHandler(async (req, res, next) => {
  let blogs = await Blog.find().select("-__v -createdAt -updatedAt'");
  if (blogs.length === 0) return next(new CustomError("No Blogs Found !", 404));

  new ApiResponse(200, true, "Blogs Fetehed Successfully ! ");
});

export const getSingleBlog = expressAsyncHandler(async (req, res, next) => {
  let blog = await Blog.find(req.params.id).select(
    "-__v -createdAt -updatedAt'"
  );
  if (!blog) return next(new CustomError("No Blog Found !", 404));

  new ApiResponse(200, true, "Blog Fetehed Successfully ! ");
});

export const updateBlog = expressAsyncHandler(async (req, res, next) => {

  let updateBlog = await Blog.findByIdAndUpdate(req.params.id , req.body ,{
    new : true ,
    runValidators: true
  })

  if(!updateBlog) return next (new CustomError("Blog Not Found " , 404));

  new ApiResponse(201 , true , "Blog Updated Successfully ! ")

});

export const updateBlogPut = expressAsyncHandler(async (req, res, next) => {
    let updateBlog =  await Blog.findByIdAndUpdate({_id : req.params.id}, req.body)

    if(!updateBlog) return next (new CustomError("Blog Not Found " , 404));

    new ApiResponse(201 , true , "Blog Updated Successfully ! ", updateBlog).send(res);

});

export const deleteBlog = expressAsyncHandler(async (req, res, next) => {

  let deleteBlog = await Blog.findByIdAndDelete(req.params.id);
  if(!deleteBlog) return next(new CustomError("Blog Not Found " , 404));

  new ApiResponse(201 , true , "Blog Deleted Successfully ! ")
});
