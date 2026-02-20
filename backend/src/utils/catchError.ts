import { Request, Response, NextFunction } from "express";

// Fully generic AsyncController
export type AsyncController<
  P = any, // req.params
  ResBody = any,
  ReqBody = any,
  ReqQuery = any
> = (
  req: Request<P, ResBody, ReqBody, ReqQuery>,
  res: Response,
  next: NextFunction
) => Promise<any>; // allow returning Response

export const catchErrors =
  <
    P = any,
    ResBody = any,
    ReqBody = any,
    ReqQuery = any
  >(controller: AsyncController<P, ResBody, ReqBody, ReqQuery>) =>
  (req: Request<P, ResBody, ReqBody, ReqQuery>, res: Response, next: NextFunction) => {
    controller(req, res, next).catch(next);
  };