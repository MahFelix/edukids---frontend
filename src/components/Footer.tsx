import {
    Box,
    Flex,
    Text,
    keyframes,
    useColorModeValue,
    Button,
    Tooltip,
    VisuallyHidden,
    useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { FaStar, FaTrophy, FaRocket, FaVolumeUp } from "react-icons/fa";
import MinhaAventura from "./Achievements/MinhaAventura"; // Importando o componente de aventura


// Animações
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const shine = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const decorativeBubbles = [
    { width: 22, height: 22, bottom: 10, left: '5%' },
    { width: 28, height: 28, bottom: 30, left: '18%' },
    { width: 20, height: 20, bottom: 50, left: '32%' },
    { width: 25, height: 25, bottom: 20, left: '48%' },
    { width: 18, height: 18, bottom: 40, left: '60%' },
    { width: 30, height: 30, bottom: 15, left: '72%' },
    { width: 24, height: 24, bottom: 35, left: '85%' },
    { width: 19, height: 19, bottom: 55, left: '95%' },
];

const Footer = ({ userPoints = 120, userName = "Explorador" }) => {
    const [celebrate, setCelebrate] = useState(false);
    const [previousPoints, setPreviousPoints] = useState(userPoints);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const bgGradient = "linear-gradient(90deg, #9C6FEB 0%, #FF85B0 100%)";
    const buttonBg = useColorModeValue("yellow.400", "yellow.500");
    const buttonHoverBg = useColorModeValue("yellow.500", "yellow.600");

    // Determina o nível com base nos pontos
    const getLevel = (points: number) => {
        if (points < 50) return "Explorador Novato";
        if (points < 100) return "Aventureiro";
        if (points < 200) return "Super Estrela";
        return "Mestre Galáctico";
    };

    const userLevel = getLevel(userPoints);

    // Efeito para celebração quando os pontos aumentam
    useEffect(() => {
        if (userPoints > previousPoints) {
            setCelebrate(true);
            // Tocar som de celebração
            if (audioRef.current) {
                audioRef.current.play().catch(() => { });
            }
            setTimeout(() => setCelebrate(false), 3000);
        }
        setPreviousPoints(userPoints);
    }, [userPoints, previousPoints]);

    // Função para tocar o som manualmente (importante para acessibilidade)
    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.play().catch(() => { });
        }
    };

    return (
        <Box
            as="footer"
            width="100%"
            py={10}
            bgGradient={bgGradient}
            borderTopRadius="20px"
            boxShadow="0 -4px 10px rgba(0,0,0,0.1)"
            position="fixed" // Alterado de "relative" para "fixed"
            bottom={0} // Fixa o elemento na parte inferior
            left={0} // Alinha à esquerda
            right={0} // Estende para a direita
            overflow="hidden"
            aria-label="Rodapé com informações do usuário"
            role="contentinfo"
            zIndex={10} // Garante que fique acima de outros elementos
        >
            {/* Audio para celebrações - oculto visualmente mas disponível */}
            <audio
                ref={audioRef}
                src="/sounds/celebration.mp3"
                preload="auto"
                aria-hidden="true"
            />

            {/* Elementos decorativos de fundo com valores fixos para evitar problemas de hidratação */}
            {decorativeBubbles.map((bubble, i) => (
                <Box
                    key={i}
                    position="absolute"
                    borderRadius="full"
                    bg="rgba(255,255,255,0.2)"
                    width={`${bubble.width}px`}
                    height={`${bubble.height}px`}
                    bottom={`${bubble.bottom}px`}
                    left={bubble.left}
                    animation={`${bounce} ${2 + i * 0.3}s infinite`}
                    aria-hidden="true"
                />
            ))}

            <Flex
                direction={["column", "row"]}
                alignItems="center"
                justifyContent="space-between"
                px={[4, 6, 8]}
                maxWidth="1200px"
                mx="auto"
                wrap="wrap"
            >
                {/* Seção de pontos */}
                <Flex
                    alignItems="center"
                    mb={[4, 0]}
                >
                    <Tooltip label="Seus pontos de aventura!" aria-label="Informação sobre pontos" hasArrow>
                        <Box
                            bg="yellow.400"
                            borderRadius="full"
                            p={3}
                            mr={3}
                            boxShadow="0 0 12px gold"
                            animation={celebrate ? `${shine} 1s ease-in-out 3` : "none"}
                            position="relative"
                            aria-live="polite"
                            transition="transform 0.2s"
                            _hover={{ transform: "scale(1.05)" }}
                        >
                            <FaStar
                                size="30px"
                                color="white"
                                aria-hidden="true"
                            />
                        </Box>
                    </Tooltip>

                    <Box>
                        <Text
                            fontSize={["xl", "2xl"]}
                            fontWeight="bold"
                            color="white"
                            animation={celebrate ? `${shine} 1s ease-in-out 3` : "none"}
                            aria-live="polite"
                        >
                            {userPoints} pontos
                        </Text>
                        <Text fontSize="sm" color="whiteAlpha.900">
                            Nível: {userLevel}
                        </Text>
                    </Box>

                    <Button
                        ml={3}
                        size="sm"
                        variant="unstyled"
                        aria-label="Tocar som de celebração"
                        onClick={playSound}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                        opacity={0.7}
                        _hover={{ opacity: 1 }}
                        p={1}
                    >
                        <FaVolumeUp />
                    </Button>
                </Flex>

                {/* Seção central com botão de progresso */}
                <Flex
                    alignItems="center"
                    justifyContent="center"
                    my={[3, 0]}
                >

                    <Button
                        colorScheme="yellow"
                        bg={buttonBg}
                        _hover={{ bg: buttonHoverBg }}
                        borderRadius="full"
                        px={6}
                        leftIcon={<FaRocket />}
                        fontWeight="bold"
                        boxShadow="0px 4px 10px rgba(0,0,0,0.2)"
                        onClick={onOpen}
                        aria-label="Ver seu progresso na aventura"
                    >
                        Minha Aventura
                    </Button>
                    <MinhaAventura isOpen={isOpen} onClose={onClose} />

                </Flex>

                {/* Seção de saudação ao usuário */}
                <Flex
                    alignItems="center"
                    mt={[4, 7]}
                >
                    <Text
                        fontSize={["md", "lg"]}
                        color="white"
                        fontWeight="medium"
                        mr={2}
                    >
                        Olá, {userName}!
                    </Text>
                    <Box
                        bg="teal.400"
                        borderRadius="full"
                        p={2}
                        animation={`${bounce} 2s infinite`}
                    >
                        <FaTrophy
                            size="20px"
                            color="white"
                            aria-hidden="true"
                        />
                        <VisuallyHidden>Troféu</VisuallyHidden>
                    </Box>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Footer;