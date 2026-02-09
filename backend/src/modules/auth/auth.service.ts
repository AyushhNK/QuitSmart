import UserModel from "../users/user.model";
import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../../config/env";

type CreateAccountParams={
    username:string,
    email:string,
    password:string,
}

export const createAccount=async(data: CreateAccountParams)=>{
    const existingUser=await UserModel.exists({email:data.email});
    if(existingUser){
        throw new Error("Email already in use");
    }

    const user=new UserModel({
        email:data.email,
        password:data.password,
    });


    const refreshToken=jwt.sign(
        {
            userId:user._id,
        },
        JWT_REFRESH_SECRET,
        {
            audience:["user"],
            expiresIn:"30d",
        }
    );

    const accessToken=jwt.sign(
        {
            userId:user._id,
        },
        JWT_SECRET,
        {
            audience:["user"],
            expiresIn:"15m",
        }

    );

    return {
        user,
        accessToken,
        refreshToken,
    };

}