import { PrismaClient } from '@prisma/client';
import { IncomingMessage } from 'http';
import { NextApiRequest } from 'next';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

export interface Context {
  req:
    | NextApiRequest
    | (IncomingMessage & {
        cookies: NextApiRequestCookies;
      });
  prisma: PrismaClient;
}
