import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
// import moment from 'moment';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { FaReddit } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { RiCakeLine } from 'react-icons/ri';
import { useSetRecoilState } from 'recoil';
import {
  Community,
  useCreateImageSignatureMutation,
  useUpdateCommunityImageMutation,
} from '../../../../generated/graphql';
import { communityState } from '../../../atoms/communityAtom';
import useSelectFile from '../../hooks/useSelectFile';
import useUserData from '../../hooks/useUserData';

type AboutProps = {
  communityData: Community;
};

const About: React.FC<AboutProps> = ({ communityData }) => {
  const { userStateValue } = useUserData();
  const { selectedFile, setSelectedFile, uploadImage, onSelectFile } =
    useSelectFile();
  const [uploadingImage, setUploadingImage] = useState(false);
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const [updateCommunityImage, { loading }] = useUpdateCommunityImageMutation();
  const [createImageSignature] = useCreateImageSignatureMutation();

  const setCommunitySetValue = useSetRecoilState(communityState);

  const onUpdateImage = async () => {
    // setUploadingImage(true);
    try {
      if (!selectedFile) return;
      const { data: signatureData } = await createImageSignature();

      if (signatureData) {
        const data = await uploadImage(
          selectedFile,
          signatureData.createImageSignature.signature!,
          signatureData.createImageSignature.timestamp!
        );

        await updateCommunityImage({
          variables: {
            communityId: communityData.id,
            image: data.secure_url,
          },
        });
        setCommunitySetValue((prev) => ({
          ...prev,
          currentCommunity: {
            ...prev.currentCommunity,
            image: data.secure_url,
          },
        }));
      }
      //   const imageRef = ref(storage, `communities/${communityData.id}/image`);
      //   await uploadString(imageRef, selectedFile, 'data_url');
      //   const downloadURL = await getDownloadURL(imageRef);
      //   await updateDoc(doc(firestore, 'communities', communityData.id), {
      //     imageURL: downloadURL,
      //   });
    } catch (error) {
      console.log('onUpdateImage error', error);
    }
    // setUploadingImage(false);
  };

  return (
    <Box position={'sticky'} top='14px'>
      <Flex
        justify='space-between'
        align='center'
        bg='blue.400'
        color='white'
        p={3}
        borderRadius='4px 4px 0px 0px'
      >
        <Text fontSize='10pt' fontWeight={700}>
          About Community
        </Text>
        <Icon as={HiOutlineDotsHorizontal} />
      </Flex>
      <Flex
        direction={'column'}
        p={3}
        bg='white'
        borderRadius='0px 0px 4px 4px'
      >
        <Stack>
          <Flex width='100%' p={2} fontSize='10pt' fontWeight={700}>
            <Flex direction={'column'} flexGrow={1}>
              <Text>{communityData?.numberOfMembers}</Text>
              <Text>Members</Text>
            </Flex>
            <Flex direction={'column'} flexGrow={1}>
              <Text>1</Text>
              <Text>Online</Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex
            align='center'
            width={'100%'}
            fontWeight={500}
            p={1}
            fontSize='10pt'
          >
            <Icon as={RiCakeLine} fontSize={18} mr={2} />
            {communityData && (
              <Text>
                Created {communityData.createdAt}
                {/* {moment(new Date(communityData.createdAt)).format(
                  'MMM DD, YYYY'
                )} */}
              </Text>
            )}
          </Flex>
          <Link href={`/r/${communityData?.name}/submit`} passHref>
            <Button mt={3} height='30px'>
              Create Post
            </Button>
          </Link>
          {userStateValue.id === communityData?.creatorId && (
            <>
              <Divider />
              <Stack spacing={1} fontSize='10pt'>
                <Text fontWeight={600}>Admin</Text>
                <Flex align='center' justify='space-between'>
                  <Text
                    color='blue.500'
                    cursor='pointer'
                    _hover={{ textDecoration: 'underline' }}
                    onClick={() => selectedFileRef.current?.click()}
                  >
                    Change Image
                  </Text>
                  {communityData?.image || selectedFile ? (
                    <Image
                      src={
                        (selectedFile && URL.createObjectURL(selectedFile)) ||
                        communityData?.image
                      }
                      alt='community image'
                      borderRadius='full'
                      boxSize={'40px'}
                    />
                  ) : (
                    <Icon
                      as={FaReddit}
                      fontSize={40}
                      mr={2}
                      color='brand.100'
                    />
                  )}
                </Flex>
                {selectedFile &&
                  (loading ? (
                    <Spinner />
                  ) : (
                    <Text cursor='pointer' onClick={onUpdateImage}>
                      Save Changes
                    </Text>
                  ))}
                <input
                  ref={selectedFileRef}
                  type='file'
                  hidden
                  onChange={onSelectFile}
                />
              </Stack>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};
export default About;
