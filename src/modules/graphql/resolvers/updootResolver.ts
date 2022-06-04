import { FieldResolver } from 'nexus';
import { IsAuth } from '../../../utils/auth';

export const updootResolver: FieldResolver<'Mutation', 'vote'> = async (
  _,
  { postId, value },
  { prisma, req }
) => {
  const decodedJwt = await IsAuth(req);
  const isUpdoot = value !== -1;
  const realValue: number = isUpdoot ? 1 : -1;
  //   const votes = await prisma.vote.findMany({
  //     where: { userId: decodedJwt.userId },
  //   });

  const hasVoted = await prisma.vote.findFirst({
    where: { postId: postId, userId: decodedJwt.userId },
  });
  //No existing vote
  if (!hasVoted) {
    await prisma.vote.create({
      data: {
        post: { connect: { id: postId } },
        user: { connect: { id: decodedJwt.userId } },
        value: realValue,
      },
    });
    await prisma.post.update({
      where: { id: postId },
      data: {
        points: realValue,
      },
    });
    return true;
  } else {
    //delete vote
    if (hasVoted.value === realValue) {
      await prisma.vote.delete({
        where: { id: hasVoted.id },
      });

      await prisma.post.update({
        where: { id: postId },
        data: {
          points: 2 * realValue,
        },
      });
      return true;
      //change from updoot to downdoot
    } else {
      await prisma.vote.update({
        where: { id: hasVoted.id },
        data: {
          value: realValue,
        },
      });

      await prisma.post.update({
        where: { id: postId },
        data: {
          points: 2 * realValue,
        },
      });
      return true;
    }
  }
};
