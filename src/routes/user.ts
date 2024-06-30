import express, { Router } from 'express';
import userController from '../controllers/user';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { userSignupValidator } from '../validators/userSignup.validator';
import { userSigninValidator } from '../validators/userSignin.validator';
import { userUpdateValidator } from '../validators/userUpdate.validator';
import { userForgetPasswordValidator } from '../validators/userForgetPassword.validator';
import { userResetPasswordValidator } from '../validators/userResetPassword.validator';
import { userUpdatePasswordValidator } from '../validators/userUpdatePassword.validator';

const router: Router = express.Router();

router.get('/', userController.checkReachable);

router.post('/signup', userSignupValidator, userController.postSignup);

router.post('/signin', userSigninValidator, userController.postSignin);

router.put('/profile', isAuthenticated, userUpdateValidator, userController.putProfile);

router.put('/password', isAuthenticated, userUpdatePasswordValidator, userController.putUserPassword);

router.get('/profile', isAuthenticated, userController.getProfile);

router.post('/forgot-password', userForgetPasswordValidator, userController.postForgotPassword);

router.post('/reset-password', userResetPasswordValidator, userController.postResetPassword);

export default router;