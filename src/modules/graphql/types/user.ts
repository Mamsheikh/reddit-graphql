import { extendType, objectType, nonNull, inputObjectType } from 'nexus';
import { createUserResolver } from '../resolvers/createUser';

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
