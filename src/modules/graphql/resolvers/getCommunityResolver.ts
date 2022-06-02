import { FieldResolver } from 'nexus';

export const getCommunityResolver: FieldResolver<
  'Query',
  'getCommunity'
> = async (_, { communityName }, { prisma }) => {
  const community = await prisma.community.findUnique({
    where: { name: communityName },
  });

  if (!community) {
    throw new Error('No Community found');
  }

  return {
    id: community.id,
    name: community.name,
    image: community.imgURL,
    creatorId: community.creatorId,
    numberOfMembers: community.numberOfMembers,
    createdAt: community.createdAt.toDateString(),
    privacyType: community.privacyType,
  };
};
