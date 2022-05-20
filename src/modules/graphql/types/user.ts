import { extendType, objectType, nonNull, inputObjectType } from 'nexus';
import { createUserResolver } from '../resolvers/createUser';
import { loginResolver } from '../resolvers/loginResolver';

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
