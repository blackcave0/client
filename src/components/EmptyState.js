import { Box, Text, VStack } from '@chakra-ui/react';

export const EmptyStateIllustration = () => (
  <svg
    width="200"
    height="200"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="#4A5568"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14"
      stroke="#4A5568"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 9H9.01"
      stroke="#4A5568"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 9H15.01"
      stroke="#4A5568"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const EmptyState = () => (
  <VStack spacing={4} my={12}>
    <EmptyStateIllustration />
    <Text color="gray.500" fontSize="lg">
      No todos yet. Start by adding one!
    </Text>
  </VStack>
); 