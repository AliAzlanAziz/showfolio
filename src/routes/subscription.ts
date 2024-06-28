import express, { Router } from 'express';
import subscriptionController from '../controllers/subcription';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router: Router = express.Router();

router.post('/payment-intents', isAuthenticated, subscriptionController.postPaymentIntents);

router.get('/packages', subscriptionController.getPackages);

router.post('/webhook', subscriptionController.postWebhook);

export default router;