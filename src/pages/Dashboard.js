import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  VStack,
  Input,
  Button,
  Text,
  HStack,
  IconButton,
  useToast,
  Checkbox,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Heading,
  Container,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  DeleteIcon,
  EditIcon,
  AddIcon,
  CheckIcon,
  CloseIcon,
} from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { EmptyState } from '../components/EmptyState';
import AppInfo from '../components/AppInfo';

const MotionBox = motion(Box);

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const { user } = useAuth();
  const toast = useToast();

  const bgColor = useColorModeValue('dark.200', 'dark.300');
  const hoverBgColor = useColorModeValue('dark.300', 'dark.400');
  const borderColor = useColorModeValue('dark.300', 'dark.400');
  const textColor = 'whiteAlpha.900';
  const secondaryTextColor = 'whiteAlpha.700';

  const fetchTodos = useCallback(async () => {
    try {
      const response = await axios.get('https://todoappserver-six.vercel.app/api/todos', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setTodos(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not fetch todos',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [user.token, toast]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      await axios.post(
        'https://todoappserver-six.vercel.app/api/todos',
        { text: newTodo },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not add todo',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      const response = await axios.put(
        `https://todoappserver-six.vercel.app/api/todos/${id}`,
        updates,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      setEditingTodo(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not update todo',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteClick = (todo) => {
    setTodoToDelete(todo);
    setIsDeleteAlertOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!todoToDelete) return;

    try {
      await axios.delete(`https://todoappserver-six.vercel.app/api/todos/${todoToDelete._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setTodos(todos.filter((todo) => todo._id !== todoToDelete._id));
      toast({
        title: 'Success',
        description: 'Todo deleted successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not delete todo',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsDeleteAlertOpen(false);
      setTodoToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteAlertOpen(false);
    setTodoToDelete(null);
  };

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8}>
        <Heading size="lg" color="brand.primary">
          My Todo List
        </Heading>

        <AppInfo />

        <Box
          w="100%"
          bg={bgColor}
          borderRadius="lg"
          boxShadow="lg"
          p={6}
          borderWidth="1px"
          borderColor={borderColor}
        >
          <VStack spacing={4}>
            <HStack width="100%">
              <Input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo"
                size="lg"
                borderRadius="full"
                bg="dark.400"
                borderColor={borderColor}
                color={textColor}
                _placeholder={{ color: 'whiteAlpha.500' }}
                _hover={{ borderColor: 'brand.primary' }}
                _focus={{ borderColor: 'brand.primary', boxShadow: 'none' }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addTodo();
                  }
                }}
              />
              <IconButton
                icon={<AddIcon />}
                onClick={addTodo}
                colorScheme="brand"
                borderRadius="full"
                size="lg"
                isDisabled={!newTodo.trim()}
                bg="brand.primary"
                _hover={{ bg: 'brand.secondary' }}
              />
            </HStack>

            <VStack width="100%" align="stretch" spacing={4}>
              <AnimatePresence>
                {todos.length === 0 ? (
                  <EmptyState />
                ) : (
                  todos.map((todo) => (
                    <MotionBox
                      key={todo._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Box
                        p={4}
                        borderWidth="1px"
                        borderRadius="lg"
                        borderColor={borderColor}
                        bg={bgColor}
                        _hover={{
                          bg: hoverBgColor,
                          transform: 'translateY(-2px)',
                          transition: 'all 0.2s',
                          boxShadow: 'lg',
                        }}
                      >
                        <HStack justify="space-between">
                          {editingTodo === todo._id ? (
                            <Input
                              value={todo.text}
                              onChange={(e) =>
                                setTodos(
                                  todos.map((t) =>
                                    t._id === todo._id
                                      ? { ...t, text: e.target.value }
                                      : t
                                  )
                                )
                              }
                              onBlur={() =>
                                updateTodo(todo._id, { text: todo.text })
                              }
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  updateTodo(todo._id, { text: todo.text });
                                }
                              }}
                              bg="dark.400"
                              borderColor={borderColor}
                              color={textColor}
                              _hover={{ borderColor: 'brand.primary' }}
                              _focus={{ borderColor: 'brand.primary', boxShadow: 'none' }}
                              autoFocus
                            />
                          ) : (
                            <HStack flex={1}>
                              <Checkbox
                                isChecked={todo.completed}
                                onChange={() =>
                                  updateTodo(todo._id, {
                                    completed: !todo.completed,
                                  })
                                }
                                colorScheme="brand"
                                size="lg"
                                borderColor="whiteAlpha.400"
                              />
                              <Text
                                textDecoration={
                                  todo.completed ? 'line-through' : 'none'
                                }
                                color={todo.completed ? secondaryTextColor : textColor}
                                fontSize="md"
                              >
                                {todo.text}
                              </Text>
                            </HStack>
                          )}
                          <HStack spacing={2}>
                            <IconButton
                              icon={editingTodo === todo._id ? <CheckIcon /> : <EditIcon />}
                              onClick={() =>
                                editingTodo === todo._id
                                  ? updateTodo(todo._id, { text: todo.text })
                                  : setEditingTodo(todo._id)
                              }
                              size="sm"
                              variant="ghost"
                              color="brand.primary"
                              _hover={{ bg: 'dark.400' }}
                            />
                            <IconButton
                              icon={<DeleteIcon />}
                              onClick={() => handleDeleteClick(todo)}
                              size="sm"
                              variant="ghost"
                              color="red.400"
                              _hover={{ bg: 'dark.400' }}
                            />
                          </HStack>
                        </HStack>
                      </Box>
                    </MotionBox>
                  ))
                )}
              </AnimatePresence>
            </VStack>
          </VStack>
        </Box>
      </VStack>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteAlertOpen}
        onClose={handleDeleteCancel}
        leastDestructiveRef={undefined}
        isCentered
      >
        <AlertDialogOverlay bg="blackAlpha.300" backdropFilter="blur(10px)">
          <AlertDialogContent
            mx={4}
            maxW="md"
            bg="dark.200"
            borderColor="dark.400"
          >
            <AlertDialogHeader fontSize="lg" fontWeight="bold" color={textColor}>
              Delete Todo
            </AlertDialogHeader>

            <AlertDialogBody>
              <VStack align="stretch" spacing={3}>
                <Text color={textColor}>
                  Are you sure you want to delete this todo?
                </Text>
                {todoToDelete && (
                  <Box
                    p={3}
                    borderRadius="md"
                    bg="dark.300"
                    borderWidth="1px"
                    borderColor="dark.400"
                  >
                    <Text fontWeight="medium" color={textColor}>
                      {todoToDelete.text}
                    </Text>
                  </Box>
                )}
              </VStack>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                leftIcon={<CloseIcon />}
                onClick={handleDeleteCancel}
                variant="ghost"
                color={textColor}
                _hover={{ bg: 'dark.400' }}
              >
                Cancel
              </Button>
              <Button
                leftIcon={<DeleteIcon />}
                colorScheme="red"
                onClick={handleDeleteConfirm}
                ml={3}
                _hover={{ bg: 'red.600' }}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
}

export default Dashboard; 