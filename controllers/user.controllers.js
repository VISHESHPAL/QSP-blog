import expressAsyncHandler from 'express-async-handler'
import User from '../models/user.model.js';
import ApiResponse from '../utils/ApiResponse.util.js';
import CustomError from '../utils/CustomError.util.js';
import { tokenGenerate } from '../utils/token.utils.js';

export const registerUser = expressAsyncHandler(async(req, res, next) =>{

    const {name , email , password} = req.body;

    let newUser = await User.create({name , email ,password})

    new ApiResponse(201 , true ,  " User Registered Successfully ! ", newUser).send(res)

})

export const loginUser = expressAsyncHandler(async(req, res, next) =>{

    let {email , password} = req.body;
    console.log(req.body)

    let existedUser = await User.findOne({email}).select("-password")
    console.log(existedUser);
    if(!existedUser) {
        return next (new CustomError("User Not Found" , 404))
    }

    let isMatch = await existedUser.comparePassword(password)
    if(!isMatch) {
        return next (new CustomError("Invalid Crediantials" , 401))
    }

    let token = tokenGenerate(existedUser._id);

    res.cookie('token' , token ,{
        maxAge : 1 * 60 * 60 * 1000,
        httpOnly : true
    });


    new ApiResponse(201 , true , "User Logged In Successfully ! ", token).send(res)
    
})

export const logoutrUser = expressAsyncHandler(async(req, res, next) =>{
    
})


export const updateProfile = expressAsyncHandler(async(req, res, next) =>{
    
})

export const updatePassword = expressAsyncHandler(async(req, res, next) =>{
    
})

export const deleteUser = expressAsyncHandler(async(req, res, next) =>{
    
})