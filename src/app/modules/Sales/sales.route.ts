
import express from 'express'
import validateRequest from '../../middleware/validateRequest';
import { SalesValidation } from './sales.validation';
import { SalesControllers } from './sales.controller';

const router = express.Router();


router.post('/sell',
    // validateRequest(SalesValidation.createSaleZodSchema),
    SalesControllers.createSaleHandler)



export const SalesRoutes = router;

