import { Router } from "express";
import { getAllUsersHandler, getUserByIdHandler,deleteUserByIdHandler } from "./user.controller";


const userRoutes=Router();

userRoutes.get("/",getAllUsersHandler);
userRoutes.get("/:id",getUserByIdHandler);
userRoutes.delete("/:id",deleteUserByIdHandler);

export default userRoutes;