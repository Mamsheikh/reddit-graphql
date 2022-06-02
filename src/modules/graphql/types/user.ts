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
import { implicitLoginResolver } from '../resolvers/implicitLoginResolver';

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

export const ImplicitLogin = extendType({
  type: 'Query',
  definition(t) {
    t.field('implicitLogin', {
      type: ImplicitLoginResponse,
      resolve: implicitLoginResolver,
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
    t.string('displayName');
    t.string('email');
    t.string('image');
  },
});

const CreateUserInput = inputObjectType({
  name: 'CreateUserInput',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('password');
  },
});

const ImplicitLoginResponse = objectType({
  name: 'ImplicitLoginResponse',
  definition(t) {
    t.nonNull.boolean('loggedIn');
    t.string('email');
    t.string('displayName');
    t.string('id');
    t.string('image');
  },
});

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id'), t.string('email');
    t.string('displayName');
    t.string('image');
  },
});
