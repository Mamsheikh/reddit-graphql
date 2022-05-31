import { Flex, Image } from '@chakra-ui/react';
import React, { useEffect } from 'react';
// import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useImplicitLoginQuery } from '../../../../generated/graphql';
// import { userState } from '../../../atoms/userAtom';
import useUserData from '../../hooks/useUserData';
import Directory from './Directory';
import RightContent from './RightContent';
import SearchInput from './SearchInput';

const Navbar: React.FC = () => {
  // const setUserState = useSetRecoilState(userState);
  const { data } = useImplicitLoginQuery();
  const { userStateValue, setUserStateValue } = useUserData();

  useEffect(() => {
    if (data?.implicitLogin) {
      setUserStateValue({
        email: data.implicitLogin?.email,
        displayName: data.implicitLogin?.displayName,
        id: data.implicitLogin?.id,
        image: data.implicitLogin?.image,
        loggedIn: data.implicitLogin.loggedIn,
      });
    }
  }, [data?.implicitLogin]);

  console.log({ userStateValue });
  return (
    <Flex
      bg='white'
      height={'44px'}
      padding='6px 12px'
      justify={{ md: 'space-between' }}
    >
      <Flex
        align={'center'}
        width={{ base: '40px', md: 'auto' }}
        mr={{ base: 0, md: 2 }}
        cursor='pointer'
        onClick={() => {}}
      >
        <Image src='/images/redditFace.svg' alt='logo' height={'30px'} />
        <Image
          src='/images/redditText.svg'
          alt='logo-text'
          height={'46px'}
          display={{ base: 'none', md: 'unset' }}
        />
      </Flex>
      <Directory />
      <SearchInput />
      <RightContent user={userStateValue} />
      {/* {user && <Directory />}
  <SearchInput user={user} />
  <RightContent user={user} /> */}
    </Flex>
  );
};
export default Navbar;
