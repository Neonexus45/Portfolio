import React, { useState, useEffect, useRef } from 'react';
import CodeRain from './CodeRain';
import Terminal from './Terminal';
import Header from './Header';
import Footer from './Footer';
import LanguageSelector from './LanguageSelector';
import content from '../../data/content';

const BootScreen = ({ onComplete, onLanguageSelect }) => {
  const [bootPhase, setBootPhase] = useState(0);
  const [displayedLogs, setDisplayedLogs] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showLanguageSelect, setShowLanguageSelect] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [isFading, setIsFading] = useState(false);
  
  const containerRef = useRef(null);
  const terminalRef = useRef(null);

  const bootSequence = [
    { type: 'system', text: 'Initializing boot sequence...' },
    { type: 'system', text: 'ALERT: Unauthorized access attempt detected' },
    { type: 'system', text: '"All your base are belong to us"' },
    { type: 'system', text: 'Security countermeasures activated. Pirates have been dealt with.' },
    { type: 'system', text: 'Loading core modules...' },
    { type: 'system', text: 'ALERT: Intelligence department caught copying Black Mesa technology' },
    { type: 'system', text: 'Scanning skill database...' },
    { type: 'system', text: 'Did somebody say ' },
    { type: 'item', text: 'Thunderfury, Blessed Blade of the Windseeker' },
    { type: 'system', text: '?!' },
    { type: 'system', text: 'System ready. Select language:' }
  ];

  const skipBoot = () => {
    setIsFading(true);
    containerRef.current?.classList.add('fade-out');
    
    setTimeout(() => {
      onLanguageSelect('en');
      onComplete();
    }, 1000);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape' && !isFading) {
        skipBoot();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFading]);

  useEffect(() => {
    let mounted = true;
    let timeoutId;
    
    const displayTextSequentially = (index) => {
      if (!mounted || index >= bootSequence.length) {
        if (mounted) {
          setShowLanguageSelect(true);
        }
        return;
      }
      
      setDisplayedLogs(logs => [...logs, bootSequence[index]]);
      
      if (Math.random() > 0.7) {
        setGlitchEffect(true);
        setTimeout(() => mounted && setGlitchEffect(false), 100);
      }
      
      setLoadingProgress(((index + 1) / bootSequence.length) * 100);
      
      timeoutId = setTimeout(() => {
        displayTextSequentially(index + 1);
      }, 450);
    };

    displayTextSequentially(0);
    
    return () => {
      mounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const handleLanguageSelect = (lang) => {
    setIsFading(true);
    const finalLogs = [
      ...displayedLogs,
      { 
        type: 'user-input', 
        text: `> SELECTED LANGUAGE: ${lang === 'en' ? 'ENGLISH' : 'FRANÇAIS'}`
      },
      { 
        type: 'system', 
        text: `Language set to ${lang === 'en' ? 'English' : 'Français'}. ACCESS GRANTED.`
      }
    ];
    
    setDisplayedLogs(finalLogs);
    containerRef.current?.classList.add('fade-out');
    
    setTimeout(() => {
      onLanguageSelect(lang);
      onComplete();
    }, 1000);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black z-0" />
      <div 
        ref={containerRef}
        className={`fixed inset-0 flex flex-col items-center justify-center p-6 transition-all duration-1000 z-10 ${glitchEffect ? 'glitch' : ''}`}
      >
        <CodeRain />
        
        <div className="max-w-4xl w-full h-full flex flex-col">
          <Header loadingProgress={loadingProgress} />
          
          <Terminal 
            ref={terminalRef}
            displayedLogs={displayedLogs}
            showLanguageSelect={showLanguageSelect}
            onLanguageSelect={handleLanguageSelect}
          />
          
          <Footer loadingProgress={loadingProgress} />
        </div>
        
        <style jsx>{`
          .glitch {
            animation: glitch 0.1s linear forwards;
          }
          
          @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
          }
          
          .fade-out {
            opacity: 0;
          }
          
          .fade-in {
            opacity: 1;
          }
          
          .transition-all {
            transition-property: all;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }
        `}</style>
      </div>
    </>
  );
};

export default BootScreen; 