import express, { Router } from 'express';
import workInfoController from '../controllers/workInfo';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isUsersWorkInfo } from '../middlewares/isAuthorized';

const router: Router = express.Router();

router.post('/', isAuthenticated, workInfoController.postWorkInfo);

router.put('/', isAuthenticated, isUsersWorkInfo, workInfoController.putWorkInfo);

router.get('/', isAuthenticated, workInfoController.getWorkInfo);

router.delete('/:id', isAuthenticated, isUsersWorkInfo, workInfoController.deleteWorkInfo);

export default router;