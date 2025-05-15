import React, { ReactNode } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                    <path d="M3 8v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="m2 4 2 2h16l2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="m9 14 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="ml-3 font-bold text-xl text-gray-900 dark:text-white">MNS Lucky Draw</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className={`${pathname === '/' ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} px-3 py-2 text-sm font-medium dark:text-gray-200 dark:hover:text-primary-400 transition-colors duration-150`}>
                Home
              </Link>
              <Link to="/register" className={`${pathname === '/register' ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} px-3 py-2 text-sm font-medium dark:text-gray-200 dark:hover:text-primary-400 transition-colors duration-150`}>
                Register
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/draw" className={`${pathname === '/draw' ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} px-3 py-2 text-sm font-medium dark:text-gray-200 dark:hover:text-primary-400 transition-colors duration-150`}>
                    Draw
                  </Link>
                  <button 
                    onClick={logout}
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium dark:text-gray-200 dark:hover:text-primary-400 transition-colors duration-150"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className={`${pathname === '/login' ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} px-3 py-2 text-sm font-medium dark:text-gray-200 dark:hover:text-primary-400 transition-colors duration-150`}
                >
                  Login
                </Link>
              )}
            </nav>
            
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="rounded-full p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 transition duration-150"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className="md:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 transition duration-150"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="pt-2 pb-3 space-y-1 border-t border-gray-200 dark:border-gray-700">
            <Link
              to="/"
              className={`${pathname === '/' ? 'bg-primary-50 text-primary-700 dark:bg-gray-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-200'} block px-3 py-2 text-base font-medium`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/register"
              className={`${pathname === '/register' ? 'bg-primary-50 text-primary-700 dark:bg-gray-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-200'} block px-3 py-2 text-base font-medium`}
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/draw"
                  className={`${pathname === '/draw' ? 'bg-primary-50 text-primary-700 dark:bg-gray-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-200'} block px-3 py-2 text-base font-medium`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Draw
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left text-gray-700 dark:text-gray-200 block px-3 py-2 text-base font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`${pathname === '/login' ? 'bg-primary-50 text-primary-700 dark:bg-gray-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-200'} block px-3 py-2 text-base font-medium`}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      <main>
        {children}
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow-inner py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} MNS Lucky Draw. All rights reserved. | <a href="/wp-content/uploads/2024/07/DC0-MNS_Privacy-Notice.pdf" target="_blank">Privacy Notice</a>
          </p>
        </div>
      </footer>
    </div>
  );
}