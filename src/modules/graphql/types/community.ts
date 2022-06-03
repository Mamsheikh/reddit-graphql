import {
  extendType,
  list,
  nonNull,
  nullable,
  objectType,
  stringArg,
} from 'nexus';
import { createCommunityResolver } from '../resolvers/createCommunityResolver';
import { getCommunityResolver } from '../resolvers/getCommunityResolver';
import { getUsersCommunitesResolver } from '../resolvers/getUsersCommunitiesResolver';
import { joinCommunityResolver } from '../resolvers/joinCommunityResolver';
import { leaveCommunityResolver } from '../resolvers/leaveCommunityResolver';
import { updateCommunityImageResolver } from '../resolvers/updateCommunityImageResolver';

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

export const getUsersCommunities = extendType({
  type: 'Query',
  definition(t) {
    t.field('getUsersCommunities', {
      type: list(Community),
      resolve: getUsersCommunitesResolver,
    });
  },
});

export const joinCommunity = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('joinCommunity', {
      type: Community,
      args: { communityId: nonNull(stringArg()) },
      resolve: joinCommunityResolver,
    });
  },
});

export const leaveCommunity = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('leaveCommunity', {
      type: Community,
      args: { communityId: nonNull(stringArg()) },
      resolve: leaveCommunityResolver,
    });
  },
});

export const updateCommunityImage = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateCommunityImage', {
      type: Community,
      args: { communityId: nonNull(stringArg()), image: nonNull(stringArg()) },
      resolve: updateCommunityImageResolver,
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
