// src/components/achievements/AchievementCard.tsx
import { Box, Center, Text, Stack } from '@chakra-ui/react';
import type { IconType } from 'react-icons';
import { FaAward, FaBook, FaCalculator, FaFlask } from 'react-icons/fa';

interface AchievementCardProps {
  title: string;
  description: string;
  icon: 'target' | 'book' | 'calculator' | 'flask';
  unlocked: boolean;
}

const AchievementCard = ({ title, description, icon, unlocked }: AchievementCardProps) => {
  const getIcon = (): IconType => {
    switch (icon) {
      case 'target': return FaAward;
      case 'book': return FaBook;
      case 'calculator': return FaCalculator;
      case 'flask': return FaFlask;
      default: return FaAward;
    }
  };

  return (
    <Box
      bg={unlocked ? "#FFF" : "#F0F0F0"}
      opacity={unlocked ? 1 : 0.7}
      borderRadius="lg"
      p={4}
      boxShadow={unlocked ? "md" : "none"}
      border="1px solid"
      borderColor={unlocked ? "yellow.300" : "gray.200"}
      transition="all 0.3s"
    >
      <Stack spacing={3}>
        <Center
          bg={unlocked ? "yellow.100" : "gray.100"}
          w="60px"
          h="60px"
          borderRadius="full"
          color={unlocked ? "yellow.500" : "gray.400"}
        >
          <Box as={getIcon()} fontSize="28px" />
        </Center>
        
        <Text fontWeight="bold" textAlign="center">{title}</Text>
        <Text fontSize="sm" textAlign="center" color="gray.600">{description}</Text>
      </Stack>
    </Box>
  );
};

export default AchievementCard;