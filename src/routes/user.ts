import express, { Router } from 'express';
import userController from '../controllers/user';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router: Router = express.Router();

router.get('/', userController.checkReachable);

router.post('/signup', userController.postSignup);

router.post('/signin', userController.postSignin);

router.get('/profile', isAuthenticated, userController.getProfile);

export default router;