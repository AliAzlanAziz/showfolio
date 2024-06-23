import { Request, Response, NextFunction } from "express";
import workInfoService from "../services/workInfo";

const postWorkInfo = (req: Request, res: Response, next: NextFunction) => {
  return workInfoService.CreateWorkInfo(req.body.workInfo, req.context, res)
}

const putWorkInfo = (req: Request, res: Response, next: NextFunction) => {
  return workInfoService.UpdateWorkInfo(req.body.workInfo, req.context, res)
}

const getWorkInfo = (req: Request, res: Response, next: NextFunction) => {
  return workInfoService.GetWorkInfo(req.query.type, req.context, res)
}

const deleteWorkInfo = (req: Request, res: Response, next: NextFunction) => {
  return workInfoService.DeleteWorkInfo(req.params.id, res)
}

export default {
  postWorkInfo,
  putWorkInfo,
  getWorkInfo,
  deleteWorkInfo
}