import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Draw } from './pages/Draw';
import { Status } from './pages/Status';
import { Login } from './pages/Login';
import { ThemeProvider } from './components/ThemeProvider';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/status/:code" element={<Status />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/draw" 
          element={isAuthenticated ? <Draw /> : <Navigate to="/login" replace />} 
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;