import { Request, Response, NextFunction } from "express";
import userService from "../services/user";

const checkReachable = (req: Request, res: Response, next: NextFunction) => {
  return userService.checkReachable(res);
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

export default {
  checkReachable,
  postSignup,
  postSignin,
  getProfile
}