import { Response } from 'express';
import { Types } from 'mongoose';
import { ContextModel } from '../models/context.model';
import View from '../schema/view';
import { ViewModel } from '../models/view.model';
import { addHours, isAfter } from 'date-fns';
import { getCurrentUTCTime } from '../helper/utils';

const CreateView = async (view: ViewModel, context: ContextModel, res: Response) => {
  try {
    const oldView = await View.findOne({user: context.user._id, to: view.to}).sort({time: 'desc'});

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
    return res.status(500).json({
      success: false,
      message: 'Error creating view!',
    });
  }
};

const CreateRequestInView = async (view: ViewModel, context: ContextModel, res: Response) => {
  try {
    const oldView = await View.findOne({user: context.user._id, to: view.to}).sort({time: 'desc'});

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

const UserViewsCount = async (context: ContextModel, res: Response) => {
  try {
    let totalViewsPromise = View.countDocuments({to: context.user._id}); 
    let uniqueViewsPromise = View.find({to: context.user._id}).distinct('user'); 

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
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error!',
    });
  }
};

const AllUserViewers = async (context: ContextModel, res: Response) => {
  try {
    const viewers =  await View.aggregate([
                            {
                              $match: { to: context.user._id }
                            },
                            {
                              $sort: { time: -1 }
                            },
                            {
                              $group: {
                                _id: '$user',
                                doc: { $first: '$$ROOT' }
                              }
                            },
                            {
                              $replaceRoot: { newRoot: '$doc' }
                            },
                            {
                              $lookup: {
                                from: 'users',
                                localField: 'user',
                                foreignField: '_id',
                                as: 'userDetails'
                              }
                            },
                            {
                              $unwind: '$userDetails'
                            },
                            {
                              $project: {
                                _id: 1,
                                user: {
                                  _id: '$userDetails._id',
                                  name: '$userDetails.name',
                                  imageURL: '$userDetails.imageURL',
                                  public: '$userDetails.public',
                                  subsType: '$userDetails.subsType'
                                },
                                requested: 1
                              }
                            }
                        ]);
    
    return res.status(200).json({
      success: true,
      data: viewers,
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error!'
    });
  }
};

const GetView = async (id: string, context: ContextModel, res: Response) => {
  try {
    const view = await View.findOne({user: context.user._id, to: id}).sort({time: 'desc'});

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

const GetLastViewOfUserId = async (id: string, context: ContextModel) => {
  return View.findOne({to: id, user: context.user._id}).sort({time: 'desc'});
};

export default {
  CreateView,
  CreateRequestInView,
  UserViewsCount,
  AllUserViewers,
  GetView,
  GetViews,
  GetLastViewOfUserId
}