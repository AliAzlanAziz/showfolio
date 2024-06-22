import { Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { isBefore } from 'date-fns';
import { UserSignupModel } from '../models/userSignup.model';
import { UserSigninModel } from '../models/userSignin.model';
import { ContextModel } from '../models/context.model';
import User from '../schema/user';
import { WorkInfoModel } from '../models/workInfo.model';
import WorkInfo from '../schema/workInfo';
import { WorkInfoType } from '../enums/workInfoType.enum';

const saltRounds = 10;

const CheckReachable = async (res: Response) => {
  try {
    return res.status(200).json({ 
      success: true,
      message: 'User APIs reachable' 
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error!',
    });
  }
};

const Signup = async (user: UserSignupModel, res: Response) => {
  try {
    const userExist = await User.findOne().or([
      { email: user.email },
      { username: user.username },
    ]);

    if (userExist) {
      return res.status(409).json({
        success: false,
        message: 'User already exist!',
      });
    }

    if (user.password != user.confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Password does not match with confirm password!',
      });
    }

    const hash = bcrypt.hashSync(user.password, saltRounds);

    const newUser = new User({
      _id: new Types.ObjectId(),
      name: user.name,
      email: user.email,
      password: hash,
      username: user.username
    });

    await newUser.save();

    return res.status(200).json({
      success: true,
      message: 'Successfully signed up!',
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error signing up!',
    });
  }
};

const Signin = async (user: UserSigninModel, res: Response) => {
  try {
    const result = await User.findOne().or([
      { email: user.email },
      { username: user.username },
    ]);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User does not exist!',
      });
    }

    const hash = bcrypt.compareSync(user.password, result.password);

    if (hash) {
      const token = jwt.sign(
        {
          id: result._id,
        },
        process.env.SECRET_KEY as string,
        { expiresIn: '7d' }
      );

      return res.status(200).json({
        success: false,
        message: 'Successfully signed in!',
        token: token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Incorrect Credentials!',
      });
    }
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error signing in!',
    });
  }
};

const Profile = async (context: ContextModel, res: Response) => {
  try {
    const profile = await User.findById(context.user._id).select(
      'name username email _id'
    );

    return res.status(200).json({
      success: true,
      profile: profile,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error!',
    });
  }
};

const CreateWorkInfo = async (workInfo: WorkInfoModel, context: ContextModel, res: Response) => {
  try {
    if(isBefore(workInfo.to, workInfo.from)){
      return res.status(400).json({
        success: false,
        message: '"to" date cannot be before "from" date',
      });
    }

    const newWorkInfo = new WorkInfo({
      _id: new Types.ObjectId(),
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
      pdf_uploaded: false
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

const UpdateWorkInfo = async (workInfoBody: WorkInfoModel, context: ContextModel, res: Response) => {
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

const getWorkInfo = async (type: any, context: ContextModel, res: Response) => {
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

export default {
  CheckReachable,
  Signup,
  Signin,
  Profile,
  CreateWorkInfo,
  UpdateWorkInfo,
  getWorkInfo
}