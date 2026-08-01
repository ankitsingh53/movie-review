import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export const authenticate = (req:AuthRequest, res:Response, next:NextFunction)=>{
    try {
        const token = req.cookies.token;
    if(!token){
       return res.status(401).json({message: "Please login first"})
    }

    const decoded = verifyToken(token);

    req.user = decoded 
    next()
    
    } catch (error) {
        return res.status(401).json({
      message: "Not authorized, token failed",
    });
  }  
};