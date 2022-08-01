import { Button, Flex, Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  ImplicitLoginDocument,
  ImplicitLoginQuery,
  useAuthUrlLazyQuery,
  useGoogleLoginMutation,
} from '../../../../../generated/graphql';
import { authModalState } from '../../../../atoms/authModalAtom';

const OAuthButtons: React.FC = () => {
  // const client = useApolloClient();
  const router = useRouter();
  // const { code } = router.query;
  // console.log(code);
  // const { signInWithGoogle } = useAuth();
  const [authUrl] = useAuthUrlLazyQuery();
  const [googleLogin, { loading }] = useGoogleLoginMutation({
    onCompleted() {
      setAuthModalState((prev) => ({
        ...prev,
        open: false,
      }));
      router.push('/');
    },
  });
  const setAuthModalState = useSetRecoilState(authModalState);

  const handleAuthorize = async () => {
    try {
      const res = await authUrl();
      if (res.data) {
        window.location.href = res.data?.googleAuthUrl as string;
      }
    } catch (error) {
      console.log(`failed to generate AuthUrl: ${error}`);
    }
  };
  const logInRef = useRef(googleLogin);
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    // console.log('codes', code);
    if (code) {
      logInRef.current({
        variables: {
          code: code,
        },
        // update: (cache,{data}) => {
        //   cache.writeQuery<ImplicitLoginQuery>({
        //     query: ImplicitLoginDocument,
        //     data: {
        //       __typename:"Query",
        //       implicitLogin: data.googleLogin
        //     }
        //   })
        // }
      });
      // setAuthModalState({ open: true, view: 'login' });
    }
  }, []);

  return (
    <Flex direction='column' width='100%' mb={4}>
      {/* <GoogleLogin
      cl
        // render={(renderProps) => (
        // )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
        // cookiePolicy='single-host-origin' */}
      <Button
        variant='oauth'
        mb={2}
        // onClick={renderProps.onClick}
        // disabled={renderProps.disabled}
        isLoading={loading}
        onClick={handleAuthorize}
      >
        <Image src='/images/googlelogo.png' alt='logo' mr={2} height='20px' />
        Continue with Google
      </Button>

      {/* <Button
        variant='oauth'
        mb={2}
        // isLoading={loading}
        // onClick={signInWithGoogle}
      >
        <Image src='/images/googlelogo.png' alt='logo' mr={2} height='20px' />
        Continue with Google
      </Button> */}
      <Button
      // onClick={() => {
      //   console.log(code);
      // }}
      >
        Some other provider
      </Button>
      {/* {error && <Text>{error?.message}</Text>} */}
    </Flex>
  );
};
export default OAuthButtons;
