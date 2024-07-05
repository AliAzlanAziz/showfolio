import express, { Router } from 'express';
import userController from '../controllers/user';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { userSignupValidator } from '../validators/userSignup.validator';
import { userSigninValidator } from '../validators/userSignin.validator';
import { userUpdateValidator } from '../validators/userUpdate.validator';
import { userForgetPasswordValidator } from '../validators/userForgetPassword.validator';
import { userResetPasswordValidator } from '../validators/userResetPassword.validator';
import { userUpdatePasswordValidator } from '../validators/userUpdatePassword.validator';
import { mongooseObjectIdValidator } from '../validators/mongooseObjectId.validator';
import { userResetPasswordCodeValidator } from '../validators/userResetPasswordCode.validator';

const router: Router = express.Router();

router.get('/', userController.checkReachable);

router.post('/signup', userSignupValidator, userController.postSignup);

router.post('/signin', userSigninValidator, userController.postSignin);

router.put('/profile', userUpdateValidator, isAuthenticated, userController.putProfile);

router.put('/password', userUpdatePasswordValidator, isAuthenticated, userController.putUserPassword);

router.put('/toggle-public', isAuthenticated, userController.putProfilePublicToggle);

router.get('/profile', isAuthenticated, userController.getSelfProfile);

router.post('/forgot-password', userForgetPasswordValidator, userController.postForgotPassword);

router.post('/verify-reset-password-code', userResetPasswordCodeValidator, userController.postResetPasswordCodeVerify);

router.post('/reset-password', userResetPasswordValidator, userController.postResetPassword);

router.get('/:id', mongooseObjectIdValidator, isAuthenticated, userController.getUserProfile);

router.get('/search', isAuthenticated, userController.getSearchProfiles);

router.delete('/delete', isAuthenticated, userController.deleteAccount);

export default router;