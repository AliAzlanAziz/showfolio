import express, { Router } from 'express';
import awardController from '../controllers/award';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isUsersAward } from '../middlewares/isAuthorized';

const router: Router = express.Router();

router.post('/', isAuthenticated, awardController.postAward);

router.put('/', isAuthenticated, isUsersAward, awardController.putAward);

router.get('/', isAuthenticated, awardController.getAwards);

router.delete('/:id', isAuthenticated, isUsersAward, awardController.deleteAward);

export default router;