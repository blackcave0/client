import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Link,
  useToast,
  Container,
  Divider,
  useColorModeValue,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import AppInfo from '../components/AppInfo';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const toast = useToast();

  const bgColor = useColorModeValue('dark.200', 'dark.300');
  const borderColor = useColorModeValue('dark.300', 'dark.400');
  const textColor = 'whiteAlpha.900';

  // Responsive layout controls
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const containerPadding = useBreakpointValue({ base: 4, md: 8 });
  const headingSize = useBreakpointValue({ base: "xl", md: "2xl" });
  const contentSpacing = useBreakpointValue({ base: 6, md: 8 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://todoappserver-six.vercel.app/api/users/login', {
        email,
        password,
      });
      login(response.data);
      window.location.href = '/';
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'An error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.xl" px={containerPadding} py={8}>
      <VStack spacing={8} w="full" align="stretch">
        {/* Header Section */}
        <VStack spacing={3} textAlign="center">
          <Heading 
            size={headingSize}
            color="brand.primary"
            px={useBreakpointValue({ base: 4, md: 0 })}
          >
            Welcome to TaskMaster
          </Heading>
          <Text 
            color={textColor} 
            fontSize={useBreakpointValue({ base: "md", md: "lg" })}
            maxW="container.md"
            textAlign="center"
          >
            Your personal task management solution
          </Text>
        </VStack>

        {/* Main Content */}
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          spacing={contentSpacing}
          justify="center"
          align={{ base: 'stretch', lg: 'flex-start' }}
        >
          {/* Login Form */}
          <Box
            w={{ base: 'full', lg: '400px' }}
            bg={bgColor}
            p={{ base: 6, md: 8 }}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
            boxShadow="lg"
          >
            <VStack spacing={4}>
              <Heading size="lg" color={textColor}>
                Login
              </Heading>
              <FormControl id="email">
                <FormLabel color={textColor}>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  bg="dark.400"
                  borderColor={borderColor}
                  color={textColor}
                  _placeholder={{ color: 'whiteAlpha.500' }}
                  _hover={{ borderColor: 'brand.primary' }}
                  _focus={{ borderColor: 'brand.primary', boxShadow: 'none' }}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel color={textColor}>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  bg="dark.400"
                  borderColor={borderColor}
                  color={textColor}
                  _placeholder={{ color: 'whiteAlpha.500' }}
                  _hover={{ borderColor: 'brand.primary' }}
                  _focus={{ borderColor: 'brand.primary', boxShadow: 'none' }}
                />
              </FormControl>
              <Button
                colorScheme="brand"
                width="100%"
                onClick={handleSubmit}
                size="lg"
                bg="brand.primary"
                _hover={{ bg: 'brand.secondary' }}
              >
                Login
              </Button>
              <Text color={textColor}>
                Don't have an account?{' '}
                <Link color="brand.primary" href="/register">
                  Register
                </Link>
              </Text>
            </VStack>
          </Box>

          {/* Divider */}
          {isDesktop && (
            <Divider 
              orientation="vertical" 
              height="auto"
              borderColor={borderColor}
              mx={8}
            />
          )}

          {/* Features Section */}
          <Box 
            flex="1"
            maxW={{ base: 'full', lg: '600px' }}
            mx="auto"
          >
            <VStack spacing={6} align={{ base: 'center', lg: 'start' }}>
              <Heading 
                size={useBreakpointValue({ base: "md", md: "lg" })} 
                color="brand.primary"
                textAlign={{ base: "center", lg: "left" }}
              >
                Why Choose TaskMaster?
              </Heading>
              <Box w="full">
                <AppInfo />
              </Box>
            </VStack>
          </Box>
        </Stack>
      </VStack>
    </Container>
  );
}

export default Login; 