import { Response } from 'express';
import { Types } from 'mongoose';
import { isBefore } from 'date-fns';
import { ContextModel } from '../models/context.model';
import { WorkInfoModel } from '../models/workInfo.model';
import WorkInfo from '../schema/workInfo';
import { WorkInfoType } from '../enums/workInfoType.enum';
import { CONSTANTS } from '../constants/constants';
import { uploadBase64Image } from '../helper/uploadImage';
import { cloudinary } from '../config/cloudinary';

const CreateWorkInfo = async (workInfo: WorkInfoModel, context: ContextModel, res: Response) => {
  try {
    if(isBefore(workInfo.to, workInfo.from)){
      return res.status(400).json({
        success: false,
        message: '"to" date cannot be before "from" date',
      });
    }

    let imageURL = null;
    const newWorkInfoId = new Types.ObjectId();

    if(workInfo?.uploadingImage){
      imageURL = await uploadBase64Image(workInfo.base64Image, CONSTANTS.WORKINFO_IMAGE_FOLDER, newWorkInfoId.toString())
    }

    const newWorkInfo = new WorkInfo({
      _id: newWorkInfoId,
      user: context.user._id,
      type: workInfo.type,
      title: workInfo.title,
      place_name: workInfo.place_name,
      from: workInfo.from,
      to: workInfo.to,
      summary: workInfo.summary,
      address: {
          city: workInfo.address.city,
          country: workInfo.address.country,
          details: workInfo.address.details
      },
      imageURL: imageURL
    })

    if(workInfo.type == WorkInfoType.EXPERIENCE){
      newWorkInfo.jobMode = workInfo.jobMode
    }

    await newWorkInfo.save();

    return res.status(200).json({
      success: true,
      message: 'Successfully created work info!',
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating work info!',
    });
  }
};

const UpdateWorkInfo = async (workInfoBody: WorkInfoModel, res: Response) => {
  try {
    if(isBefore(workInfoBody.to, workInfoBody.from)){
      return res.status(400).json({
        success: false,
        message: '"to" date cannot be before "from" date',
      });
    }

    const workInfoPresent = await WorkInfo.findById(workInfoBody.id)

    let updatedWorkInfo: any = {
      title: workInfoBody.title,
      place_name: workInfoBody.place_name,
      from: workInfoBody.from,
      to: workInfoBody.to,
      summary: workInfoBody.summary,
      address: {
          city: workInfoBody.address.city,
          country: workInfoBody.address.country,
          details: workInfoBody.address.details
      },
    }
    
    if(workInfoPresent?.type == WorkInfoType.EXPERIENCE){
      updatedWorkInfo = { ...updatedWorkInfo, jobMode: workInfoBody.jobMode }
    }

    if(workInfoBody?.uploadingImage){
      const imageURL = await uploadBase64Image(workInfoBody.base64Image, CONSTANTS.WORKINFO_IMAGE_FOLDER, workInfoBody.id);

      updatedWorkInfo = {...updatedWorkInfo, imageURL: imageURL}
    }

    await WorkInfo.findByIdAndUpdate(workInfoBody.id, updatedWorkInfo)

    return res.status(200).json({
      success: true,
      message: 'Successfully updated work info!',
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating work info!',
    });
  }
};

const GetWorkInfo = async (type: any, context: ContextModel, res: Response) => {
  try {
    const allowedTypes = ['1', '2', '3', 'ALL']

    if(!allowedTypes.includes(type)){
      return res.status(400).json({
        success: false,
        message: 'Must provide "type" in request parameters ("1", "2", "3", "ALL")',
      })
    }

    let workInfos: any;
    if(type == 'ALL'){
      workInfos = await WorkInfo.find({user: context.user._id}).sort({ type: 'asc', from: 'asc' });
    }else{
      workInfos = await WorkInfo.find({user: context.user._id, type: Number(type)}).sort({ from: 'asc' });
    }

    return res.status(200).json({
      success: true,
      data: workInfos,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error!',
    });
  }
};

const DeleteWorkInfo = async (id: string, res: Response) => {
  try {
    await WorkInfo.findByIdAndDelete(id);

    const publicID = `${CONSTANTS.WORKINFO_IMAGE_FOLDER}/${id}-${CONSTANTS.WORKINFO_IMAGE_FOLDER}`
    
    await cloudinary.uploader.destroy(publicID);

    return res.status(200).json({
      success: true,
      message: 'Successfully removed work info!',
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error removing work info!',
    });
  }
};

export default {
  CreateWorkInfo,
  UpdateWorkInfo,
  GetWorkInfo,
  DeleteWorkInfo
}