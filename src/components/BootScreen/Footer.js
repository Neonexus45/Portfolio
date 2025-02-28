import React from 'react';
import { ShieldAlert, Zap } from 'lucide-react';

const Footer = ({ loadingProgress }) => {
  return (
    <div className="bg-gray-900/80 text-gray-400 p-2 text-xs font-mono flex justify-between items-center border-t border-gray-700 rounded-b-lg">
      <div className="flex items-center space-x-4">
        <div className={`flex items-center ${loadingProgress < 100 ? 'text-yellow-500' : 'text-green-500'}`}>
          <ShieldAlert size={12} className="mr-1" />
          <span>{loadingProgress < 100 ? 'DÉMARRAGE' : 'PRÊT'}</span>
        </div>
        
        <div className="flex items-center text-blue-400">
          <Zap size={12} className="mr-1" />
          <span>PUISSANCE: OPTIMALE</span>
        </div>
      </div>
      
      <div>
        © {new Date().getFullYear()} Aperture Science Labs | APPUYEZ SUR ESC POUR PASSER
      </div>
    </div>
  );
};

export default Footer; 