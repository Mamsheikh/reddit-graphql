import { extendType, inputObjectType, nonNull, objectType } from 'nexus';
import { createPostResolver } from '../resolvers/createPostResolver';

export const createPost = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createPost', {
      type: post,
      args: { input: nonNull(createPostInput) },
      resolve: createPostResolver,
    });
  },
});

const createPostInput = inputObjectType({
  name: 'createPostInput',
  definition(t) {
    t.nonNull.string('title');
    t.nonNull.string('communityId');
    t.nullable.string('body');
    t.nullable.string('image');
  },
});

export const post = objectType({
  name: 'Post',
  definition(t) {
    t.string('title'), t.string('body');
    t.string('communityId');
    t.string('image');
    t.string('userId');
  },
});
