import { IncomingMessage } from 'http';
import nookies from 'nookies';
import { NextApiRequest } from 'next';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { verifyToken } from './jwt';

export const IsAuth = async (
  req:
    | NextApiRequest
    | (IncomingMessage & {
        cookies: NextApiRequestCookies;
      })
) => {
  const cookies = nookies.get({ req });
  const token = cookies.sid;
  if (!token) {
    throw new Error('Not logged in');
  }

  const decodedJwt = await verifyToken(token);
  if (!decodedJwt.userId) {
    throw new Error('not logged in');
  }

  return decodedJwt;
};
