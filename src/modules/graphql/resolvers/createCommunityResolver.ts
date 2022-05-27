import { IsAuth } from './../../../utils/auth';
import { FieldResolver } from 'nexus';

export const createCommunityResolver: FieldResolver<
  'Mutation',
  'createCommunity'
> = async (_, { communityName, communityType }, { prisma, req }) => {
  const decodedJwt = await IsAuth(req);
  const user = await prisma.user.findUnique({
    where: { id: decodedJwt.userId },
  });
  if (!user) {
    throw new Error('no user found');
  }
  const community = await prisma.community.findFirst({
    where: { name: communityName },
  });
  if (community) {
    throw new Error(`Sorry r/${communityName} is taken😥. Try another`);
  }

  const newCommunity = await prisma.community.create({
    data: {
      creatorId: user.id,
      name: communityName,
      privacyType: communityType,
      numberOfMembers: 1,
    },
  });
  return {
    name: newCommunity.name,
    image: newCommunity.imgURL,
    creatorId: newCommunity.creatorId,
    numberOfMembers: newCommunity.numberOfMembers,
  };
};
