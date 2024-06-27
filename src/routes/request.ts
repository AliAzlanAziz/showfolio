import express, { Router } from 'express';
import requestController from '../controllers/request';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isUsersAward } from '../middlewares/isAuthorized';

const router: Router = express.Router();

router.post('/', isAuthenticated, requestController.postRequest);

router.get('/:to', isAuthenticated, requestController.getRequest);

router.get('/', isAuthenticated, requestController.getRequests);

export default router;