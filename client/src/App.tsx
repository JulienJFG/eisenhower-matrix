import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import './App.css';

const App: React.FC = () => {
  const { currentUser, loading } = useAuth();

  // Protected route component
  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (loading) {
      return <div className="loading-screen">Loading...</div>;
    }
    
    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }
    
    return <>{children}</>;
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
