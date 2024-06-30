import { Request, Response } from "express";
import viewService from "../services/view";

const postView = (req: Request, res: Response) => {
  return viewService.CreateView(req.body.view, req.context, res)
}

const putView = (req: Request, res: Response) => {
  return viewService.CreateRequestInView(req.body.view, req.context, res)
}

const getUserViewsCount = (req: Request, res: Response) => {
  return viewService.UserViewsCount(req.context, res)
}

const getAllUserViewers = (req: Request, res: Response) => {
  return viewService.AllUserViewers(req.context, res)
}

export default {
  postView,
  putView,
  getUserViewsCount,
  getAllUserViewers,
}