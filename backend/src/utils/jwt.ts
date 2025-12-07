import jwt, { SignOptions } from 'jsonwebtoken';
import { Role } from '@prisma/client';

interface TokenPayload {
  id: string;
  email: string;
  role: Role;
  communityId?: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_ACCESS_SECRET || 'default-secret';
  return jwt.sign(payload, secret, {
    expiresIn: '15m'
  });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_REFRESH_SECRET || 'default-secret';
  return jwt.sign(payload, secret, {
    expiresIn: '7d'
  });
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  const secret = process.env.JWT_REFRESH_SECRET || 'default-secret';
  return jwt.verify(token, secret) as TokenPayload;
};
