import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import themeConfig from './styles/theme';
import Dashboard from './pages/Dashboard';
import AccessibilityProvider from './components/AccessibilityProvider';
import MathGame from './components/games/MathGame';
import AvatarCreator from './components/Avatar/AvatarCreator';
import MinhaAventura from './components/Achievements/MinhaAventura';

const customTheme = extendTheme(themeConfig);

function App() {
  return (
    <AccessibilityProvider>
      <ChakraProvider theme={customTheme}>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
             <Route path="/games" element={<MathGame/>} />
             <Route path="/avatar" element={<AvatarCreator/>} />
             <Route
               path="/aventura"
               element={
                 <MinhaAventura isOpen={true} onClose={() => {}} />
               }
             />
            
          </Routes>
        </Router>
      </ChakraProvider>
    </AccessibilityProvider>
  );
}

export default App;