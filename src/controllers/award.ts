import { Request, Response } from "express";
import awardService from "../services/award";

const postAward = (req: Request, res: Response) => {
  return awardService.CreateAward(req.body.award, req.context, res)
}

const putAward = (req: Request, res: Response) => {
  return awardService.UpdateAward(req.body.award, res)
}

const getAward = (req: Request, res: Response) => {
  return awardService.GetAward(req.params.id, res)
}

const getAwards = (req: Request, res: Response) => {
  return awardService.GetAwards(req.query.type, req.context, res)
}

const deleteAward = (req: Request, res: Response) => {
  return awardService.DeleteAward(req.params.id, res)
}

export default {
  postAward,
  putAward,
  getAward,
  getAwards,
  deleteAward
}