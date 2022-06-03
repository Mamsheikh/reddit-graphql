export interface User {
  loggedIn: boolean;
  email: string | null;
  displayName?: string;
  image?: string;
  id?: string;
}

import jwt from 'jsonwebtoken';

export type DecodedJWT = jwt.JwtPayload & { userId: string };
