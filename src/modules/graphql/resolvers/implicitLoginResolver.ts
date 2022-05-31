import { FieldResolver } from 'nexus';
import nookies from 'nookies';
import { verifyToken } from '../../../utils/jwt';
export const implicitLoginResolver: FieldResolver<
  'Query',
  'implicitLogin'
> = async (_, __, { req, prisma }) => {
  try {
    //get token from cookies
    const cookies = nookies.get({ req });
    const token = cookies.sid || null;
    if (!token) {
      throw new Error('not logged in');
    }
    const decodedToken = await verifyToken(token);
    console.log('id', decodedToken.userId);
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.userId },
    });
    if (!user) {
      throw new Error('no user found with this ID');
    }

    return {
      loggedIn: true,
      displayName: user.displayName,
      email: user.email,
      image: user.image,
      id: user.id,
    };
  } catch (error) {
    console.log('implicitLoginResolver error', error);
    return {
      loggedIn: false,
    };
  }
};
