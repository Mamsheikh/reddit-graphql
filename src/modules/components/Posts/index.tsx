import { Stack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import {
  Community,
  Post,
  useGetPostsLazyQuery,
  useGetPostsQuery,
} from '../../../../generated/graphql';
// import { Post } from '../../../atoms/postAtom';
import usePosts from '../../hooks/usePosts';
import PostItem from './PostItem';
import PostLoader from './PostLoader';

type PostsProps = {
  communityData: Community;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const [getPosts, { data, loading }] = useGetPostsLazyQuery();

  // const [user] = useAuthState(auth);
  // console.log('communityId', communityData?.id);
  // const [loading, setLoading] = useState(false);
  // const { postStateValue, setPostStateValue } = usePosts();
  // const getPost = async () => {
  //   if (communityData) {
  //     await getPosts({
  //       variables: {
  //         communityId: communityData?.id,
  //       },
  //       onCompleted(data) {
  //         setPostStateValue((prev) => ({
  //           ...prev,
  //           posts: data.getPosts as Post[],
  //         }));
  //       },
  //     });
  //   }
  // };
  useEffect(() => {
    if (communityData) {
      getPosts({
        variables: {
          communityId: communityData?.id,
        },
      });
    }
  }, [getPosts, communityData]);

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {data?.getPosts.map((post) => (
            <PostItem
              // userIsCreator={user?.uid === post.creatorId}
              // userVoteValue={
              //   postStateValue.postVotes.find((vote) => vote.postId === post.id)
              //     ?.voteValue
              // }
              post={post}
              key={post.id}
              // onDeletePost={onDeletePost}
              // onVote={onVote}
              // onSelectPost={onSelectPost}
            />
          ))}
        </Stack>
      )}
    </>
  );
};
export default Posts;
