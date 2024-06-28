import { Request, Response } from "express";
import viewService from "../services/view";

const postView = (req: Request, res: Response) => {
  return viewService.CreateView(req.body.view, req.context, res)
}

const putView = (req: Request, res: Response) => {
  return viewService.CreateRequestInView(req.body.view, req.context, res)
}

const getView = (req: Request, res: Response) => {
  return viewService.GetView(req.params.to, req.context, res)
}

const getAllUserViews = (req: Request, res: Response) => {
  return viewService.AllUserViews(req.context, res)
}

const getAllUserViewers = (req: Request, res: Response) => {
  return viewService.AllUserViewers(req.context, res)
}

const getViews = (req: Request, res: Response) => {
  return viewService.GetViews(req.query.type, req.context, res)
}

export default {
  postView,
  putView,
  getAllUserViews,
  getAllUserViewers,
  getView,
  getViews,
}