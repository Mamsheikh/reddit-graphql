import { ApolloError } from '@apollo/client';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useLoginMutation } from '../../../../../generated/graphql';
import { authModalState } from '../../../../atoms/authModalAtom';

// import { auth } from '../../../firebase/clientApp';
// import { FIREBASE_ERRORS } from '../../../firebase/errors';

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [login, { loading }] = useLoginMutation({
    // notifyOnNetworkStatusChange: true,
    onCompleted() {
      setAuthModalState((prev) => ({
        ...prev,
        open: false,
      }));
    },
  });
  const [errMsg, setErrMsg] = useState('');

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (errMsg) setErrMsg('');
    // signInWithEmailAndPassword(loginForm.email, loginForm.password);
    try {
      await login({
        variables: {
          credentials: {
            email: loginForm.email,
            password: loginForm.password,
          },
        },
      });
    } catch (error) {
      setErrMsg((error as ApolloError).message);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <form onSubmit={onSubmit}>
      <Input
        name='email'
        required
        placeholder='email'
        type='email'
        mb={2}
        fontSize={'10pt'}
        _placeholder={{ color: 'gray.500' }}
        _hover={{
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
        bg='gray.50'
        onChange={onChange}
      />
      <Input
        required
        name='password'
        placeholder='password'
        type='password'
        mb={2}
        fontSize={'10pt'}
        _placeholder={{ color: 'gray.500' }}
        _hover={{
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
        bg='gray.50'
        onChange={onChange}
      />

      {errMsg && (
        <Text mb={2} textAlign='center' color='red' fontSize='10pt'>
          {/* {FIREBASE_ERRORS[loginError as keyof typeof FIREBASE_ERRORS]} */}
          {errMsg}
        </Text>
      )}
      <Button
        width='100%'
        height='36px'
        mb={2}
        type='submit'
        isLoading={loading}
      >
        Log In
      </Button>
      <Flex justifyContent='center' mb={2}>
        <Text fontSize='9pt' mr={1}>
          Forgot your password?
        </Text>
        <Text
          fontSize='9pt'
          color='blue.500'
          cursor='pointer'
          onClick={() =>
            setAuthModalState((prev: any) => ({
              ...prev,
              view: 'resetPassword',
            }))
          }
        >
          Reset
        </Text>
      </Flex>
      <Flex fontSize={'9pt'} justifyContent='center'>
        <Text mr={1}>New here?</Text>
        <Text
          color='blue.500'
          fontWeight='700'
          cursor={'pointer'}
          onClick={() =>
            setAuthModalState((prev: any) => ({
              ...prev,
              view: 'signup',
            }))
          }
        >
          SIGN UP
        </Text>
      </Flex>
    </form>
  );
};
export default Login;
