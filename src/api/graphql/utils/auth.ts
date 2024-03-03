import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

export const authenticate = (token: string) => {
  if (!token) throw new AuthenticationError('No token provided');
  try {
    return jwt.verify(token, "token");
  } catch (e) {
    throw new AuthenticationError('Invalid or expired token');
  }
};
