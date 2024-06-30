import { Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { UserSignupModel } from '../models/userSignup.model';
import { UserModel } from '../models/user.model';
import { UserSigninModel } from '../models/userSignin.model';
import { ContextModel } from '../models/context.model';
import User from '../schema/user';
import { uploadBase64Image } from '../helper/uploadImage';
import { CONSTANTS } from '../constants/constants';
import { gen } from 'n-digit-token';
import { getCurrentUTCTime } from '../helper/utils';
import { sendAfterPasswordResetMail, sendPasswordResetCodeMail } from '../helper/mailer';
import { addHours, isAfter, subHours } from 'date-fns';
import { UserResetPasswordModel } from '../models/userResetPassword.model';

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
    const userExist = await User.findOne().or([
      { email: user.email },
      { username: user.username },
    ]);

    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: 'User does not exist!',
      });
    }

    const hash = bcrypt.compareSync(user.password, userExist.password);

    if (hash) {
      const token = jwt.sign(
        {
          id: userExist._id,
        },
        process.env.SECRET_KEY as string,
        { expiresIn: '7d' }
      );

      return res.status(200).json({
        success: true,
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

const ForgotPassword = async (user: UserResetPasswordModel, res: Response) => {
  try {
    const userExist = await User.findOne({ email: user.email });

    if (!userExist) {
      return res.status(200).json({
        success: true,
        message: 'Password reset code has been sent to the mail!', //sending because we don't want client to know that user (email) doesn't exist
      });
    }

    const token: string = gen(6);

    userExist.code = token;
    userExist.validTill = getCurrentUTCTime()

    await userExist.save();

    await sendPasswordResetCodeMail(userExist.email, userExist.code);

    return res.status(200).json({
      success: true,
      message: 'Password reset code has been sent to the mail!'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error sending reset code to the email!',
    });
  }
};

const ResetPassword = async (user: UserResetPasswordModel, res: Response) => {
  try {
    const userExist = await User.findOne({ email: user.email });

    if (!userExist) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email!'
      });
    }

    const codeValidFor = addHours(userExist.validTill, 24);

    if ((userExist.code != user.code) || isAfter(getCurrentUTCTime(), codeValidFor)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid code!'
      });
    }

    if (user.password != user.confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Password does not match with confirm password!',
      });
    }

    const hash = bcrypt.hashSync(user.password, saltRounds);

    userExist.password = hash;
    userExist.code = null;
    userExist.validTill = subHours(userExist.validTill, 24);;

    await userExist.save();

    sendAfterPasswordResetMail(userExist.email);

    return res.status(200).json({
      success: true,
      message: 'Password has been reset!'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error sending reset code to the email!',
    });
  }
};

const UpdateProfile = async (user: UserModel, context: ContextModel, res: Response) => {
  try {
    let imageURL = null;

    if(user.uploadingImage){
      imageURL = await uploadBase64Image(user.base64Image, CONSTANTS.PROFILE_IMAGE_FOLDER, context.user._id)
    }

    let updatedProfile: any = {
      position: user.position,
      phone: user.phone,
      imageURL: (user?.uploadingImage == true) ? imageURL : context.user.imageURL,
      desc: user.desc,
      fb: user.fb,
      ig: user.ig,
      yt: user.yt,
      gh: user.gh,
      tw: user.tw,
      li: user.li,
      web: user.web,
      address: {
          city: user?.address?.city,
          country: user?.address?.country,
          details: user?.address?.details,
      },
      languages: user.languages,
      toWork: user.toWork,
      toHire: user.toHire
    }
    
    await User.findByIdAndUpdate(context.user._id, updatedProfile)

    return res.status(200).json({
      success: true,
      message: 'Successfully updated profile!',
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error!',
    });
  }
};

const UpdateUserPassword = async (user: UserResetPasswordModel, context: ContextModel, res: Response) => {
  try {
    const userExist = await User.findById(context.user._id);

    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: 'User does not exist!',
      });
    }

    const hash = bcrypt.compareSync(user.oldPassword, userExist.password);

    if (hash) {
      if (user.password != user.confirmPassword) {
        return res.status(400).json({
          success: false,
          message: 'Password does not match with confirm password!',
        });
      }

      const newHash = bcrypt.hashSync(user.password, saltRounds);

      userExist.password = newHash;

      await userExist.save();

      return res.status(200).json({
        success: true,
        message: 'Password has been updated!'
      });

    } else {
      return res.status(400).json({
        success: false,
        message: 'Incorrect old password!'
      });
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating password!',
    });
  }
};

const GetProfile = async (context: ContextModel, res: Response) => {
  try {
    const profile = await User.findById(context.user._id).select({password: 0, code: 0, validTill: 0});

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

export default {
  CheckReachable,
  Signup,
  Signin,
  ForgotPassword,
  ResetPassword,
  GetProfile,
  UpdateProfile,
  UpdateUserPassword
}