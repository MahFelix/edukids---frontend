import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Flex,
  Text,
  Progress,
  SimpleGrid,
  Badge,
  Heading,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  keyframes
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { FaStar, FaTrophy, FaMedal, FaLock, FaMapMarkedAlt, FaRocket } from "react-icons/fa";
import { MdEmojiEvents, MdCelebration } from "react-icons/md";
import type { IconType } from "react-icons";

// Animação para elementos interativos
const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

interface AdventureModalProps {
  isOpen: boolean;
  onClose: () => void;
  userPoints?: number;
  userName?: string;
}

const AdventureModal = ({ isOpen, onClose, userPoints = 120, userName = "Explorador" }: AdventureModalProps) => {
  // Referência para áudio de interação
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeTab, setActiveTab] = useState("progresso");
  
  // Cores temáticas
  const bgColor = useColorModeValue("purple.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const headerGradient = "linear-gradient(90deg, #9C6FEB 0%, #FF85B0 100%)";
  
  // Determina o nível com base nos pontos
  const getLevel = (points: number) => {
    if (points < 50) return { name: "Explorador Novato", level: 1, next: 50 };
    if (points < 100) return { name: "Aventureiro", level: 2, next: 100 };
    if (points < 200) return { name: "Super Estrela", level: 3, next: 200 };
    if (points < 350) return { name: "Mestre Galáctico", level: 4, next: 350 };
    return { name: "Lenda dos Desafios", level: 5, next: null };
  };
  
  const userLevelInfo = getLevel(userPoints);
  
  // Progresso para o próximo nível
  let progressPercent = 100;
  if (userLevelInfo.next) {
    const prevNext = userLevelInfo.level === 1 ? 0 : getLevel(userPoints - 1).next || 0;
    progressPercent = ((userPoints - prevNext) / (userLevelInfo.next - prevNext)) * 100;
    if (isNaN(progressPercent) || !isFinite(progressPercent)) progressPercent = 0;
  }
  
  // Lista de conquistas fictícias
  const achievements = [
    { id: 1, name: "Primeiro Login", description: "Iniciou sua jornada de aprendizado!", icon: FaRocket, earned: true, points: 10 },
    { id: 2, name: "Explorador Curioso", description: "Completou 5 atividades diferentes", icon: FaMapMarkedAlt, earned: true, points: 25 },
    { id: 3, name: "Super Leitor", description: "Leu 3 histórias completas", icon: MdEmojiEvents, earned: true, points: 30 },
    { id: 4, name: "Matemático", description: "Acertou 10 problemas de matemática", icon: FaMedal, earned: userPoints >= 100, points: 50 },
    { id: 5, name: "Científico", description: "Completou todos os experimentos científicos", icon: MdCelebration, earned: false, points: 75 }
  ];

  // Lista de próximas atividades/missões
  const nextMissions = [
    { id: 1, name: "Missão Espacial", description: "Explore os planetas do sistema solar", points: 30, difficulty: "Fácil" },
    { id: 2, name: "Matemática Divertida", description: "Complete desafios de adição e subtração", points: 25, difficulty: "Moderado" },
    { id: 3, name: "História das Fábulas", description: "Leia e responda perguntas sobre fábulas clássicas", points: 40, difficulty: "Fácil" }
  ];

  // Função para tocar som na interação
  const playInteractionSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="xl" 
      isCentered 
      motionPreset="slideInBottom"
      aria-labelledby="adventure-modal-title"
    >
      <ModalOverlay 
        bg="rgba(0,0,0,0.4)" 
        backdropFilter="blur(5px)"
      />
      
      <ModalContent
        bg={bgColor}
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="0 10px 30px rgba(0,0,0,0.2)"
      >
        {/* Audio para feedback de interação */}
        <audio 
          ref={audioRef} 
          src="/sounds/click.mp3" 
          preload="auto" 
          aria-hidden="true"
        />
        
        <ModalHeader 
          bg={headerGradient}
          color="white"
          borderTopRadius="xl"
          py={6}
          textAlign="center"
          position="relative"
          id="adventure-modal-title"
        >
          <Text fontSize="2xl" fontWeight="bold">
            Aventura de {userName}
          </Text>
          <Text fontSize="md" fontWeight="normal" opacity={0.9} mt={1}>
            Continue sua jornada de aprendizado!
          </Text>
          
          {/* Elementos decorativos */}
          <Box 
            position="absolute"
            top={4}
            left={4}
            animation={`${float} 3s ease-in-out infinite`}
            aria-hidden="true"
          >
            <Icon as={FaStar} boxSize={6} color="yellow.300" />
          </Box>
          <Box 
            position="absolute"
            top={6}
            right={12}
            animation={`${float} 2.5s ease-in-out infinite`}
            aria-hidden="true"
          >
            <Icon as={FaTrophy} boxSize={5} color="yellow.300" />
          </Box>
        </ModalHeader>
        
        <ModalCloseButton 
          color="white" 
          size="lg"
          mt={2}
          aria-label="Fechar janela de aventura"
        />

        {/* Navegação entre tabs */}
        <Box borderBottom="1px" borderColor="gray.200">
          <Flex justify="center" mt={2}>
            <HStack spacing={4}>
              {["progresso", "conquistas", "próximas missões"].map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "solid" : "ghost"}
                  colorScheme={activeTab === tab ? "purple" : "gray"}
                  borderRadius="full"
                  onClick={() => {
                    setActiveTab(tab);
                    playInteractionSound();
                  }}
                  aria-selected={activeTab === tab}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Button>
              ))}
            </HStack>
          </Flex>
        </Box>

        <ModalBody py={6}>
          {activeTab === "progresso" && (
            <VStack spacing={6} align="stretch">
              {/* Nível atual */}
              <Box 
                bg={cardBg} 
                borderRadius="lg" 
                p={5} 
                boxShadow="md"
                animation={`${pulse} 2s infinite ease-in-out`}
              >
                <Flex align="center" justify="space-between" mb={3}>
                  <Heading size="md" color="purple.600">
                    Seu nível atual
                  </Heading>
                  <Badge 
                    colorScheme="purple" 
                    fontSize="lg" 
                    py={1} 
                    px={3} 
                    borderRadius="full"
                  >
                    Nível {userLevelInfo.level}
                  </Badge>
                </Flex>
                
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                  {userLevelInfo.name}
                </Text>
                
                <Progress 
                  value={progressPercent} 
                  colorScheme="purple" 
                  size="lg" 
                  borderRadius="full"
                  mb={3}
                  aria-label={`Progresso para o próximo nível: ${Math.round(progressPercent)}%`}
                />
                
                <Flex justify="space-between" align="center">
                  <Text color="gray.500">
                    {userPoints} pontos atuais
                  </Text>
                  {userLevelInfo.next && (
                    <Text color="purple.500" fontWeight="bold">
                      Próximo nível: {userLevelInfo.next} pontos
                    </Text>
                  )}
                </Flex>
              </Box>

              {/* Estatísticas de aventura */}
              <Box>
                <Heading size="sm" mb={3} color="gray.600">
                  Resumo da Aventura
                </Heading>
                <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                  <Stat icon={MdEmojiEvents} value="8" label="Atividades Completas" color="green.500" />
                  <Stat icon={FaStar} value={userPoints} label="Pontos Ganhos" color="yellow.500" />
                  <Stat icon={FaMedal} value="3" label="Conquistas" color="blue.500" />
                </SimpleGrid>
              </Box>
            </VStack>
          )}

          {activeTab === "conquistas" && (
            <VStack spacing={4} align="stretch">
              <Text color="gray.600" mb={2}>
                Conquistas são prêmios especiais que você ganha ao completar desafios!
              </Text>
              
              {achievements.map((achievement) => (
                <Box 
                  key={achievement.id}
                  bg={cardBg}
                  borderRadius="lg"
                  p={4}
                  display="flex"
                  alignItems="center"
                  opacity={achievement.earned ? 1 : 0.7}
                  position="relative"
                  boxShadow="md"
                >
                  <Flex 
                    bg={achievement.earned ? "purple.100" : "gray.100"} 
                    color={achievement.earned ? "purple.500" : "gray.400"}
                    boxSize="50px"
                    borderRadius="full"
                    justify="center"
                    align="center"
                    mr={4}
                  >
                    <Icon 
                      as={achievement.earned ? achievement.icon : FaLock} 
                      boxSize="24px" 
                    />
                  </Flex>
                  
                  <Box flex="1">
                    <Text fontWeight="bold">
                      {achievement.name}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {achievement.description}
                    </Text>
                  </Box>
                  
                  <Badge 
                    colorScheme={achievement.earned ? "green" : "gray"}
                    variant="solid"
                    fontSize="sm"
                    borderRadius="full"
                    px={2}
                  >
                    {achievement.earned ? `+${achievement.points} pts` : "Bloqueado"}
                  </Badge>
                </Box>
              ))}
            </VStack>
          )}

          {activeTab === "próximas missões" && (
            <VStack spacing={4} align="stretch">
              <Text color="gray.600" mb={2}>
                Escolha sua próxima aventura para ganhar mais pontos!
              </Text>
              
              {nextMissions.map((mission) => (
                <Box 
                  key={mission.id}
                  bg={cardBg}
                  borderRadius="lg"
                  p={4}
                  boxShadow="md"
                  _hover={{
                    transform: "translateY(-5px)",
                    boxShadow: "lg"
                  }}
                  transition="all 0.3s"
                  cursor="pointer"
                  onClick={playInteractionSound}
                >
                  <Flex justify="space-between" align="center" mb={2}>
                    <Heading size="sm" color="purple.600">
                      {mission.name}
                    </Heading>
                    
                    <Badge 
                      colorScheme={mission.difficulty === "Fácil" ? "green" : 
                                  mission.difficulty === "Moderado" ? "orange" : "red"}
                      borderRadius="full"
                      px={2}
                    >
                      {mission.difficulty}
                    </Badge>
                  </Flex>
                  
                  <Text fontSize="sm" mb={3}>
                    {mission.description}
                  </Text>
                  
                  <Flex justify="space-between" align="center">
                    <Text color="purple.500" fontWeight="bold">
                      +{mission.points} pontos
                    </Text>
                    
                    <Button 
                      size="sm" 
                      colorScheme="purple" 
                      rightIcon={<FaRocket />}
                      borderRadius="full"
                    >
                      Começar
                    </Button>
                  </Flex>
                </Box>
              ))}
            </VStack>
          )}
        </ModalBody>

        <ModalFooter bg="gray.50" borderTop="1px" borderColor="gray.200">
          <Button 
            colorScheme="purple" 
            mr={3} 
            onClick={onClose}
            borderRadius="full"
            aria-label="Fechar e voltar"
            px={8}
          >
            Voltar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

// Componente auxiliar para estatísticas
interface StatProps {
  icon: IconType;
  value: string | number;
  label: string;
  color: string;
}
const Stat = ({ icon, value, label, color }: StatProps) => (
  <Box
    bg="white"
    p={3}
    borderRadius="lg"
    boxShadow="sm"
    textAlign="center"
  >
    <Icon as={icon} boxSize={7} color={color} mb={2} />
    <Text fontSize="xl" fontWeight="bold">
      {value}
    </Text>
    <Text fontSize="sm" color="gray.500">
      {label}
    </Text>
  </Box>
);

export default AdventureModal;