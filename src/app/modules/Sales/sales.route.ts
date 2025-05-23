// sales.route.ts
import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { SalesValidation } from './sales.validation';
import { SalesControllers } from './sales.controller';


const router = express.Router();

router.post(
  '/create-sale',
   validateRequest(SalesValidation.createSaleZodSchema),
  SalesControllers.createSaleHandler
);


router.get('/sales-history', SalesControllers.getSalesHistoryHandler);

export const SalesRoutes =  router;
