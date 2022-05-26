import { Flex, Image } from '@chakra-ui/react';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../atoms/userAtom';
import Directory from './Directory';
import RightContent from './RightContent';
import SearchInput from './SearchInput';

const Navbar: React.FC = () => {
  const userAtomState = useRecoilValue(userState);
  console.log('user', userAtomState);
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
      <RightContent user={userAtomState} />
      {/* {user && <Directory />}
  <SearchInput user={user} />
  <RightContent user={user} /> */}
    </Flex>
  );
};
export default Navbar;
