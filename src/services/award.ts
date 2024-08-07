import { Response } from 'express';
import { Types } from 'mongoose';
import { ContextModel } from '../models/context.model';
import Award from '../schema/award';
import awardRepository from '../repo/award';
import { CONSTANTS } from '../constants/constants';
import { uploadBase64Image } from '../helper/uploadImage';
import { cloudinary } from '../config/cloudinary';
import { AwardModel } from '../models/award.model';
import { serviceLogger } from '../config/logger';

const logger = serviceLogger('service:award.js')

const CreateAward = async (award: AwardModel, context: ContextModel, res: Response) => {
  try {
    let imageURL = null;
    const newAwardId = new Types.ObjectId();

    if(award?.uploadingImage){
      imageURL = await uploadBase64Image(award.base64Image, CONSTANTS.AWARD_IMAGE_FOLDER, newAwardId.toString())
    }

    const newAward = new Award({
      _id: newAwardId,
      user: context.user._id,
      title: award.title,
      desc: award.desc,
      year: award.year,
      imageURL: imageURL ? imageURL : ''
    })

    await newAward.save();

    return res.status(200).json({
      success: true,
      message: 'Successfully created award!',
    });

  } catch (error) {
    logger.error(JSON.stringify(error))
    return res.status(500).json({
      success: false,
      message: 'Error creating award!',
    });
  }
};

const UpdateAward = async (awardBody: AwardModel, res: Response) => {
  try {
    let updatedAward: any = {
      title: awardBody.title,
      desc: awardBody.desc,
      year: awardBody.year
    }

    if(awardBody?.uploadingImage){
      const imageURL = await uploadBase64Image(awardBody.base64Image, CONSTANTS.AWARD_IMAGE_FOLDER, awardBody.id);

      updatedAward = {...updatedAward, imageURL: imageURL}
    }
    
    await awardRepository.findByIdAndUpdate(awardBody.id, updatedAward)

    return res.status(200).json({
      success: true,
      message: 'Successfully updated project!',
    });

  } catch (error) {
    logger.error(JSON.stringify(error))
    return res.status(500).json({
      success: false,
      message: 'Error creating project!',
    });
  }
};

const GetAward = async (id: string, res: Response) => {
  try {
    const award = await awardRepository.findById(id);

    return res.status(200).json({
      success: true,
      data: award,
    });

  } catch (error) {
    logger.error(JSON.stringify(error))
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error!',
    });
  }
};

const GetAwards = async (type: any, context: ContextModel, res: Response) => {
  try {
    const awards = await awardRepository.findByQueryObject({user: context.user._id}).sort({ year: 'asc' });

    return res.status(200).json({
      success: true,
      data: awards,
    });

  } catch (error) {
    logger.error(JSON.stringify(error))
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error!',
    });
  }
};

const DeleteAward = async (id: string, res: Response) => {
  try {
    await awardRepository.deleteById(id);

    const publicID = `${CONSTANTS.AWARD_IMAGE_FOLDER}/${id}-${CONSTANTS.AWARD_IMAGE_FOLDER}`
    
    await cloudinary.uploader.destroy(publicID);

    return res.status(200).json({
      success: true,
      message: 'Successfully removed award!',
    });

  } catch (error) {
    logger.error(JSON.stringify(error))
    return res.status(500).json({
      success: false,
      message: 'Error removing award!',
    });
  }
};

const GetUserAwards = async (id: string) => {
  return awardRepository.findByQueryObject({user: id}).sort({ year: 'desc' });
};

const DeleteUserAllAwards = async (id: string) => {
  return awardRepository.deleteMultipleByQueryObject({user: id});
};

const findById = async (id: string) => {
  return awardRepository.findById(id);
};

export default {
  CreateAward,
  UpdateAward,
  GetAward,
  GetAwards,
  DeleteAward,
  GetUserAwards,
  DeleteUserAllAwards,
  findById
}