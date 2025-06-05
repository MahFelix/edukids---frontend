const fs = require('fs')
const path = require('path')

// Corrige referências quebradas no build
const fixChakraSystem = () => {
  const filePath = path.join(__dirname, 'node_modules', '@chakra-ui', 'react', 'dist', 'chakra-ui-react.cjs.js')
  const content = fs.readFileSync(filePath, 'utf8')
  const fixed = content.replace(/@chakra-ui\/system/g, '@chakra-ui/react')
  fs.writeFileSync(filePath, fixed, 'utf8')
}

fixChakraSystem()