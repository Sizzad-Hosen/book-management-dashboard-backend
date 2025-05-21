import express from 'express';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();


router.post(
  '/login',
  validateRequest(AuthValidation.LoginUserValidation),
  AuthControllers.loginUser,
);

// router.post(
//   '/change-password',
//   validateRequest(AuthValidation.changePasswordValidationSchema),
//   AuthControllers.changePassword,
// );

// router.post(
//   '/refresh-token',
//   validateRequest(AuthValidation.refreshTokenValidationSchema),
//   AuthControllers.refreshToken,
// );



// router.post('/forget-password',validateRequest(AuthValidation.forgetPasswordValidationSchema),AuthControllers.forgetPassword)


// router.post('/reset-password',validateRequest(AuthValidation.resetPasswordValidationSchema),AuthControllers.resetPassword)


export const AuthRoutes = router;