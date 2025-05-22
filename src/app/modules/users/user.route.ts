import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "./user.validation";
import { UserControllers } from "./user.controller";
import auth from "../../middleware/auth";

const router = express.Router();


router.post('/create-user',validateRequest(UserValidation.createUserZodSchema),UserControllers.createUserFromDB);

router.get('/',UserControllers.getAllUserFromDB);

router.get('/:id',UserControllers.getSingelUserFromDB)

router.patch('/:id', UserControllers.updateUserFromDB)

router.get('/me', auth(['admin', 'user']), UserControllers.getMe);


export const UserRoutes = router;
