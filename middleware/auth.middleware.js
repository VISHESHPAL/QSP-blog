import expressAsyncHandler from "express-async-handler";
import CustomError from "../utils/CustomError.util.js";
import jwt from 'jsonwebtoken'

export const authenticate = expressAsyncHandler(async(req, res, next) =>{
    const token = req?.cookies?.token;


    if(!token){
        return next(new CustomError("Please login to access the file", 401));
    }


    const decoded =  jwt.verify(token , JWT_SECRET_KEY)
    
    next();
})