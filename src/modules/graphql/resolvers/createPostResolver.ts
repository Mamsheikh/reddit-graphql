import { IsAuth } from './../../../utils/auth';
import { FieldResolver } from 'nexus';

export const createPostResolver: FieldResolver<
  'Mutation',
  'createPost'
> = async (
  _,
  { input: { title, body, communityId, image } },
  { prisma, req }
) => {
  const decodedJwt = await IsAuth(req);

  const user = await prisma.user.findUnique({
    where: { id: decodedJwt.userId },
  });

  const newPost = await prisma.post.create({
    data: {
      title: title,
      body: body,
      community: { connect: { name: communityId } },
      user: { connect: { id: user?.id } },
      image: image,
    },
  });

  return newPost;
};
