import {
  extendType,
  inputObjectType,
  list,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';
import { IsAuth } from '../../../utils/auth';
import { createPostResolver } from '../resolvers/createPostResolver';
import { getPostsResolver } from '../resolvers/getPostsResolver';
import { User } from './user';

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

export const getPosts = extendType({
  type: 'Query',
  definition(t) {
    t.field('getPosts', {
      type: list(post),
      args: { communityId: nonNull(stringArg()) },
      resolve: getPostsResolver,
    });
  },
});

export const deletePost = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deletePost', {
      type: deletePostResponse,
      args: { postId: nonNull(stringArg()) },
      async resolve(_, { postId }, { req, prisma }) {
        const decodedJwt = await IsAuth(req);

        const user = await prisma.user.findUnique({
          where: { id: decodedJwt.userId },
        });

        const post = await prisma.post.findUnique({
          where: { id: postId },
        });

        if (user.id !== post.userId) {
          throw new Error('you can only delete your post');
        }

        await prisma.post.delete({
          where: { id: post.id },
        });

        return {
          success: true,
        };
      },
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
    t.string('id');
    t.string('title');
    t.string('body');
    t.string('communityId');
    t.string('image');
    t.string('userId');
    t.string('createdAt');
    t.field('community', {
      type: 'Community',
      async resolve(parent, _, ctx) {
        const community = await ctx.prisma.community.findUnique({
          where: { id: parent.communityId },
        });
        return {
          id: community.id,
          name: community.name,
          image: community.imgURL,
          creatorId: community.creatorId,
          numberOfMembers: community.numberOfMembers,
          createdAt: community.createdAt.toDateString(),
          privacyType: community.privacyType,
        };
      },
    });
    t.field('user', {
      type: User,
      async resolve(parent, _, ctx) {
        return await ctx.prisma.user.findUnique({
          where: { id: parent.userId },
        });
      },
    });
  },
});

export const deletePostResponse = objectType({
  name: 'DeletePostResponse',
  definition(t) {
    t.nonNull.boolean('success');
  },
});
