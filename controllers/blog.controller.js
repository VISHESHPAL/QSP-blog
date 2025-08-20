import expressAsyncHandler from 'express-async-handler'
import Blog from '../models/blog.model.js'
import ApiResponse from '../utils/ApiResponse.util.js';


export const createBlog = expressAsyncHandler(async(req, res, next) =>{

    //   const {error , value} = addBlogValidation.validate(req.body);
    //   console.log(value)

    //   if(error){
    //     console.log(error);
    //     let message  = error.details[0].message
    //     return next(new CustomError(message, 400))
    //   }

    //   req.body = value

      const {title , description , category} = req.body;
       let newBlog =  await Blog.create({title , description , category})

       new ApiResponse(201 , true , "Blog Added Successfully ! ", newBlog ).send(res)
})
  
export const getBlogs = expressAsyncHandler(async(req, res, next) =>{
    
})

export const getSingleBlog = expressAsyncHandler(async(req, res, next) =>{
    
}) 

export const updateBlog = expressAsyncHandler(async(req, res, next) =>{
    
})
export const deleteBlog = expressAsyncHandler(async(req, res, next) =>{
    
})

