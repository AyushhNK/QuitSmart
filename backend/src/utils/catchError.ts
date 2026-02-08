import { NextFunction,Response,Request } from "express";


type AsyncController=(req:Request,res:Response,next:NextFunction)=>Promise<any>


const catchError=(controller:AsyncController)=>async(req:Request,res:Response,next:NextFunction)=>{
    try {
        await controller(req,res,next);
    } catch (error) {
        next(error)
    }
}

export default catchError;