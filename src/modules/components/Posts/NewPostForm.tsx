import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Icon,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import { BiPoll } from 'react-icons/bi';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import TabItem from './TabItem';
import TextInputs from './PostForm/TextInputs';
import ImageUpload from './PostForm/ImageUpload';
// import { Post } from '../../atoms/postsAtom';
// import { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import useSelectFile from '../../hooks/useSelectFile';
import {
  GetPostsDocument,
  useCreateImageSignatureMutation,
  useCreatePostMutation,
} from '../../../../generated/graphql';
import { communityState } from '../../../atoms/communityAtom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { postState } from '../../../atoms/postAtom';

type NewPostFormProps = {
  user: any;
  communityImageURL?: string;
  communityName?: string;
};

const formTabs: TabItem[] = [
  {
    title: 'Post',
    icon: IoDocumentText,
  },
  {
    title: 'Images & Video',
    icon: IoImageOutline,
  },
  {
    title: 'Link',
    icon: BsLink45Deg,
  },
  {
    title: 'Poll',
    icon: BiPoll,
  },
  {
    title: 'Talks',
    icon: BsMic,
  },
];

export type TabItem = {
  title: string;
  icon: typeof Icon.arguments;
};

const NewPostForm: React.FC<NewPostFormProps> = ({ communityName }) => {
  const [createImageSignature] = useCreateImageSignatureMutation();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const setPostStateValue = useSetRecoilState(postState);
  const [textInputs, setTextInputs] = useState({
    title: '',
    body: '',
  });
  const {
    selectedFile,
    onSelectFile,
    uploadImage,
    previewImage,
    setPreviewImage,
  } = useSelectFile();
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [createPost, { loading, error }] = useCreatePostMutation({
    onCompleted(data) {
      setPostStateValue((prev) => ({
        ...prev,
        posts: [...prev.posts, data.createPost],
      }));
    },
  });

  const handleCreatePost = async () => {
    // const { communityId } = router.query;
    if (selectedFile) {
      const { data: signatureData } = await createImageSignature();
      if (signatureData) {
        // const {} = signatureData.createImageSignature

        const data = await uploadImage(
          selectedFile,
          signatureData.createImageSignature?.signature!,
          signatureData.createImageSignature?.timestamp!
        );
        // console.log(data);
        // setImageURL(data.secure_url);
        await createPost({
          variables: {
            input: {
              communityId: communityName as string,
              title: textInputs.title,
              body: textInputs.body,
              image: data.secure_url,
            },
          },
          refetchQueries: [
            {
              query: GetPostsDocument,
              variables: {
                communityId: communityName,
              },
            },
          ],
        });
        router.back();
        return;
      }
    }

    await createPost({
      variables: {
        input: {
          communityId: communityName as string,
          title: textInputs.title,
          body: textInputs.body,
          // image: imageURL,
        },
      },
    });
    router.back();
  };

  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Flex direction={'column'} bg='white' borderRadius={5} mt={2}>
      <Flex width={'100%'}>
        {formTabs.map((item) => (
          <TabItem
            item={item}
            key={item.title}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTab === 'Post' && (
          <TextInputs
            textInputs={textInputs}
            handleCreatePost={handleCreatePost}
            onChange={onTextChange}
            loading={loading}
          />
        )}
        {selectedTab === 'Images & Video' && (
          <ImageUpload
            onSelectImage={onSelectFile}
            selectedFile={previewImage}
            setSelectedFile={setPreviewImage}
            setSelectedTab={setSelectedTab}
          />
        )}
      </Flex>
      {error && (
        <Alert status='error'>
          <AlertIcon />
          <Text>Error creating post!</Text>
        </Alert>
      )}
    </Flex>
  );
};
export default NewPostForm;
