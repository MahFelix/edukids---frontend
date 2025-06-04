// src/components/ui/WelcomeCard.tsx
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import AvatarCreator from '../Avatar/AvatarCreator';

interface WelcomeCardProps {
  username: string;
  progress: number;
  onCreateAvatar: () => void;
}

const WelcomeCard = ({ username, progress, onCreateAvatar }: WelcomeCardProps) => {
  // Calcula o valor do gradiente dinamicamente
  const progressValue = Math.max(0, Math.min(progress, 100));
  const progressColor = '#4B9BF9';
  const bgColor = '#E2E8F0';
  const conicGradient = `conic-gradient(${progressColor} 0% ${progressValue}%, ${bgColor} ${progressValue}% 100%)`;
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
          <Button
            colorScheme="blue"
            leftIcon={undefined}
            onClick={onCreateAvatar}
            aria-label="Criar ou editar avatar"
            mb={2}
          >
          <AvatarCreator />
          </Button>
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
              borderColor={bgColor}
              borderTopColor={progressColor}
              transform="rotate(-90deg)"
              style={{ background: conicGradient }}
              aria-label={`Progresso: ${progressValue}% concluído`}
              role="progressbar"
              aria-valuenow={progressValue}
              aria-valuemin={0}
              aria-valuemax={100}
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
              <Text fontWeight="bold" fontSize="24px">{progressValue}%</Text>
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