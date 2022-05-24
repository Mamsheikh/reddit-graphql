import { Google } from './../../../lib/Google';
import {
  extendType,
  objectType,
  nonNull,
  inputObjectType,
  stringArg,
} from 'nexus';
import { createUserResolver } from '../resolvers/createUser';
import { loginResolver } from '../resolvers/loginResolver';
import { googleLoginResolver } from '../resolvers/googleLogin';

export const createUser = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: registerResponse,
      args: { credentials: nonNull(CreateUserInput) },
      resolve: createUserResolver,
    });
  },
});

export const login = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('login', {
      type: 'registerResponse',
      args: { credentials: nonNull(CreateUserInput) },
      resolve: loginResolver,
    });
  },
});

export const googleLogin = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('googleLogin', {
      type: registerResponse,
      args: {
        code: nonNull(stringArg()),
      },
      resolve: googleLoginResolver,
    });
  },
});

export const googleAuthUrl = extendType({
  type: 'Query',
  definition(t) {
    t.field('googleAuthUrl', {
      type: 'String',
      resolve() {
        return Google.authUrl;
      },
    });
  },
});

const registerResponse = objectType({
  name: 'registerResponse',
  definition(t) {
    t.nonNull.string('message');
  },
});

const CreateUserInput = inputObjectType({
  name: 'CreateUserInput',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('password');
  },
});
