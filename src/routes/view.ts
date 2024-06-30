import express, { Router } from 'express';
import viewController from '../controllers/view';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { viewCreateUpdateValidator } from '../validators/viewCreateUpdate.validator';

const router: Router = express.Router();

router.post('/', viewCreateUpdateValidator, isAuthenticated, viewController.postView);

router.put('/request', viewCreateUpdateValidator, isAuthenticated, viewController.putView);

router.get('/count', isAuthenticated, viewController.getUserViewsCount);

router.get('/viewers', isAuthenticated, viewController.getAllUserViewers);

export default router;