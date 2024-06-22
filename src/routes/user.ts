import express, { Router } from 'express';
import userController from '../controllers/user';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isUsersWorkInfo } from '../middlewares/isAuthorized';

const router: Router = express.Router();

router.get('/', userController.checkReachable);

router.post('/signup', userController.postSignup);

router.post('/signin', userController.postSignin);

router.get('/profile', isAuthenticated, userController.getProfile);

router.post('/workinfo', isAuthenticated, userController.postWorkInfo);

router.put('/workinfo', isAuthenticated, isUsersWorkInfo, userController.putWorkInfo);

router.get('/workinfo', isAuthenticated, userController.getWorkInfo);

export default router;