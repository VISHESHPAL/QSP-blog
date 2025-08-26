import expressAsyncHandler from "express-async-handler";
import CustomError from "../utils/CustomError.util.js";
import jwt from 'jsonwebtoken'
import User from "../models/user.model.js";

export const authenticate = expressAsyncHandler(async(req, res, next) =>{
    const token = req?.cookies?.token;


    if(!token){
        return next(new CustomError("Please login to access the file", 401));
    }


    const decodedToken =  jwt.verify(token , process.env.JWT_SECRET_KEY);
    // console.log(decodedToken)
    let user = await User.findById(decodedToken.id);
    if(!user) return next( new CustomError("Please Login",  401))
    
    req.user = user;    
    
    next();
}) 