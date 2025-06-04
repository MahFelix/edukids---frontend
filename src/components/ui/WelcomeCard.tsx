// src/components/ui/WelcomeCard.tsx
import { Box, Button, Flex, Heading, Text, Progress } from '@chakra-ui/react';
import { FaUserAstronaut } from 'react-icons/fa';
import AvatarCreator from '../Avatar/AvatarCreator';

interface WelcomeCardProps {
  username: string;
  progress: number;
  onCreateAvatar: () => void;
}

const WelcomeCard = ({ username, progress, onCreateAvatar }: WelcomeCardProps) => {
  return (
    <Box 
      bg="white" 
      borderRadius="20px" 
      boxShadow="0 4px 12px rgba(0,0,0,0.05)" 
      p={6} 
      my={6}
      position="relative"
    >
      <Flex justifyContent="space-between">
        <Box>
          <Heading 
            fontSize="2xl" 
            mb={2}
          >
            <Text as="span" color="#FF85B0">Bem-vinda </Text>
            <Text as="span" color="#4CD763">de volta, </Text>
            <Text as="span" color="#4B9BF9">{username}! </Text>
            <Text as="span" role="img" aria-label="sol">☀️</Text>
          </Heading>
          <Text color="gray.600" mb={4}>Continue sua jornada de aprendizado e diversão!</Text>
          
          <AvatarCreator/>
        </Box>
        
        <Flex direction="column" alignItems="center">
          <Box position="relative" height="120px" width="120px">
            <Box
              as="div"
              position="absolute"
              height="120px" 
              width="120px"
              borderRadius="50%"
              border="8px solid"
              borderColor="#E2E8F0"
              borderTopColor="#4B9BF9"
              transform="rotate(-90deg)"
              style={{ 
                background: "conic-gradient(#4B9BF9 0% 68%, #E2E8F0 68% 100%)" 
              }}
            />
            <Flex 
              position="absolute"
              top="0" 
              left="0" 
              width="100%" 
              height="100%"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
              bg="white"
              m="8px"
            >
              <Text fontWeight="bold" fontSize="24px">{progress}%</Text>
            </Flex>
          </Box>
          <Box mt={4}>
            <Box as="span" fontSize="2xl" role="img" aria-label="foguete">🚀</Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default WelcomeCard;