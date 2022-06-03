import { FieldResolver } from 'nexus';
import { IsAuth } from '../../../utils/auth';

export const updateCommunityImageResolver: FieldResolver<
  'Mutation',
  'updateCommunityImage'
> = async (_, { communityId, image }, { prisma, req }) => {
  const decodedJwt = await IsAuth(req);

  const user = await prisma.user.findUnique({
    where: { id: decodedJwt.userId },
  });

  const community = await prisma.community.findUnique({
    where: { id: communityId },
  });

  if (user.id !== community.creatorId) {
    throw new Error('not allowed');
  }
  const updatedCommunity = await prisma.community.update({
    where: { id: communityId },
    data: {
      imgURL: image,
    },
  });

  return {
    id: updatedCommunity.id,
    name: updatedCommunity.name,
    image: updatedCommunity.imgURL,
    creatorId: updatedCommunity.creatorId,
    numberOfMembers: updatedCommunity.numberOfMembers,
    createdAt: updatedCommunity.createdAt.toString(),
    privacyType: updatedCommunity.privacyType,
  };
};
