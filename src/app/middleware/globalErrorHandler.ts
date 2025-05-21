import { Request, Response, NextFunction } from 'express';
import config from '../config';
import { ZodError } from 'zod';
import { handleZodError } from '../config/errors/handleZodError';
import handleValidationError from '../config/errors/handleValidationError';
import handleCastError from '../config/errors/handleCastError';
import handleDuplicateError from '../config/errors/handleDublicateError';
import { TErrorSource } from '../config/interface/error';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';
  let errorSources: TErrorSource[] = [];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } 
  
  else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }
  
  else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } 
  
  else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }
  
  
  else {
    // Fallback for unhandled errors
    errorSources = [
      {
        path: '',
        message: message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    error: config.NODE_ENV === 'development' ? err : undefined,
  });
};
