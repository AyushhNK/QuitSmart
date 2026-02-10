import catchErrors from "../../utils/catchError";
import { email, z } from "zod";
import { createAccount,login } from "./auth.service";
import { Request, Response } from "express";
import {registerSchema, loginSchema} from "./auth.schema";

export const registerHandler=async(req:Request,res:Response)=>{
    // validate request
    const request=registerSchema.parse({
        ...req.body,
    });
    // call service
    const {user, accessToken, refreshToken}=await createAccount(request);
    // return response
    return res.status(201).json({
        user,
        accessToken,
        refreshToken,
    });
};

export const loginHandler=async(req:Request,res:Response)=>{
    // validate request
    const request=loginSchema.parse({
        ...req.body,
    });

    const {user, accessToken, refreshToken}=await login(request);

    return res.status(200).json({
        user,
        accessToken,
        refreshToken,
    });
}
