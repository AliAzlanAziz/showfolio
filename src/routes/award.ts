import express, { Router } from 'express';
import awardController from '../controllers/award';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isUsersAward } from '../middlewares/isAuthorized';
import { awardCreateUpdateValidator } from '../validators/awardCreateUpdate.validator';
import { mongooseObjectIdValidator } from '../validators/mongooseObjectId.validator';

const router: Router = express.Router();

router.post('/', awardCreateUpdateValidator, isAuthenticated, awardController.postAward);

router.put('/', awardCreateUpdateValidator, isAuthenticated, isUsersAward, awardController.putAward);

router.get('/:id', isAuthenticated, awardController.getAward);

router.get('/', isAuthenticated, awardController.getAwards);

router.delete('/:id', isAuthenticated, isUsersAward, awardController.deleteAward);

export default router;