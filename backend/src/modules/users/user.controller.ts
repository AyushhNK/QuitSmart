import { UserService } from "./user.service";
import { Request, Response } from "express";

const userService=new UserService();
export const getAllUsersHandler=async(req:Request,res:Response)=>{
    const users=await userService.getAllUsers();
    res.status(200).json({users});
}

export const getUserByIdHandler=async(
    req:Request<{id:string}>,
    res:Response)=>{
    const id:string=req.params.id as string;
    const user=await userService.getUserById(id);
    res.status(200).json({user});
}

export const deleteUserByIdHandler=async(
    req:Request<{id:string}>,
    res:Response)=>{
    const id:string=req.params.id as string;
    const result=await userService.deleteUserById(id);
    res.status(200).json(result);
}