import { Request, Response, NextFunction } from "express";
import requestService from "../services/request";

const postRequest = (req: Request, res: Response, next: NextFunction) => {
  return requestService.CreateRequest(req.body.award, req.context, res)
}

const getRequest = (req: Request, res: Response, next: NextFunction) => {
  return requestService.GetRequest(req.params.to, req.context, res)
}

const getRequests = (req: Request, res: Response, next: NextFunction) => {
  return requestService.GetRequests(req.query.type, req.context, res)
}

export default {
  postRequest,
  getRequest,
  getRequests,
}