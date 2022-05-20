import { Flex, Image } from '@chakra-ui/react';
import React from 'react';
import RightContent from './RightContent';
import SearchInput from './SearchInput';

const Navbar: React.FC = () => {
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
      <SearchInput />
      <RightContent />
      {/* {user && <Directory />}
  <SearchInput user={user} />
  <RightContent user={user} /> */}
    </Flex>
  );
};
export default Navbar;
