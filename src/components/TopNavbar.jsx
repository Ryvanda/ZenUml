import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import ZenUMLLogo from './branding/ZenUMLLogo';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

const TopNavbar = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <div className="h-14 bg-[#2b2b2c] border-b border-[#3e3e42] flex items-center justify-between px-4">
      <div className="flex items-center space-x-8">
        <ZenUMLLogo size="normal" />
        <nav className="flex items-center space-x-6 text-sm">
          <button className="text-gray-300 hover:text-white transition">File</button>
          <button className="text-gray-300 hover:text-white transition">Edit</button>
          <button className="text-gray-300 hover:text-white transition">Model</button>
          <button className="text-gray-300 hover:text-white transition">View</button>
          <button className="text-gray-300 hover:text-white transition">Tools</button>
          <button className="text-gray-300 hover:text-white transition">Help</button>
        </nav>
      </div>
      <div className="flex items-center space-x-3">
        {isAuthenticated && user ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition text-gray-200 text-sm"
            >
              {user.picture && (
                <img 
                  src={user.picture} 
                  alt={user.name} 
                  className="w-5 h-5 rounded-full"
                />
              )}
              {!user.picture && (
                <User className="w-5 h-5" />
              )}
              <span>{user.name || user.email}</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50">
                <div className="p-3 border-b border-gray-700">
                  <p className="text-sm text-gray-300 font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <Button 
            size="sm" 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => navigate('/login')}
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};

export default TopNavbar;