import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  Icon,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaGithub, FaHeart } from 'react-icons/fa';

function Footer() {
  const bgColor = useColorModeValue('dark.200', 'dark.300');

  return (
    <Box bg={bgColor} color="whiteAlpha.800" mt="auto">
      <Container
        as={Stack}
        maxW="container.lg"
        py={4}
        spacing={4}
        justify="center"
        align="center"
      >
        <HStack spacing={2}>
          <Text>Made with</Text>
          <Icon as={FaHeart} color="red.400" />
          <Text>by Your Name</Text>
        </HStack>
        <Stack direction="row" spacing={6}>
          <Link href="#" isExternal>
            About
          </Link>
          <Link href="#" isExternal>
            Features
          </Link>
          <Link href="https://github.com/yourusername" isExternal>
            <HStack>
              <Icon as={FaGithub} />
              <Text>GitHub</Text>
            </HStack>
          </Link>
        </Stack>
        <Text fontSize="sm">© 2024 TaskMaster. All rights reserved</Text>
      </Container>
    </Box>
  );
}

export default Footer; 