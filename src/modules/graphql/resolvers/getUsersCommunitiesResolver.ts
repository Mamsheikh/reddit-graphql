import { FieldResolver } from 'nexus';
import { IsAuth } from '../../../utils/auth';

export const getUsersCommunitesResolver: FieldResolver<
  'Query',
  'getUsersCommunities'
> = async (_, __, { req, prisma }) => {
  const decodedJwt = await IsAuth(req);

  const user = await prisma.user.findFirst({
    where: { id: decodedJwt.userId },
  });
  if (!user) {
    throw new Error('no user found');
  }

  const communities = await prisma.user
    .findUnique({
      where: { id: user.id },
    })
    .communities();

  return communities;
};
