// import { Community } from '@prisma/client';
import { FieldResolver } from 'nexus';
import { IsAuth } from '../../../utils/auth';

export const joinCommunityResolver: FieldResolver<
  'Mutation',
  'joinCommunity'
> = async (_, { communityId }, { req, prisma }) => {
  const decodedJwt = await IsAuth(req);

  // const communities = await prisma.user
  //   .findFirst({
  //     where: { id: decodedJwt.userId },
  //     rejectOnNotFound: true,
  //   })
  //   .communities();

  //   const communities = await prisma.user
  //     .findUnique({
  //       where: { id: user.id },
  //     })
  //     .communities();

  // const isJoined = !!communities.find(
  //   (item: Community) => item.id === communityId
  // );

  return await prisma.community.update({
    where: { id: communityId },
    data: {
      users: { connect: { id: decodedJwt.userId } },
      numberOfMembers: { increment: 1 },
    },
  });
};
