import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import type { AuthRequest } from '../types/authRequest.js'
dotenv.config()

interface User  {
     id: string,
     name: string,
     email: string,
}


export const generateToken = (payload: User)=>{
    return jwt.sign(payload, process.env.JWT_KEY!, {expiresIn: "7d"})
}

export const verifyToken = (token:string): User=>{
    return jwt.verify(token, process.env.JWT_KEY!) as User;
}

