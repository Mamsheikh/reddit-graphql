import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { FaReddit } from 'react-icons/fa';
import { Community } from '../../../../generated/graphql';
// import { Community } from '../../../atoms/communityAtom';
import useCommunityData from '../../hooks/useCommunityData';
// import { Community } from '../../atoms/communtiesAtom';
// import useCommunityData from '../../hooks/useCommunityData';

type HeaderProps = {
  communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const { communityStateValue, loading } = useCommunityData();
  // console.log('imageUrl', communityStateValue.currentCommunity?.imageURL);
  const isJoined = !!communityStateValue.communities.find(
    (item) => item.id === communityData.id
  );
  // console.log(communityStateValue.communities);
  return (
    <Flex direction='column' width='100%' height='140px'>
      <Box height='50%' bg='blue.400' />
      <Flex justify='center' bg='white' flexGrow={1}>
        <Flex width='95%' maxWidth='860px'>
          {/* {communityStateValue.currentCommunity?.imageURL ? (
            <Image
              src={communityStateValue.currentCommunity?.imageURL}
              alt='community'
              borderRadius={'full'}
              boxSize='66px'
              position={'relative'}
              top={-3}
              color='blue.500'
              border='4px solid white'
            />
          ) : ( */}
          <Icon
            as={FaReddit}
            fontSize={64}
            position='relative'
            top={-3}
            color='blue.400'
            border='4px solid white'
            borderRadius='50%'
          />
          {/* // )} */}
          <Flex padding='10px 16px'>
            <Flex direction='column' mr={6}>
              <Text fontWeight={800} fontSize='16pt'>
                {communityData.name}
              </Text>
              <Text color='gray.400' fontWeight={600} fontSize='10pt'>
                r/{communityData.name}
              </Text>
            </Flex>
            <Button
              isLoading={loading}
              // onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
              variant={isJoined ? 'outline' : 'solid'}
              height='30px'
              pr={6}
              pl={6}
            >
              {isJoined ? 'Joined' : 'Join'}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
