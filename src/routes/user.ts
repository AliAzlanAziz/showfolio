import express, { Router } from 'express';
import userController from '../controllers/user';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { multerImageUploader } from '../helper/multerImageUpload';

const router: Router = express.Router();

router.get('/', userController.checkReachable);

router.post('/signup', userController.postSignup);

router.post('/signin', userController.postSignin);

router.put('/profile', isAuthenticated, userController.putProfile);

router.get('/profile', isAuthenticated, userController.getProfile);

export default router;