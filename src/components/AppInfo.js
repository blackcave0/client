import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FaCheckCircle,
  FaLock,
  FaSync,
  FaMobileAlt,
} from 'react-icons/fa';

const Feature = ({ title, text, icon }) => {
  const bgColor = useColorModeValue('dark.200', 'dark.300');
  const hoverBgColor = useColorModeValue('dark.300', 'dark.400');

  return (
    <Stack
      bg={bgColor}
      p={5}
      borderRadius="lg"
      transition="all 0.3s"
      _hover={{ 
        transform: 'translateY(-2px)',
        bg: hoverBgColor,
        shadow: 'lg' 
      }}
      height="full"
    >
      <Flex
        w={12}
        h={12}
        align="center"
        justify="center"
        color="brand.primary"
        rounded="full"
        bg={useColorModeValue('dark.300', 'dark.400')}
        mb={2}
      >
        {icon}
      </Flex>
      <Text 
        fontWeight={600} 
        color="whiteAlpha.900"
        fontSize={{ base: "md", md: "lg" }}
      >
        {title}
      </Text>
      <Text 
        color="whiteAlpha.800" 
        fontSize={{ base: "sm", md: "md" }}
      >
        {text}
      </Text>
    </Stack>
  );
};

function AppInfo() {
  return (
    <Box py={4} w="full">
      <SimpleGrid 
        columns={{ base: 1, sm: 2, lg: 2 }} 
        spacing={{ base: 4, md: 6, lg: 8 }}
      >
        <Feature
          icon={<Icon as={FaCheckCircle} w={8} h={8} />}
          title="Task Management"
          text="Easily create, update, and organize your daily tasks"
        />
        <Feature
          icon={<Icon as={FaLock} w={8} h={8} />}
          title="Secure"
          text="Your data is protected with JWT authentication"
        />
        <Feature
          icon={<Icon as={FaSync} w={8} h={8} />}
          title="Real-time Updates"
          text="Changes are reflected instantly across your account"
        />
        <Feature
          icon={<Icon as={FaMobileAlt} w={8} h={8} />}
          title="Responsive"
          text="Access your tasks from any device, anywhere"
        />
      </SimpleGrid>
    </Box>
  );
}

export default AppInfo; 