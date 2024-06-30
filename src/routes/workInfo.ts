import express, { Router } from 'express';
import workInfoController from '../controllers/workInfo';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isUsersWorkInfo } from '../middlewares/isAuthorized';
import { workInfoCreateUpdateValidator } from '../validators/workInfoCreateUpdate.validator';
import { mongooseObjectIdValidator } from '../validators/mongooseObjectId.validator';

const router: Router = express.Router();

router.post('/', workInfoCreateUpdateValidator, isAuthenticated, workInfoController.postWorkInfo);

router.put('/', workInfoCreateUpdateValidator, isAuthenticated, isUsersWorkInfo, workInfoController.putWorkInfo);

router.get('/:id', isAuthenticated, workInfoController.getWorkInfo);

router.get('/', isAuthenticated, workInfoController.getWorkInfos);

router.delete('/:id', mongooseObjectIdValidator, isAuthenticated, isUsersWorkInfo, workInfoController.deleteWorkInfo);

export default router;