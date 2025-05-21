import { TErrorSources, TGenericErrorResponse } from "../interface/error";

import { ZodError, ZodIssue } from 'zod';

export const handleZodError = (err: ZodError):TGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => ({
    path: issue.path[issue.path.length - 1],
    message: issue.message,
  }));

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorSources,
  };
};
