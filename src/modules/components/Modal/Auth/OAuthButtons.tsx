import { Button, Flex, Image, Text } from '@chakra-ui/react';

import React, { useEffect } from 'react';

const OAuthButtons: React.FC = () => {
  // const { signInWithGoogle } = useAuth();

  // const [signInWithGoogle, userCred, loading, error] =
  //   useSignInWithGoogle(auth);
  // const [signInWithGithub, githubUser, githubLoading, githubError] =
  //   useSignInWithGithub(auth);

  // const createUserDocument = async (user: User) => {
  //   const userDocRef = doc(firestore, 'users', user.uid);
  //   await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  // };

  // useEffect(() => {
  //   if (userCred) {
  //     createUserDocument(userCred.user);
  //   }
  // }, [userCred]);
  return (
    <Flex direction='column' width='100%' mb={4}>
      <Button
        variant='oauth'
        mb={2}
        // isLoading={loading}
        // onClick={signInWithGoogle}
      >
        <Image src='/images/googlelogo.png' alt='logo' mr={2} height='20px' />
        Continue with Google
      </Button>
      <Button>Some other provider</Button>
      {/* {error && <Text>{error?.message}</Text>} */}
    </Flex>
  );
};
export default OAuthButtons;
