import express from 'express';

import validateRequest from '../../middleware/validateRequest';
import { AdminValidation, createAdminZodSchema } from './admin.validation';
import { AdminControllers } from './admin.controller';



const router = express.Router();

router.post('/create-admin', validateRequest(AdminValidation.createAdminZodSchema), AdminControllers.createAdmin);

// router.get('/', getAllAdmins);
// router.get('/:id', getSingleAdmin);
// router.patch('/:id', updateAdmin);
// router.delete('/:id', deleteAdmin);

export const AdminRoutes = router;
