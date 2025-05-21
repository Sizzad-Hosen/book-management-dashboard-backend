import { NextFunction, Request, Response } from 'express'

import { ZodTypeAny } from 'zod';


const validateRequest = (schema: ZodTypeAny) => (req:Request, res:Response, next:NextFunction) => {
  try {
    schema.parse(
      {
        body: req.body,
        query: req.query,
        params: req.params
       });

    next();

    
  } catch (error) {
    next(error);
  }
};


export default validateRequest
