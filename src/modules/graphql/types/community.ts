import { extendType, nonNull, nullable, objectType, stringArg } from 'nexus';
import { createCommunityResolver } from '../resolvers/createCommunityResolver';

export const createCommunity = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createCommunity', {
      type: Community,
      args: {
        communityName: nonNull(stringArg()),
        communityType: nullable(stringArg()),
      },
      resolve: createCommunityResolver,
    });
  },
});

const Community = objectType({
  name: 'Community',
  definition(t) {
    t.string('name');
    t.string('creatorId');
    t.string('image');
    t.int('numberOfMembers');
  },
});
