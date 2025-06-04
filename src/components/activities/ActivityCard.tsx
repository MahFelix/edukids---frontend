// src/components/activities/ActivityCard.tsx
import { Box, Text, Icon, Flex, Progress } from '@chakra-ui/react';
import type { IconType } from 'react-icons';
import { FaCalculator, FaBook, FaFlask, FaPaintBrush } from 'react-icons/fa';

interface ActivityCardProps {
  title: string;
  description: string;
  progress: number;
  type: 'math' | 'portuguese' | 'science' | 'art';
  onClick: () => void;
}

const ActivityCard = ({ title, description, progress, type, onClick }: ActivityCardProps) => {
  const getIcon = (): IconType => {
    switch (type) {
      case 'math': return FaCalculator;
      case 'portuguese': return FaBook;
      case 'science': return FaFlask;
      case 'art': return FaPaintBrush;
      default: return FaBook;
    }
  };
  
  const getColor = (): string => {
    switch (type) {
      case 'math': return '#4B9BF9';
      case 'portuguese': return '#4CD763';
      case 'science': return '#a37fe3';
      case 'art': return '#FF85B0';
      default: return '#4B9BF9';
    }
  };
  
  const getEmoji = (): string => {
    switch (type) {
      case 'math': return '☀️';
      case 'portuguese': return '🌈';
      case 'science': return '🚀';
      case 'art': return '🚀';
      default: return '☀️';
    }
  };

  return (
    <Box
      bg={getColor()}
      color="white"
      borderRadius="lg"
      p={4}
      cursor="pointer"
      onClick={onClick}
      transition="transform 0.2s"
      _hover={{ transform: 'translateY(-5px)' }}
      position="relative"
      overflow="hidden"
    >
      <Box mb={3}>
        <Icon as={getIcon()} boxSize="2rem" />
      </Box>
      
      <Text fontSize="xl" fontWeight="bold" mb={1}>{title}</Text>
      <Text fontSize="sm" mb={4}>{description}</Text>
      
      <Box>
        <Flex justifyContent="space-between" mb={1}>
          <Text fontSize="sm">{progress}% completo</Text>
        </Flex>
        <Progress
          value={progress}
          size="sm"
          colorScheme="white"
          bg="rgba(255,255,255,0.3)"
          borderRadius="full"
        />
      </Box>
      
      <Text mt={4} fontSize="sm">Clique para começar!</Text>
      
      <Box position="absolute" right={2} bottom={2} fontSize="xl">
        <span role="img" aria-label="emoji">{getEmoji()}</span>
      </Box>
    </Box>
  );
};

export default ActivityCard;