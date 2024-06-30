import express, { Router } from 'express';
import subscriptionController from '../controllers/subscription';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { subsPayIntentCreateValidator } from '../validators/subPayIntentCreate.validator';

const router: Router = express.Router();

router.post('/payment-intents', subsPayIntentCreateValidator, isAuthenticated, subscriptionController.postPaymentIntents);

router.get('/packages', subscriptionController.getPackages);

export default router;