import { FieldResolver } from 'nexus';
import { hash } from 'bcrypt';
import { registrationValidation } from './../../../utils/registrationValidation';

export const createUserResolver: FieldResolver<
  'Mutation',
  'createUser'
> = async (_, { credentials }, { prisma }) => {
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
  await prisma.user.create({
    data: {
      email: credentials.email,
      passHash: passHash,
    },
  });

  return {
    message: 'User created sucessfull',
  };
};
