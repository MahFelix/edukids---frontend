// src/components/games/MathGame.tsx
import { useState, useEffect } from 'react';
import { Box, Button, Center, Flex, Heading, Text, VStack, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import correctSound from '../../assets/sounds/correct.mp3';
import wrongSound from '../../assets/sounds/wrong.mp3';
import useUserStore from '../../store/userStore';

const MathGame = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [playCorrect] = useSound(correctSound);
  const [playWrong] = useSound(wrongSound);
  const toast = useToast();
  const addPoints = useUserStore(state => state.addPoints);

  const generateQuestion = () => {
    // Gerar números entre 1 e 10 para facilitar
    const newNum1 = Math.floor(Math.random() * 10) + 1;
    const newNum2 = Math.floor(Math.random() * 10) + 1;
    const correctAnswer = newNum1 + newNum2;

    // Gerar opções
    let newOptions = [correctAnswer];
    while (newOptions.length < 4) {
      const randOption = Math.floor(Math.random() * 20) + 1;
      if (!newOptions.includes(randOption)) {
        newOptions.push(randOption);
      }
    }
    // Embaralhar opções
    newOptions = newOptions.sort(() => Math.random() - 0.5);

    setNum1(newNum1);
    setNum2(newNum2);
    setOptions(newOptions);
    setIsCorrect(null);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleAnswer = (selectedAnswer: number) => {
    const correct = num1 + num2 === selectedAnswer;
    setIsCorrect(correct);

    if (correct) {
      playCorrect();
      setScore(score + 10);
      addPoints(10);

      toast({
        title: "Muito bem!",
        description: "Você acertou! +10 pontos.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top"
      });

      // Gerar nova questão após um breve delay
      setTimeout(() => {
        generateQuestion();
      }, 1500);
    } else {
      playWrong();

      toast({
        title: "Ops!",
        description: `A resposta correta é ${num1 + num2}.`,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top"
      });
    }
  };

  return (
    <Box
      bg="white"
      p={8}
      borderRadius="xl"
      boxShadow="xl"
      maxW="500px"
      mx="auto"
    >
      <VStack spacing={6}>
        <Heading color="blue.500">Matemática Divertida</Heading>
        <Text fontSize="lg">Pontuação: {score}</Text>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Box
            p={6}
            bg="blue.50"
            borderRadius="lg"
            width="100%"
          >
            <Heading size="lg" textAlign="center">
              {num1} + {num2} = ?
            </Heading>
          </Box>
        </motion.div>

        <Flex
          wrap="wrap"
          justify="center"
          gap={4}
          width="100%"
        >
          {options.map((option, index) => (
            <Button
              key={index}
              as={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              size="lg"
              colorScheme="blue"
              variant="outline"
              h="60px"
              w="100px"
              fontSize="2xl"
              onClick={() => handleAnswer(option)}
              isDisabled={isCorrect !== null}
            >
              {option}
            </Button>
          ))}
        </Flex>

        {isCorrect !== null && (
          <Center
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // Removed transition prop from Center
            p={4}
            bg={isCorrect ? "green.100" : "red.100"}
            color={isCorrect ? "green.700" : "red.700"}
            borderRadius="md"
            width="100%"
          >
            <Text fontSize="xl">
              {isCorrect ? "Correto! 🎉" : `Incorreto. A resposta é ${num1 + num2}`}
            </Text>
          </Center>
        )}

        <Button
          colorScheme="blue"
          onClick={generateQuestion}
        >
          Próxima Questão
        </Button>
      </VStack>
    </Box>
  );
};

export default MathGame;