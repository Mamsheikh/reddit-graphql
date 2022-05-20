import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../../atoms/authModalAtom';

type LoginProps = {};

const Signup: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  // const [createUserWithEmailAndPassword, userCred, loading, userError] =
  //   useCreateUserWithEmailAndPassword(auth);
  const [loading, setLoading] = useState(false);
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    if (error) setError('');
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // signup(signUpForm.email, signUpForm.password);
    setLoading(false);
  };
  // console.log(userError?.message);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  // const createUserDocument = async (user: User) => {
  //   await setDoc(
  //     doc(firestore, 'users', user.uid),
  //     JSON.parse(JSON.stringify(user))
  //   );
  // };
  // useEffect(() => {
  //   if (userCred) {
  //     createUserDocument(userCred.user);
  //   }
  // }, [userCred]);

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
      <Input
        required
        name='confirmPassword'
        placeholder='confirm password'
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
      {error && (
        <Text mb={2} color='red' fontSize='10pt' textAlign={'center'}>
          {error}
        </Text>
      )}
      <Button
        width='100%'
        height='36px'
        mb={2}
        type='submit'
        isLoading={loading}
      >
        Sign Up
      </Button>
      <Flex fontSize={'9pt'} justifyContent='center'>
        <Text mr={1}>Already a redditor?</Text>
        <Text
          color='blue.500'
          fontWeight='700'
          cursor={'pointer'}
          onClick={() =>
            setAuthModalState((prev: any) => ({
              ...prev,
              view: 'login',
            }))
          }
        >
          LOGIN
        </Text>
      </Flex>
    </form>
  );
};
export default Signup;
