import { createToken } from './../../../utils/jwt';
import { registrationValidation } from './../../../utils/registrationValidation';
import { FieldResolver } from 'nexus';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';
import nookies from 'nookies';

import { CookieSerializeOptions } from 'next/dist/server/web/types';

export const loginResolver: FieldResolver<'Mutation', 'createUser'> = async (
  _,
  { credentials },
  { prisma, res }
) => {
  await registrationValidation.validate(credentials);

  const existingUser = await getExistingUser(credentials, prisma);

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
    message: 'Login sucessfull',
  };
};

const getExistingUser = async (
  credentials: { email: string; password: string },
  prisma: PrismaClient
) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      email: credentials.email,
    },
    select: { email: true, passHash: true, id: true },
  });

  const passwordMatch = await compare(
    credentials.password,
    (existingUser?.passHash as string) || ''
  );

  if (!existingUser || !passwordMatch) {
    throw new Error('Incorrect username or password!');
  }

  return existingUser;
};
