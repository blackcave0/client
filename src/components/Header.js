import {
  Box,
  Flex,
  Button,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  Container,
  Icon,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { user, logout } = useAuth();
  const bgColor = useColorModeValue('dark.200', 'dark.300');

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <Box bg={bgColor} py={4} shadow="lg" position="sticky" top={0} zIndex={10}>
      <Container maxW="container.lg">
        <Flex justify="space-between" align="center">
          <HStack spacing={4}>
            <Icon as={FaCheckCircle} w={8} h={8} color="brand.primary" />
            <Box>
              <Heading size="md" color="whiteAlpha.900">
                TaskMaster
              </Heading>
              <Text fontSize="xs" color="whiteAlpha.700">
                Organize your life
              </Text>
            </Box>
          </HStack>
          {user && (
            <HStack spacing={4}>
              <Text color="whiteAlpha.800">Welcome, {user.name}</Text>
              <Button
                onClick={handleLogout}
                variant="outline"
                colorScheme="whiteAlpha"
                size="sm"
              >
                Logout
              </Button>
            </HStack>
          )}
        </Flex>
      </Container>
    </Box>
  );
}

export default Header; 