import { extendType, nonNull, nullable, objectType, stringArg } from 'nexus';
import { createCommunityResolver } from '../resolvers/createCommunityResolver';
import { getCommunityResolver } from '../resolvers/getCommunityResolver';

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

export const getCommunity = extendType({
  type: 'Query',
  definition(t) {
    t.field('getCommunity', {
      type: Community,
      args: { communityName: nonNull(stringArg()) },
      resolve: getCommunityResolver,
    });
  },
});

const Community = objectType({
  name: 'Community',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('privacyType');
    t.string('creatorId');
    t.string('image');
    t.int('numberOfMembers');
    t.string('createdAt');
  },
});
