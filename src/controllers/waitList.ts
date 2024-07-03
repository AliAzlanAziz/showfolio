import { Request, Response, NextFunction } from 'express';
import waitListService from '../services/waitList';

const postWaitList = (req: Request, res: Response) => {
  return waitListService.CreateWaitList(req, res)
}

export default {
  postWaitList
}