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
  return userService.GetProfile(req.context, res)
}

const putProfile = (req: Request, res: Response, next: NextFunction) => {
  return userService.PutProfile(req.body.user, req.context, res)
}

export default {
  checkReachable,
  postSignup,
  postSignin,
  getProfile,
  putProfile
}