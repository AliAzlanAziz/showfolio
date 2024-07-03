import express, { Router } from 'express';
import waitListController from '../controllers/waitList';

const router: Router = express.Router();

router.post('/', waitListController.postWaitList);

export default router;