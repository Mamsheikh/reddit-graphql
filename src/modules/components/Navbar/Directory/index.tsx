import { ChevronDownIcon, Icon } from '@chakra-ui/icons';
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Image,
} from '@chakra-ui/react';
import { TiHome } from 'react-icons/ti';
import React from 'react';
import Communities from './Communities';
// import useDirectory from '../../../hooks/useDirectory';

const Directory: React.FC = () => {
  // const { directoryState, toggleMenuOpen } = useDirectory();
  return (
    <Menu>
      <MenuButton
        cursor={'pointer'}
        padding='0px 6px'
        borderRadius={4}
        mr={2}
        ml={{ base: 0, md: 2 }}
        _hover={{ outline: '1px solid', outlineColor: 'gray.200' }}
        onClick={() => {}}
      >
        <Flex
          align='center'
          justify={'space-between'}
          width={{ base: 'auto', lg: '200px' }}
        >
          <Flex align='center'>
            {/* {directoryState.selectedMenuItem.imageURL ? (
              <Image
                src={directoryState.selectedMenuItem.imageURL}
                alt=''
                borderRadius='full'
                boxSize='24px'
                mr={2}
              />
            ) : ( */}
            <Icon
              as={TiHome}
              // color={directoryState.selectedMenuItem.iconColor}
              fontSize={24}
              mr={{ base: 1, md: 2 }}
            />
            {/* )} */}
            <Flex display={{ base: 'none', lg: 'flex' }}>
              <Text fontWeight={600} fontSize='10pt'>
                {/* {directoryState.selectedMenuItem.displayText} */}
                Home
              </Text>
            </Flex>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <Communities />
      </MenuList>
    </Menu>
  );
};
export default Directory;
