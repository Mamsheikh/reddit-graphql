import { extendType, FieldResolver, objectType } from 'nexus';
import { v2 as cloudinary } from 'cloudinary';
import { IsAuth } from '../../../utils/auth';

export const createImageSignature = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createImageSignature', {
      type: ImageSignature,
      resolve: createImageSignatureResolver,
    });
  },
});

const createImageSignatureResolver: FieldResolver<
  'Mutation',
  'createImageSignature'
> = async (_, __, { req }) => {
  await IsAuth(req);
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
    },
    process.env.CLOUDINARY_SECRET as string
  );

  return { timestamp, signature };
};

const ImageSignature = objectType({
  name: 'ImageSignature',
  definition(t) {
    t.string('signature');
    t.int('timestamp');
  },
});
