import { createToken } from './../../../utils/jwt';
import { FieldResolver } from 'nexus';
import { hash } from 'bcrypt';
import nookies from 'nookies';
import { registrationValidation } from './../../../utils/registrationValidation';
import { CookieSerializeOptions } from 'next/dist/server/web/types';

export const createUserResolver: FieldResolver<
  'Mutation',
  'createUser'
> = async (_, { credentials }, { prisma, res }) => {
  await registrationValidation.validate(credentials);

  const user = await prisma.user.findFirst({
    where: {
      email: credentials.email,
    },
  });

  if (user !== null) {
    throw new Error('Email already taken');
  }
  const passHash = await hash(credentials.password, 7);
  const newUser = await prisma.user.create({
    data: {
      email: credentials.email,
      passHash: passHash,
    },
  });

  const encodedToken = await createToken(
    { id: newUser.id },
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
    message: 'User created sucessfull',
  };
};
