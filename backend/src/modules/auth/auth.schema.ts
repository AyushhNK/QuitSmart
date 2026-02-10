import { email, z } from "zod";

export const registerSchema=z.object({
    username: z.string().min(1).max(255),
    email: z.email().min(1).max(255),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
}).refine((data)=>data.password===data.confirmPassword,{
    message:"Passwords do not match",
    path:["confirmPassword"]
});

export const loginSchema=z.object({
    email: z.email().min(1).max(255),
    password: z.string().min(6).max(255),
});