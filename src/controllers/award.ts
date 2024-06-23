import { Request, Response, NextFunction } from "express";
import awardService from "../services/award";

const postAward = (req: Request, res: Response, next: NextFunction) => {
  return awardService.CreateAward(req.body.award, req.context, res)
}

const putAward = (req: Request, res: Response, next: NextFunction) => {
  return awardService.UpdateAward(req.body.award, res)
}

const getAwards = (req: Request, res: Response, next: NextFunction) => {
  return awardService.GetAwards(req.query.type, req.context, res)
}

const deleteAward = (req: Request, res: Response, next: NextFunction) => {
  return awardService.DeleteAward(req.params.id, res)
}

export default {
  postAward,
  putAward,
  getAwards,
  deleteAward
}