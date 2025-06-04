// src/pages/Dashboard.tsx
import { useState } from 'react';
import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import Navbar from '../components/Layout/Navbar';
import WelcomeCard from '../components/ui/WelcomeCard';
import ActivityCard from '../components/activities/ActivityCard';
import AchievementCard from '../components/Achievements/AchievementsCard';
import { FaGamepad, FaTrophy } from 'react-icons/fa';
import useSound from 'use-sound';
import clickSound from '../assets/sounds/click.mp3';
import Footer from '../components/Footer';


const Dashboard = () => {
  const [play] = useSound(clickSound);
  const toast = useToast();
  const [userData] = useState({
    username: 'Maria',
    points: 1250,
    level: 5,
    achievements: 5,
    progress: 68,
  });

  const activities = [
    {
      id: 1,
      title: 'Matemática Divertida',
      description: 'Aprenda números e contas brincando!',
      progress: 75,
      type: 'math' as const
    },
    {
      id: 2,
      title: 'Português Mágico',
      description: 'Explore o mundo das palavras e histórias!',
      progress: 100,
      type: 'portuguese' as const
    },
    {
      id: 3,
      title: 'Ciências Incríveis',
      description: 'Descubra os mistérios do mundo!',
      progress: 45,
      type: 'science' as const
    },
    {
      id: 4,
      title: 'Arte Criativa',
      description: 'Solte sua imaginação e crie!',
      progress: 30,
      type: 'art' as const
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'Primeira Conquista',
      description: 'Complete sua primeira atividade',
      icon: 'target' as const,
      unlocked: true
    },
    {
      id: 2,
      title: 'Leitor Dedicado',
      description: 'Leia 10 histórias',
      icon: 'book' as const,
      unlocked: true
    },
    {
      id: 3,
      title: 'Matemático Jr.',
      description: 'Resolva 50 problemas',
      icon: 'calculator' as const,
      unlocked: false
    },
    {
      id: 4,
      title: 'Cientista Curioso',
      description: 'Complete 5 experimentos',
      icon: 'flask' as const,
      unlocked: false
    }
  ];

  const handleActivityClick = (activityId: number) => {
    play();
    toast({
      title: 'Atividade iniciada!',
      description: `Você começou a atividade ${activities.find(a => a.id === activityId)?.title}`,
      status: 'success',
      duration: 3000,
      position: 'top',
      isClosable: true,
    });
  };

  const handleCreateAvatar = () => {
    play();
    toast({
      title: 'Editor de avatar',
      description: 'O editor de avatar será aberto em breve',
      status: 'info',
      duration: 3000,
      position: 'top',
      isClosable: true,
    });
  };

  return (
    <Box minW="100vw" minH="100vh" bg="#F5F7FA ">
      <Navbar 
        username={userData.username} 
        points={userData.points} 
        level={userData.level}
        achievements={userData.achievements} 
      />
      
      <Container maxW="container.xl" py={6}>
        <WelcomeCard 
          username={userData.username}
          progress={userData.progress}
          onCreateAvatar={handleCreateAvatar}
        />
        
        <Box mb={8}>
          <Box display="flex" alignItems="center" mb={4}>
            <Box as={FaGamepad} fontSize="24px" mr={2} color="purple.500" />
            <Heading size="lg">Suas Atividades</Heading>
          </Box>
          
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {activities.map(activity => (
              <ActivityCard
                key={activity.id}
                title={activity.title}
                description={activity.description}
                progress={activity.progress}
                type={activity.type}
                onClick={() => handleActivityClick(activity.id)}
              />
            ))}
          </SimpleGrid>
        </Box>
        
        <Box mb={200}>
          <Box display="flex" alignItems="center" mb={4}>
            <Box as={FaTrophy} fontSize="24px" mr={2} color="yellow.500" />
            <Heading size="lg">Suas Conquistas</Heading>
          </Box>
          
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {achievements.map(achievement => (
              <AchievementCard
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
                icon={achievement.icon}
                unlocked={achievement.unlocked}
              />
            ))}
          </SimpleGrid>
        </Box>
        <Footer/>
      </Container>
    </Box>
  );
};

export default Dashboard;