import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../config/env";
import { JwtUserPayload } from "../types/auth.types";

export const generateRefreshToken=(payload:JwtUserPayload):String=>{
    return jwt.sign(
        payload,
        JWT_REFRESH_SECRET,
        {
            expiresIn:"30d",
        }
    );
}

export const generateAccessToken=(payload:JwtUserPayload):String=>{
    return jwt.sign(
        payload,
        JWT_SECRET,
        {
            expiresIn:"15m",
        }
    );
    }