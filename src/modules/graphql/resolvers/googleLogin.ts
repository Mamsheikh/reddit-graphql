import { CookieSerializeOptions } from 'cookie';
import nookies from 'nookies';
import { FieldResolver } from 'nexus';
import { Google } from '../../../lib/Google';
import { createToken } from '../../../utils/jwt';

export const googleLoginResolver: FieldResolver<
  'Mutation',
  'googleLogin'
> = async (_, { code }, { prisma, res }) => {
  try {
    const { user } = await Google.logIn(code);
    // Names/Photos/Email Lists
    const userNamesList = user.names && user.names.length ? user.names : null;
    const userPhotosList =
      user.photos && user.photos.length ? user.photos : null;
    const userEmailsList =
      user.emailAddresses && user.emailAddresses.length
        ? user.emailAddresses
        : null;

    // User Display Name
    const userName = userNamesList ? userNamesList[0].displayName : null;

    // User Id
    const userId =
      userNamesList &&
      userNamesList[0].metadata &&
      userNamesList[0].metadata.source
        ? userNamesList[0].metadata.source.id
        : null;

    // User Avatar
    const userAvatar =
      userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null;

    // User Email
    const userEmail =
      userEmailsList && userEmailsList[0].value
        ? userEmailsList[0].value
        : null;

    if (!userId || !userName || !userAvatar || !userEmail) {
      throw new Error('Google login error');
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (existingUser) {
      await prisma.user.update({
        where: { email: existingUser.email },
        data: {
          displayName: userName,
          image: userAvatar,
        },
      });

      const encodedToken = await createToken(
        { userId: existingUser.id },
        {
          expiresIn: '7d',
        }
      );

      nookies.set({ res }, 'sid', encodedToken, {
        httpOnly: true,
        domain: process.env.SERVER_DOMAIN || undefined,
        maxAge: 60 * 60 * 24 * 7, // 7d
        sameSite: true,
        path: '/',
      } as CookieSerializeOptions);
      return {
        message: 'Login successful',
      };
    }

    const newUser = await prisma.user.create({
      data: {
        email: userEmail,
        displayName: userName,
        image: userAvatar,
      },
    });

    const encodedToken = await createToken(
      { userId: newUser.id },
      {
        expiresIn: '7d',
      }
    );

    nookies.set({ res }, 'sid', encodedToken, {
      httpOnly: true,
      domain: process.env.SERVER_DOMAIN || undefined,
      maxAge: 60 * 60 * 24 * 7, // 7d
      sameSite: true,
      path: '/',
    } as CookieSerializeOptions);

    return {
      message: 'google login success',
    };
  } catch (error) {
    return {
      message: `failed to loginvia google: ${error}`,
    };
  }
};
