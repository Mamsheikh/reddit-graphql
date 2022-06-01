import { Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import PageContent from '../../../modules/components/Layout/PageContent';
import NewPostForm from '../../../modules/components/Posts/NewPostForm';
import useUserData from '../../../modules/hooks/useUserData';

type submitProps = {};

const Submit: React.FC<submitProps> = () => {
  const router = useRouter();
  const { communityName } = router.query;
  const { userStateValue } = useUserData();
  return (
    <PageContent>
      <>
        <Box p='14px 0px' borderBottom={'1px solid'} borderColor='white'>
          <Text>create a post</Text>
          {userStateValue && (
            <NewPostForm
              user={userStateValue}
              communityName={communityName as string}
              // communityImageURL={communityStateValue.currentCommunity?.imageURL}
            />
          )}
        </Box>
      </>
      <>
        {/* {communityStateValue.currentCommunity && (
          <About communityData={communityStateValue.currentCommunity} />
        )} */}
      </>
    </PageContent>
  );
};
export default Submit;
