import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../config/env";

type Payload={
    userId:string,
    Role:string,
}

export const generateRefreshToken=(payload:Payload):String=>{
    return jwt.sign(
        payload,
        JWT_REFRESH_SECRET,
        {
            expiresIn:"30d",
        }
    );
}

export const generateAccessToken=(payload:Payload):String=>{
    return jwt.sign(
        payload,
        JWT_SECRET,
        {
            expiresIn:"15m",
        }
    );
    }