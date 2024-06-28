import express, { Router } from 'express';
import stripeController from '../controllers/stripe';

const router: Router = express.Router();

router.post('/webhook', stripeController.postWebhook);

export default router;