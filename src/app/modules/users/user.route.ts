import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "./user.validation";
import { UserControllers } from "./user.controller";

const router = express.Router();


router.post('/create-user',validateRequest(UserValidation.createUserZodSchema),UserControllers.createUserFromDB);

router.get('/',UserControllers.getAllUserFromDB);

router.get('/:id',UserControllers.getSingelUserFromDB)

router.patch('/:id', UserControllers.updateUserFromDB)

export const UserRoutes = router;
