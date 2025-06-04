import React, { useState, useRef, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Flex,
  Grid,
  Text,
  useDisclosure,
  useColorMode,
  Tooltip,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
} from '@chakra-ui/react';
import { FaUser, FaPalette, FaHatWizard, FaGlasses, FaSmile } from 'react-icons/fa';

// Tipos para as opções de avatar
interface AvatarOption {
  id: string;
  src: string;
  alt: string;
  category: 'face' | 'hair' | 'accessories' | 'color' | 'expression';
}

// Componente de criação de avatar
const AvatarCreator: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const toast = useToast();
  const initialFocusRef = useRef<HTMLButtonElement>(null);
  
  // Estado do avatar
  const [avatarOptions, setAvatarOptions] = useState<{
    face: string | null;
    hair: string | null;
    accessories: string | null;
    color: string | null;
    expression: string | null;
  }>({
    face: null,
    hair: null,
    accessories: null,
    color: null,
    expression: null,
  });
  
  // Opções disponíveis (normalmente viriam de uma API)
  const avatarChoices: Record<string, AvatarOption[]> = {
    face: [
      { id: 'face1', src: '/avatars/face1.png', alt: 'Rosto redondo', category: 'face' },
      { id: 'face2', src: '/avatars/face2.png', alt: 'Rosto oval', category: 'face' },
      { id: 'face3', src: '/avatars/face3.png', alt: 'Rosto quadrado', category: 'face' },
    ],
    hair: [
      { id: 'hair1', src: '/avatars/hair1.png', alt: 'Cabelo curto', category: 'hair' },
      { id: 'hair2', src: '/avatars/hair2.png', alt: 'Cabelo comprido', category: 'hair' },
      { id: 'hair3', src: '/avatars/hair3.png', alt: 'Cabelo cacheado', category: 'hair' },
    ],
    accessories: [
      { id: 'acc1', src: '/avatars/acc1.png', alt: 'Óculos redondos', category: 'accessories' },
      { id: 'acc2', src: '/avatars/acc2.png', alt: 'Chapéu de estudante', category: 'accessories' },
      { id: 'acc3', src: '/avatars/acc3.png', alt: 'Laço de cabelo', category: 'accessories' },
    ],
    color: [
      { id: 'color1', src: '/avatars/color1.png', alt: 'Cor azul', category: 'color' },
      { id: 'color2', src: '/avatars/color2.png', alt: 'Cor verde', category: 'color' },
      { id: 'color3', src: '/avatars/color3.png', alt: 'Cor rosa', category: 'color' },
    ],
    expression: [
      { id: 'exp1', src: '/avatars/exp1.png', alt: 'Expressão feliz', category: 'expression' },
      { id: 'exp2', src: '/avatars/exp2.png', alt: 'Expressão surpresa', category: 'expression' },
      { id: 'exp3', src: '/avatars/exp3.png', alt: 'Expressão pensativa', category: 'expression' },
    ],
  };

  // Selecionar uma opção de avatar
  const selectOption = (option: AvatarOption) => {
    setAvatarOptions(prev => ({
      ...prev,
      [option.category]: option.src,
    }));
    
    // Feedback auditivo para usuários de leitores de tela
    toast({
      title: `${option.alt} selecionado`,
      status: 'success',
      duration: 1500,
      isClosable: true,
      position: 'top',
    });
  };

  // Gerar avatar aleatório
  const generateRandomAvatar = () => {
    const newAvatar = {
      face: avatarChoices.face[Math.floor(Math.random() * avatarChoices.face.length)].src,
      hair: avatarChoices.hair[Math.floor(Math.random() * avatarChoices.hair.length)].src,
      accessories: avatarChoices.accessories[Math.floor(Math.random() * avatarChoices.accessories.length)].src,
      color: avatarChoices.color[Math.floor(Math.random() * avatarChoices.color.length)].src,
      expression: avatarChoices.expression[Math.floor(Math.random() * avatarChoices.expression.length)].src,
    };
    
    setAvatarOptions(newAvatar);
    
    toast({
      title: "Avatar aleatório criado!",
      description: "Um novo avatar foi gerado para você.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  // Salvar o avatar
  const saveAvatar = () => {
    // Aqui você implementaria a lógica para salvar o avatar no backend
    toast({
      title: "Avatar salvo com sucesso!",
      description: "Seu avatar personalizado foi salvo.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  // Suporte a teclado para navegação acessível
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isOpen) {
        if (e.key === 'Escape') {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isOpen, onClose]);

  // Renderiza uma opção de avatar com acessibilidade
  const renderAvatarOption = (option: AvatarOption) => (
    <Box 
      key={option.id}
      as="button"
      aria-label={option.alt}
      onClick={() => selectOption(option)}
      border="2px solid"
      borderColor={avatarOptions[option.category] === option.src ? "brand.purple" : "transparent"}
      borderRadius="md"
      p={2}
      _hover={{ boxShadow: "md", transform: "scale(1.05)" }}
      transition="all 0.2s"
      role="radio"
      aria-checked={avatarOptions[option.category] === option.src}
      tabIndex={0}
    >
      <Image 
        src={option.src} 
        alt={option.alt} 
        boxSize="60px" 
        objectFit="cover"
        fallbackSrc="https://via.placeholder.com/60" 
      />
      <Text fontSize="xs" mt={1} textAlign="center">
        {option.alt}
      </Text>
    </Box>
  );

  // Componente de avatar
  return (
    <>
      <Button
        leftIcon={<FaUser />}
        colorScheme="purple"
        onClick={onOpen}
        aria-label="Criar Meu Avatar"
        ref={initialFocusRef}
        bgGradient="linear(to-r, brand.purple, brand.pink)"
        color="white"
        _hover={{
          bgGradient: "linear(to-r, brand.pink, brand.blue)",
          transform: "scale(1.05)"
        }}
      >
        Criar Meu Avatar
      </Button>

      <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        size="xl" 
        initialFocusRef={initialFocusRef}
        motionPreset="slideInBottom"
        isCentered
        aria-label="Modal de criação de avatar"
      >
        <ModalOverlay />
        <ModalContent 
          bg={colorMode === "dark" ? "gray.800" : "white"} 
          borderRadius="xl"
        >
          <ModalHeader 
            bgGradient="linear(to-r, brand.purple, brand.pink)" 
            color="white"
            borderTopRadius="xl"
          >
            Crie seu Avatar EduKids
          </ModalHeader>
          <ModalCloseButton color={colorMode === "dark" ? "white" : "gray.800"} />
          
          <ModalBody>
            <Flex direction={{ base: "column", md: "row" }} gap={4} py={4}>
              {/* Preview do Avatar */}
              <Box 
                width={{ base: "100%", md: "40%" }} 
                display="flex" 
                flexDirection="column" 
                alignItems="center"
                aria-label="Prévia do seu avatar"
              >
                <Text fontWeight="bold" mb={2}>Seu Avatar</Text>
                <Box 
                  width="150px" 
                  height="150px" 
                  bg={colorMode === "dark" ? "whiteAlpha.200" : "gray.100"} 
                  borderRadius="full" 
                  display="flex" 
                  justifyContent="center" 
                  alignItems="center"
                  position="relative"
                  overflow="hidden"
                >
                  {avatarOptions.color && (
                    <Image 
                      src={avatarOptions.color} 
                      alt="Cor de fundo" 
                      position="absolute" 
                      width="100%" 
                      height="100%" 
                    />
                  )}
                  {avatarOptions.face && (
                    <Image 
                      src={avatarOptions.face} 
                      alt="Formato do rosto" 
                      position="absolute" 
                      width="100%" 
                      height="100%" 
                    />
                  )}
                  {avatarOptions.expression && (
                    <Image 
                      src={avatarOptions.expression} 
                      alt="Expressão facial" 
                      position="absolute" 
                      width="100%" 
                      height="100%" 
                    />
                  )}
                  {avatarOptions.hair && (
                    <Image 
                      src={avatarOptions.hair} 
                      alt="Estilo de cabelo" 
                      position="absolute" 
                      width="100%" 
                      height="100%" 
                    />
                  )}
                  {avatarOptions.accessories && (
                    <Image 
                      src={avatarOptions.accessories} 
                      alt="Acessório" 
                      position="absolute" 
                      width="100%" 
                      height="100%" 
                    />
                  )}
                  {!avatarOptions.face && (
                    <FaUser size="3em" color={colorMode === "dark" ? "white" : "gray.500"} />
                  )}
                </Box>
                
                <Button 
                  leftIcon={<FaPalette />} 
                  colorScheme="blue" 
                  size="sm" 
                  mt={4}
                  onClick={generateRandomAvatar}
                  aria-label="Gerar avatar aleatório"
                >
                  Aleatório
                </Button>
              </Box>
              
              {/* Opções de personalização */}
              <Box width={{ base: "100%", md: "60%" }}>
                <Tabs isFitted variant="soft-rounded" colorScheme="purple">
                  <TabList mb={3}>
                    <Tab aria-label="Escolher formato do rosto">
                      <Tooltip label="Formato do rosto">
                        <Box><FaUser /></Box>
                      </Tooltip>
                    </Tab>
                    <Tab aria-label="Escolher estilo de cabelo">
                      <Tooltip label="Cabelo">
                        <Box><FaHatWizard /></Box>
                      </Tooltip>
                    </Tab>
                    <Tab aria-label="Escolher acessórios">
                      <Tooltip label="Acessórios">
                        <Box><FaGlasses /></Box>
                      </Tooltip>
                    </Tab>
                    <Tab aria-label="Escolher expressão">
                      <Tooltip label="Expressão">
                        <Box><FaSmile /></Box>
                      </Tooltip>
                    </Tab>
                  </TabList>
                  
                  <TabPanels>
                    {/* Opções de Rosto */}
                    <TabPanel>
                      <Text mb={2}>Formato do rosto</Text>
                      <Grid templateColumns="repeat(3, 1fr)" gap={3}>
                        {avatarChoices.face.map(option => renderAvatarOption(option))}
                      </Grid>
                      <Text mb={2} mt={4}>Cor</Text>
                      <Grid templateColumns="repeat(3, 1fr)" gap={3}>
                        {avatarChoices.color.map(option => renderAvatarOption(option))}
                      </Grid>
                    </TabPanel>
                    
                    {/* Opções de Cabelo */}
                    <TabPanel>
                      <Grid templateColumns="repeat(3, 1fr)" gap={3}>
                        {avatarChoices.hair.map(option => renderAvatarOption(option))}
                      </Grid>
                    </TabPanel>
                    
                    {/* Opções de Acessórios */}
                    <TabPanel>
                      <Grid templateColumns="repeat(3, 1fr)" gap={3}>
                        {avatarChoices.accessories.map(option => renderAvatarOption(option))}
                      </Grid>
                    </TabPanel>
                    
                    {/* Opções de Expressão */}
                    <TabPanel>
                      <Grid templateColumns="repeat(3, 1fr)" gap={3}>
                        {avatarChoices.expression.map(option => renderAvatarOption(option))}
                      </Grid>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button 
              variant="outline" 
              mr={3} 
              onClick={onClose}
              aria-label="Cancelar e fechar"
            >
              Cancelar
            </Button>
            <Button 
              bgGradient="linear(to-r, brand.purple, brand.pink)"
              color="white"
              onClick={saveAvatar}
              _hover={{ bgGradient: "linear(to-r, brand.pink, brand.purple)" }}
              aria-label="Salvar meu avatar"
            >
              Salvar Avatar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AvatarCreator;