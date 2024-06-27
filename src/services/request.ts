import { Response } from 'express';
import { Types } from 'mongoose';
import { ContextModel } from '../models/context.model';
import Request from '../schema/request';
import { RequestModel } from '../models/request.model';
import { addHours, isAfter } from 'date-fns';

const CreateRequest = async (request: RequestModel, context: ContextModel, res: Response) => {
  try {
    const oldRequest = await Request.findOne({to: request.to}).sort({createdAt: 'desc'});

    if(oldRequest){
      const createdAtValidFor = addHours(oldRequest.time, 12);

      if(isAfter(createdAtValidFor, new Date())){
        const newRequest = new Request({
          _id: new Types.ObjectId(),
          user: context.user._id,
          to: request.to,
        })

        await newRequest.save();
      }else{
        return res.status(403).json({
          success: false,
          message: "Request already exist!"
        })
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully created request!',
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating request!',
    });
  }
};

const GetRequest = async (id: string, context: ContextModel, res: Response) => {
  try {
    const request = await Request.find({user: context.user._id, to: id}).sort({createdAt: 'desc'});

    return res.status(200).json({
      success: true,
      data: request,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error!',
    });
  }
};

const GetRequests = async (type: any, context: ContextModel, res: Response) => {
  try {
    const awards = await Request.find({user: context.user._id}).sort({ year: 'asc' });

    return res.status(200).json({
      success: true,
      data: awards,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error!',
    });
  }
};

export default {
  CreateRequest,
  GetRequest,
  GetRequests,
}