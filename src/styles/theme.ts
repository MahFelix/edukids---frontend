// src/styles/theme.ts
const theme = {
  colors: {
    brand: {
      purple: '#a37fe3',
      pink: '#FF85B0',
      blue: '#4B9BF9',
      green: '#4CD763',
      yellow: '#FFD84D',
      gradient: 'linear-gradient(90deg, #9C6FEB 0%, #FF85B0 100%)'
    }
  },
  fonts: {
    heading: "'Nunito', sans-serif",
    body: "'Nunito', sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: '#F5F7FA',
        color: '#333',
      }
    }
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'full',
        fontWeight: 'bold',
      },
      variants: {
        primary: {
          bg: 'brand.purple',
          color: 'white',
          _hover: {
            bg: 'brand.pink',
            transform: 'scale(1.05)'
          }
        }
      }
    },
  }
};

export default theme;