import { Response } from 'express';
import { Types } from 'mongoose';
import { ContextModel } from '../models/context.model';
import View from '../schema/view';
import viewRepository from '../repo/view';
import { ViewModel } from '../models/view.model';
import { addHours, isAfter } from 'date-fns';
import { getCurrentUTCTime } from '../helper/utils';
import { serviceLogger } from '../config/logger';

const logger = serviceLogger('service:view.js')

const CreateView = async (view: ViewModel, context: ContextModel, res: Response) => {
  try {
    if(view.to == context.user._id.toString()){
      return res.status(400).json({
        success: false,
        message: 'Cannot create your own view!'
      })
    }

    const oldView = await viewRepository.findOneByQueryObject({user: context.user._id, to: view.to}).sort({time: 'desc'});

    if(oldView){
      const viewTimeValidTill = addHours(oldView.time, 3);

      if(isAfter(getCurrentUTCTime(), viewTimeValidTill)){
        const newView = new View({
          _id: new Types.ObjectId(),
          user: context.user._id,
          to: view.to,
        })

        await newView.save();
      }else{
        return res.status(403).json({
          success: false,
          message: "View already exist!"
        })
      }
    }else{
      const newView = new View({
        _id: new Types.ObjectId(),
        user: context.user._id,
        to: view.to,
      })

      await newView.save();
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully created view!',
    });

  } catch (error) {
    logger.error(JSON.stringify(error));
    return res.status(500).json({
      success: false,
      message: 'Error creating view!',
    });
  }
};

const CreateRequestInView = async (view: ViewModel, context: ContextModel, res: Response) => {
  try {
    const oldView = await viewRepository.findOneByQueryObject({user: context.user._id, to: view.to}).sort({time: 'desc'});

    if(oldView){
      oldView.requested = true; 
      oldView.save();
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully requested!',
    });

  } catch (error) {
    logger.error(JSON.stringify(error));
    return res.status(500).json({
      success: false,
      message: 'Error creating view!',
    });
  }
};

const UserViewsCount = async (context: ContextModel, res: Response) => {
  try {
    let totalViewsPromise = viewRepository.countDocumentsByQueryObject({to: context.user._id}); 
    let uniqueViewsPromise = viewRepository.findByQueryObject({to: context.user._id}).distinct('user'); 

    const [totalViews, uniqueViews] = await Promise.all([totalViewsPromise, uniqueViewsPromise])

    const views = {
      total: totalViews,
      unique: uniqueViews.length
    }

    return res.status(200).json({
      success: true,
      data: views,
    });

  } catch (error) {
    logger.error(JSON.stringify(error));
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error!',
    });
  }
};

const AllUserViewers = async (context: ContextModel, res: Response) => {
  try {
    const viewers =  await viewRepository.aggregateAllViewersByToUserId(context.user._id);
    
    return res.status(200).json({
      success: true,
      data: viewers,
    });

  } catch (error) {
    logger.error(JSON.stringify(error));
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error!'
    });
  }
};

const GetLastViewOfUserId = async (id: string, context: ContextModel) => {
  return viewRepository.findOneByQueryObject({to: id, user: context.user._id}).sort({time: 'desc'});
};

const DeleteUserAllViews = async (id: string) => {
  return viewRepository.deleteMultipleByQueryObject({user: id});
};

export default {
  CreateView,
  CreateRequestInView,
  UserViewsCount,
  AllUserViewers,
  GetLastViewOfUserId,
  DeleteUserAllViews
}