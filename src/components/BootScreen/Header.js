import React from 'react';
import { Power, Lock, Unlock } from 'lucide-react';

const Header = ({ loadingProgress }) => {
  return (
    <div className="flex items-center justify-between bg-gray-900/80 text-white p-3 border-b border-gray-700 rounded-t-lg">
      <div className="flex items-center">
        <Power className="w-5 h-5 text-green-500 mr-2" />
        <span className="font-mono text-lg font-bold">TATANE.OS</span>
        <span className="ml-4 text-gray-500 text-sm font-mono">v3.1.4</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex space-x-1">
          {loadingProgress < 100 ? (
            <Lock size={14} className="text-red-500" />
          ) : (
            <Unlock size={14} className="text-green-500" />
          )}
          <span className="text-xs font-mono">
            {loadingProgress < 100 ? 'VERROUILLÉ' : 'DÉVERROUILLÉ'}
          </span>
        </div>
        
        <div className="h-1 w-40 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-600 via-blue-500 to-green-400 rounded-full transition-all duration-300" 
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header; 