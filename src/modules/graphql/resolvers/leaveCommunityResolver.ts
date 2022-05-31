// import { Community } from '@prisma/client';
import { FieldResolver } from 'nexus';
import { IsAuth } from '../../../utils/auth';

export const leaveCommunityResolver: FieldResolver<
  'Mutation',
  'leaveCommunity'
> = async (_, { communityId }, { req, prisma }) => {
  const decodedJwt = await IsAuth(req);

  //   const communities = await prisma.user
  //     .findFirst({
  //       where: { id: decodedJwt.userId },
  //       rejectOnNotFound: true,
  //     })
  //     .communities();

  //   const communities = await prisma.user
  //     .findUnique({
  //       where: { id: user.id },
  //     })
  //     .communities();

  //   const isJoined = !!communities.find(
  //     (item: Community) => item.id === communityId
  //   );
  //   if (isJoined) {
  return await prisma.community.update({
    where: {
      id: communityId,
    },
    data: {
      users: { disconnect: { id: decodedJwt.userId } },
      numberOfMembers: -1,
    },
  });
  // return;
};
