import catchErrors from "../../utils/catchError";
import { email, z } from "zod";
import { createAccount } from "./auth.service";


const registerSchema=z.object({
    username: z.string().min(1).max(255),
    email: z.email().min(1).max(255),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
}).refine((data)=>data.password===data.confirmPassword,{
    message:"Passwords do not match",
    path:["confirmPassword"]
});


export const registerHandler=catchErrors(async(req,res)=>{
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
});