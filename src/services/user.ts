import { Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { UserSignupModel } from "../models/userSignup.model";
import { UserSigninModel } from "../models/userSignin.model";
import { ContextModel } from "../models/context.model";
import User from "../schema/user";

const saltRounds = 10;

const checkReachable = async (res: Response) => {
  try {
    return res.status(200).json({ 
      success: true,
      message: "User APIs reachable" 
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
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
        message: "User already exist!",
      });
    }

    if (user.password != user.confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password does not match with confirm password!",
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
      message: "Successfully signed up!",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error signing up!",
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
        message: "User does not exist!",
      });
    }

    const hash = bcrypt.compareSync(user.password, result.password);

    if (hash) {
      const token = jwt.sign(
        {
          id: result._id,
        },
        process.env.SECRET_KEY as string,
        { expiresIn: "7d" }
      );

      return res.status(200).json({
        success: false,
        message: "Successfully signed in!",
        token: token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Incorrect Credentials!",
      });
    }
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error signing in!",
    });
  }
};

const Profile = async (context: ContextModel, res: Response) => {
  try {
    const profile = await User.findById(context.user._id).select(
      "name username email _id"
    );

    return res.status(200).json({
      success: true,
      profile: profile,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export default {
  checkReachable,
  Signup,
  Signin,
  Profile
}