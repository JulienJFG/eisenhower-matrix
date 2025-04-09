import React from 'react';
import Header from './Header';
import { useAuth } from '../hooks/useAuth';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentUser } = useAuth();

  return (
    <div className="app-container">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-white py-4 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Eisenhower Matrix App. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
