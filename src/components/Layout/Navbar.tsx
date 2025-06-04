// src/components/layout/Navbar.tsx
import { Box, Flex, Image, Text, HStack } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import logo from '../../assets/images/logo.png';

interface NavbarProps {
  username: string;
  points: number;
  level: number;
  achievements: number;
}

const Navbar = ({ username, points, level, achievements }: NavbarProps) => {
  return (
    <Flex
      bg="linear-gradient(90deg, #9C6FEB 0%, #FF85B0 100%)"
      color="white"
      p={4}
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex alignItems="center" gap={2}>
        <Box bg="white" borderRadius="full" p={1}>
          <Image src={logo} alt="EduKids Logo" boxSize="60px" />
        </Box>
        <Text fontSize="2xl" fontWeight="bold">EduKids</Text>
        <Text pl={4}>Olá, {username}!</Text>
      </Flex>
      
      <HStack spacing={4}>
        <Flex alignItems="center" bg="rgba(255,255,255,0.2)" px={4} py={2} borderRadius="full">
          <FaStar color="#FFD700" />
          <Text ml={2} fontWeight="bold">{points}</Text>
        </Flex>
        
        <Flex alignItems="center" bg="rgba(255,255,255,0.2)" px={4} py={2} borderRadius="full">
          <Text fontWeight="bold">Nível {level}</Text>
        </Flex>
        
        <Flex alignItems="center" bg="rgba(255,255,255,0.2)" px={4} py={2} borderRadius="full">
          <Text fontWeight="bold">{achievements}</Text>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default Navbar;