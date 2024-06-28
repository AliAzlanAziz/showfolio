import { Request, Response } from "express";
import workInfoService from "../services/workInfo";

const postWorkInfo = (req: Request, res: Response) => {
  return workInfoService.CreateWorkInfo(req.body.workInfo, req.context, res)
}

const putWorkInfo = (req: Request, res: Response) => {
  return workInfoService.UpdateWorkInfo(req.body.workInfo, res)
}

const getWorkInfo = (req: Request, res: Response) => {
  return workInfoService.GetWorkInfo(req.params.id, res)
}

const getWorkInfos = (req: Request, res: Response) => {
  return workInfoService.GetWorkInfos(req.query.type, req.context, res)
}

const deleteWorkInfo = (req: Request, res: Response) => {
  return workInfoService.DeleteWorkInfo(req.params.id, res)
}

export default {
  postWorkInfo,
  putWorkInfo,
  getWorkInfo,
  getWorkInfos,
  deleteWorkInfo
}