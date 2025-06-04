// src/components/ui/SettingsPanel.tsx
import { useColorMode, Box, Button, Flex, Heading, Switch, FormControl, FormLabel, Stack, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { FaMoon, FaSun, FaFont, FaVolumeUp } from "react-icons/fa";

const SettingsPanel = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg={colorMode === "dark" ? "gray.700" : "white"} p={6} borderRadius="lg" boxShadow="md">
      <Heading size="md" mb={6}>Configurações de Acessibilidade</Heading>
      
      <Stack spacing={6}>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="dark-mode" mb="0">
            <Flex alignItems="center">
              {colorMode === "dark" ? <FaMoon /> : <FaSun />}
              <Box ml={2}>Modo {colorMode === "dark" ? "Escuro" : "Claro"}</Box>
            </Flex>
          </FormLabel>
          <Switch 
            id="dark-mode" 
            isChecked={colorMode === "dark"}
            onChange={toggleColorMode}
            colorScheme="purple"
          />
        </FormControl>
        
        <FormControl>
          <FormLabel htmlFor="font-size" display="flex" alignItems="center">
            <FaFont />
            <Box ml={2}>Tamanho da Fonte</Box>
          </FormLabel>
          <Slider defaultValue={50} min={0} max={100} step={10} id="font-size">
            <SliderTrack>
              <SliderFilledTrack bg="purple.500" />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </FormControl>
        
        <FormControl>
          <FormLabel htmlFor="sound-volume" display="flex" alignItems="center">
            <FaVolumeUp />
            <Box ml={2}>Volume do Som</Box>
          </FormLabel>
          <Slider defaultValue={70} min={0} max={100} step={10} id="sound-volume">
            <SliderTrack>
              <SliderFilledTrack bg="purple.500" />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </FormControl>
        
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="high-contrast" mb="0">
            Alto Contraste
          </FormLabel>
          <Switch id="high-contrast" colorScheme="purple" />
        </FormControl>
        
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="animations" mb="0">
            Animações
          </FormLabel>
          <Switch id="animations" defaultChecked colorScheme="purple" />
        </FormControl>
      </Stack>
    </Box>
  );
};

export default SettingsPanel;