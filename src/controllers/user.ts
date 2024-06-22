import { Request, Response, NextFunction } from "express";
import userService from "../services/user";

const checkReachable = (req: Request, res: Response, next: NextFunction) => {
  return userService.CheckReachable(res);
};

const postSignup = (req: Request, res: Response, next: NextFunction) => {
  return userService.Signup(req.body.user, res);
};

const postSignin = (req: Request, res: Response, next: NextFunction) => {
  return userService.Signin(req.body.user, res);
};

const getProfile = (req: Request, res: Response, next: NextFunction) => {
  return userService.Profile(req.context, res)
}

const postWorkInfo = (req: Request, res: Response, next: NextFunction) => {
  return userService.CreateWorkInfo(req.body.workInfo, req.context, res)
}

const putWorkInfo = (req: Request, res: Response, next: NextFunction) => {
  return userService.UpdateWorkInfo(req.body.workInfo, req.context, res)
}

const getWorkInfo = (req: Request, res: Response, next: NextFunction) => {
  return userService.getWorkInfo(req.query.type, req.context, res)
}

export default {
  checkReachable,
  postSignup,
  postSignin,
  getProfile,
  postWorkInfo,
  putWorkInfo,
  getWorkInfo
}