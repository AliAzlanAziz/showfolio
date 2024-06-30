import { Request, Response } from "express";
import userService from "../services/user";

const checkReachable = (req: Request, res: Response) => {
  return userService.CheckReachable(res);
};

const postSignup = (req: Request, res: Response) => {
  return userService.Signup(req.body.user, res);
};

const postSignin = (req: Request, res: Response) => {
  return userService.Signin(req.body.user, res);
};

const postForgotPassword = (req: Request, res: Response) => {
  return userService.ForgotPassword(req.body.user, res);
};

const postResetPassword = (req: Request, res: Response) => {
  return userService.ResetPassword(req.body.user, res);
};

const getSelfProfile = (req: Request, res: Response) => {
  return userService.GetSelfProfile(req.context, res)
}

const getUserProfile = (req: Request, res: Response) => {
  return userService.GetUserProfile(req.params.id, req.context, res)
}

const putProfile = (req: Request, res: Response) => {
  return userService.UpdateProfile(req.body.user, req.context, res)
}

const putUserPassword = (req: Request, res: Response) => {
  return userService.UpdateUserPassword(req.body.user, req.context, res)
}

const putProfilePublicToggle = (req: Request, res: Response) => {
  return userService.ProfilePublicToggle(req.context, res)
}

const getSearchProfiles = (req: Request, res: Response) => {
  return userService.SearchProfiles(req.query, res)
}

export default {
  checkReachable,
  postSignup,
  postSignin,
  postForgotPassword,
  postResetPassword,
  getSelfProfile,
  putProfile,
  putUserPassword,
  putProfilePublicToggle,
  getUserProfile,
  getSearchProfiles
}