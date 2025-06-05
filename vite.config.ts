import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Solução definitiva para o erro do Chakra UI
const chakraUIResolver = {
  name: 'chakra-ui-resolver',
  resolveId(source: string) {
    if (source === '@chakra-ui/system') {
      return path.resolve(__dirname, 'node_modules/@chakra-ui/react/dist/chakra-ui-react.cjs.js')
    }
  }
}

export default defineConfig({
  plugins: [react(), chakraUIResolver],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@chakra-ui/system': path.resolve(__dirname, 'node_modules/@chakra-ui/react/dist/chakra-ui-react.cjs.js')
    }
  },
  build: {
    commonjsOptions: {
      include: [/@chakra-ui/, /node_modules/]
    },
    rollupOptions: {
      external: ['@chakra-ui/system']
    }
  }
})