import { NextFunction,Response,Request } from "express";


type AsyncController=(req:Request,res:Response,next:NextFunction)=>Promise<any>;


const catchError=(controller:AsyncController)=>async(req:Request,res:Response,next:NextFunction)=>{
    Promise.resolve(controller(req,res,next)).catch(next);
}

export default catchError;