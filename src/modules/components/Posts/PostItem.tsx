import React, { useState } from 'react';
import {
  Alert,
  AlertIcon,
  Flex,
  Icon,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import moment from 'moment';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsChat, BsDot } from 'react-icons/bs';
import { FaReddit } from 'react-icons/fa';
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from 'react-icons/io5';
// import { Post } from '../../atoms/postsAtom';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  GetPostsDocument,
  Post,
  useDeletePostMutation,
} from '../../../../generated/graphql';
import useUserData from '../../hooks/useUserData';
import usePosts from '../../hooks/usePosts';
// import { Post } from '../../../atoms/postAtom';

type PostItemProps = {
  post: Post;
  // userIsCreator: boolean;
  // userVoteValue?: number;
  // onVote: (
  //   event: React.MouseEvent<SVGElement, MouseEvent>,
  //   post: Post,
  //   vote: number,
  //   communityId: string
  // ) => void;
  // onDeletePost: (post: Post) => Promise<boolean>;
  // onSelectPost?: (post: Post) => void;
  homePage?: boolean;
};

const PostItem: React.FC<PostItemProps> = ({
  // userVoteValue,
  post,
  // onDeletePost,
  // onSelectPost,
  // onVote,
  // userIsCreator,
  homePage,
}) => {
  const router = useRouter();
  const [loadingImage, setLoadingImage] = useState(true);
  const { userStateValue } = useUserData();
  const { setPostStateValue } = usePosts();
  // const singlePostPage = !onSelectPost;

  const [error, setError] = useState('');
  const [deletePost, { loading: loadingDelete }] = useDeletePostMutation();
  const handleDelete = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    // setLoadingDelete(true);
    try {
      const success = await deletePost({
        variables: {
          postId: post.id,
        },
        update: (cache) => {
          cache.evict({ id: 'Post:' + post.id });
        },
        // onCompleted() {
        //   setPostStateValue((prev) => ({
        //     ...prev,
        //     posts: prev.posts.filter((item) => item.id !== post.id),
        //   }));
        // },
      });
      if (!success) {
        throw new Error('Failed to delete post');
      }
      console.log('post deleted successfully');
      // if (singlePostPage) {
      //   router.push(`/r/${post.communityId}`);
      // }
    } catch (error: any) {
      setError(error.message);
    }
    // setLoadingDelete(false);
  };
  return (
    <Flex
      border={'1px solid'}
      bg='white'
      borderColor={'gray.300'}
      borderRadius={'4px'}
      _hover={{ color: 'gray.500' }}
      cursor={'pointer'}
      // onClick={() => onSelectPost && onSelectPost(post)}
    >
      <Flex
        direction='column'
        align={'center'}
        // bg={singlePostPage ? 'none' : 'gray.100'}
        p={2}
        width='40px'
        // borderRadius={singlePostPage ? '0' : '3px 0px 0px 3px'}
      >
        <Icon
          // color={userVoteValue === 1 ? 'brand.100' : 'gray.400'}
          // as={
          //   userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          // }
          as={
            IoArrowUpCircleSharp ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          fontSize={22}
          // onClick={(event) => onVote(event, post, 1, post.communityId)}
          cursor='pointer'
        />
        <Text fontSize={'9pt'}>{post.voteStatus}</Text>
        <Icon
          // color={userVoteValue === -1 ? '#4379ff' : 'gray.400'}
          as={IoArrowDownCircleOutline}
          fontSize={22}
          // onClick={(event) => onVote(event, post, -1, post.communityId)}
          cursor='pointer'
        />
      </Flex>
      <Flex direction={'column'} width='100%'>
        {error && (
          <Alert status='error'>
            <AlertIcon />
            <Text>{error}</Text>
          </Alert>
        )}
        <Stack spacing={1} p='10px'>
          <Stack
            direction={'row'}
            spacing={0.6}
            align='center'
            fontSize={'9pt'}
          >
            <>
              {/* Home Page check */}
              {/* {homePage && (
                {post.imageURL ? (
                  <Image
                    src={post.communityImageURL}
                    alt=''
                    borderRadius='full'
                    boxSize='18px'
                    mr={2}
                  />
                ) : ( */}
              <Icon as={FaReddit} fontSize='18pt' mr={1} color='blue.500' />
              {/* )} */}
              <Link href={`r/${post.community?.name}`} passHref>
                <Text
                  fontWeight={700}
                  _hover={{ textDecoration: 'underline' }}
                  onClick={(event) => event.stopPropagation()}
                >{`r/${post.community?.name}`}</Text>
              </Link>
              <Icon as={BsDot} color='gray.500' fontSize={8} />
            </>
            {/* )} */}

            <Text>
              Posted by u/{post?.user?.email}{' '}
              {moment(new Date(parseInt(post.createdAt))).fromNow()}
            </Text>
          </Stack>
          <Text fontSize={'12pt'} fontWeight={600}>
            {post?.title}
          </Text>
          <Text fontSize={'10pt'}>{post?.body}</Text>
          {post?.image && (
            <Flex justify={'center'} align='center' p={2}>
              {loadingImage && (
                <Skeleton height='200px' width={'100%'} borderRadius={4} />
              )}
              <Image
                src={post?.image}
                alt='post image'
                maxHeight={'460px'}
                display={loadingImage ? 'none' : 'unset'}
                onLoad={() => setLoadingImage(false)}
              />
            </Flex>
          )}
        </Stack>
        <Flex ml={1} mb={0.5} color='gray.500'>
          <Flex
            align={'center'}
            p='8px 10px'
            borderRadius={4}
            _hover={{ bg: 'gray.200' }}
            cursor='pointer'
          >
            <Icon as={BsChat} mr={2} />
            <Text fontSize={'9pt'}>2</Text>
          </Flex>
          <Flex
            align={'center'}
            p='8px 10px'
            borderRadius={4}
            _hover={{ bg: 'gray.200' }}
            cursor='pointer'
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize={'9pt'}>Share</Text>
          </Flex>
          <Flex
            align={'center'}
            p='8px 10px'
            borderRadius={4}
            _hover={{ bg: 'gray.200' }}
            cursor='pointer'
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text fontSize='9pt'>Save</Text>
          </Flex>
          {userStateValue.id === post?.userId && (
            <Flex
              align={'center'}
              p='8px 10px'
              borderRadius={4}
              _hover={{ bg: 'gray.200' }}
              cursor='pointer'
              onClick={handleDelete}
            >
              {loadingDelete ? (
                <Spinner size='sm' />
              ) : (
                <>
                  <Icon as={AiOutlineDelete} mr={2} />
                  <Text fontSize='9pt'>Delete</Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PostItem;
