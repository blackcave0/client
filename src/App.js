import React from 'react';
import { 
  createBrowserRouter, 
  RouterProvider, 
  createRoutesFromElements, 
  Route,
  Navigate,
  Outlet
} from 'react-router-dom';
import { ChakraProvider, Box, Flex } from '@chakra-ui/react';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import theme from './styles/theme';
import { BackgroundPattern } from './components/BackgroundPattern';

// Layout component
const Layout = () => (
  <Flex direction="column" minH="100vh">
    <BackgroundPattern />
    <Header />
    <Box flex="1">
      <Outlet />
    </Box>
    <Footer />
  </Flex>
);

// Protected Route component
const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

// Create router with routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
    },
  }
);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App; 