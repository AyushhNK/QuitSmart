import UserModel from "../users/user.model";
import logger from "../../utils/logger";
import { generateAccessToken,generateRefreshToken } from "../../utils/jwt";

type CreateAccountParams={
    username:string,
    email:string,
    password:string,
}
type LoginParams=Omit<CreateAccountParams,"username">;


export const createAccount=async(data: CreateAccountParams)=>{

    logger.info(`Creating account attempt for email: ${data.email}`);
    const existingUser=await UserModel.exists({email:data.email});
    if(existingUser){
        logger.warn(`Registration failed - Email already in use: ${data.email}`);
        throw new Error("Email already in use");
    }

    const user=new UserModel({
        email:data.email,
        password:data.password,
    });

    await user.save();

    logger.info(`User created successfully: ${user._id}`);

    const refreshToken:String=generateRefreshToken({
        userId:user._id.toString(),
        role:user.Role,
    });

    const accessToken:String=generateAccessToken({
        userId:user._id.toString(),
        role:user.Role,
    });
    
    return {
        user,
        accessToken,
        refreshToken,
    };

}

export const login=async(data:LoginParams)=>{
    logger.info(`Login attempt for email: ${data.email}`);

    const user=await UserModel.findOne({email:data.email});

    
    if(!user){
        logger.warn(`Login failed - User not found: ${data.email}`);
        throw new Error("Invalid email or password");
    }

    logger.info(`User login successful: ${user._id}`);

    const refreshToken:String=await generateRefreshToken({
        userId:user._id.toString(),
        role:user.Role,
    });

    const accessToken:String=await generateAccessToken({
        userId:user._id.toString(),
        role:user.Role,
    });

    return {
        user,
        accessToken,
        refreshToken,
    };
}

export class AuthService {
  async findOrCreateOAuthUser(data: any) {
    logger.info(`OAuth login attempt - Provider: ${data.provider}`);
    let user = await UserModel.findOne({
      provider: data.provider,
      providerId: data.providerId,
    });

    if (!user) {
        logger.info(`Creating new OAuth user for provider: ${data.provider}`);
        user = await UserModel.create(data);
    }

    return user;
  }
}
