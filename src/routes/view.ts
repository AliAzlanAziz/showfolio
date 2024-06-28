import express, { Router } from 'express';
import viewController from '../controllers/view';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router: Router = express.Router();

router.post('/', isAuthenticated, viewController.postView);

router.put('/', isAuthenticated, viewController.putView);

router.get('/count', isAuthenticated, viewController.getAllUserViews);

router.get('/viewers', isAuthenticated, viewController.getAllUserViewers);

// TODO: Is the below function necessary?
router.get('/:to', isAuthenticated, viewController.getView);

// TODO: Is the below function necessary?
router.get('/', isAuthenticated, viewController.getViews);

export default router;