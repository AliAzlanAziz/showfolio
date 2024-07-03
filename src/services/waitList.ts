import { Request, Response } from 'express';
import { Types } from 'mongoose';
import WaitList from '../schema/waitList';
import { sendWaitingListJoinedMail } from '../helper/mailer';

const CreateWaitList = async (req: Request, res: Response) => {
  try{
    const newWaitList = new WaitList({
      _id: new Types.ObjectId(),
      email: req.body.waitList.email
    })

    await newWaitList.save();

    sendWaitingListJoinedMail(newWaitList.email);

    return res.status(200).send({
      success: true,
      message: 'Successfully added to wait list!'
    });
  }catch(error: any){
    const errMsg: string = error?.errorResponse?.errmsg || ""
    if(errMsg.split(" ").includes("duplicate")){
      return res.status(409).json({
      success: true,
      message: 'Already in waiting list!'
    });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error!'
    });
  }
}

export default {
  CreateWaitList
}