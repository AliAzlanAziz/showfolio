import { Response } from 'express';
import { Types } from 'mongoose';
import { ContextModel } from '../models/context.model';
import View from '../schema/view';
import { ViewModel } from '../models/view.model';
import { addHours, isAfter } from 'date-fns';

const CreateView = async (view: ViewModel, context: ContextModel, res: Response) => {
  try {
    const oldView = await View.findOne({to: view.to}).sort({createdAt: 'desc'});

    if(oldView){
      const createdAtValidFor = addHours(oldView.time, 3);

      if(isAfter(createdAtValidFor, (new Date()).toUTCString())){
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
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully created view!',
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating view!',
    });
  }
};

const CreateRequestInView = async (view: ViewModel, context: ContextModel, res: Response) => {
  try {
    const oldView = await View.findOne({to: view.to}).sort({createdAt: 'desc'});

    if(oldView){
      oldView.requested = true; 
      oldView.save();
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully requested!',
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating view!',
    });
  }
};

const AllUserViews = async (context: ContextModel, res: Response) => {
  try {
    let totalViewsPromise = View.countDocuments({to: context.user._id}); 
    let uniqueViewsPromise = View.find({to: context.user._id}).distinct('user').countDocuments(); 

    const [totalViews, uniqueViews] = await Promise.all([totalViewsPromise, uniqueViewsPromise])

    const views = {
      total: totalViews,
      unique: uniqueViews
    }

    return res.status(200).json({
      success: true,
      data: views,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error!',
    });
  }
};

const AllUserViewers = async (context: ContextModel, res: Response) => {
  try {
    let viewers = await View.find({to: context.user._id}).distinct('user').populate('user', '_id name username imageURL public subsType').sort({time: 'desc'}); 

    return res.status(200).json({
      success: true,
      data: viewers,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error!',
    });
  }
};

const GetView = async (id: string, context: ContextModel, res: Response) => {
  try {
    const view = await View.findOne({user: context.user._id, to: id}).sort({createdAt: 'desc'});

    return res.status(200).json({
      success: true,
      data: view,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error!',
    });
  }
};

const GetViews = async (type: any, context: ContextModel, res: Response) => {
  try {
    const awards = await View.find({user: context.user._id}).sort({ year: 'asc' });

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
  CreateView,
  CreateRequestInView,
  AllUserViews,
  AllUserViewers,
  GetView,
  GetViews,
}