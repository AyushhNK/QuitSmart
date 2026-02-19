import UserModel from "../users/user.model";
import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../../config/env";
import { generateAccessToken,generateRefreshToken } from "../../utils/jwt";

type CreateAccountParams={
    username:string,
    email:string,
    password:string,
}
type LoginParams=Omit<CreateAccountParams,"username">;


export const createAccount=async(data: CreateAccountParams)=>{
    const existingUser=await UserModel.exists({email:data.email});
    if(existingUser){
        throw new Error("Email already in use");
    }

    const user=new UserModel({
        email:data.email,
        password:data.password,
    });

    await user.save();

    const refreshToken:String=generateRefreshToken({
        userId:user._id.toString(),
        Role:user.Role,
    });

    const accessToken:String=generateAccessToken({
        userId:user._id.toString(),
        Role:user.Role,
    });
    
    return {
        user,
        accessToken,
        refreshToken,
    };

}

export const login=async(data:LoginParams)=>{
    const user=await UserModel.findOne({email:data.email});

    
    if(!user){
        throw new Error("Invalid email or password");
    }

    const refreshToken:String=await generateRefreshToken({
        userId:user._id.toString(),
        Role:user.Role,
    });

    const accessToken:String=await generateAccessToken({
        userId:user._id.toString(),
        Role:user.Role,
    });

    return {
        user,
        accessToken,
        refreshToken,
    };
}

export class AuthService {
  async findOrCreateOAuthUser(data: any) {
    let user = await UserModel.findOne({
      provider: data.provider,
      providerId: data.providerId,
    });

    if (!user) {
      user = await UserModel.create(data);
    }

    return user;
  }
}
