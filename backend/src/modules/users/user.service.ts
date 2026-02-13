import { AppError } from "../../utils/AppError";
import UserModel from "./user.model";


export class UserService{
    async getAllUsers(){
        return await UserModel.find();
    }

    async getUserById(id:string){
        const user=await UserModel.findById(id);
        if(!user){
            throw new AppError("User not found",404);
        }
        return user;
    }

    async deleteUserById(id:string){
        const user=await UserModel.findById(id);
        if(!user){
            throw new AppError("User not found",404);
        }
        await UserModel.findByIdAndDelete(id);

        return {
            message:"User deleted successfully",
        }
    }
}