import { FieldResolver } from 'nexus';
import { postState } from '../../../atoms/postAtom';

export const getPostsResolver: FieldResolver<'Query', 'getPosts'> = async (
  _,
  { communityId },
  { prisma }
) => {
  const posts = await prisma.post.findMany({
    where: { communityId: communityId },
    orderBy: { createdAt: 'desc' },
  });

  if (!postState) {
    throw new Error('no post found');
  }

  return posts;
};
