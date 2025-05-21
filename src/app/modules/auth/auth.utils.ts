import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export const createToken = (
  payload: Record<string, unknown>,
  secret: string,
  expiresIn: string
) => {
  // Explicitly create options object with correct type
  const options: SignOptions = { expiresIn };

  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
