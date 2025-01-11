import { Box, Flex, Button, Heading } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <Box bg="blue.500" px={4} py={3}>
      <Flex maxW="container.lg" mx="auto" justify="space-between" align="center">
        <Heading size="md" color="white">
          Todo App
        </Heading>
        {user ? (
          <Button onClick={logout} colorScheme="whiteAlpha">
            Logout
          </Button>
        ) : null}
      </Flex>
    </Box>
  );
}

export default Navbar; 