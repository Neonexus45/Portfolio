import React, { useState, useEffect } from 'react';
import { ChevronDown, MapPin, Briefcase, Mail, ExternalLink } from 'lucide-react';

// Components
import AnimatedBackground from './components/AnimatedBackground';
import Navigation from './components/Navigation';
import SkillUniverse from './components/SkillUniverse';
import ExperienceTimeline from './components/ExperienceTimeline';
import Education from './components/Education';
import Projects from './components/Projects';
import BootScreen from './components/BootScreen';

// Data
import content from './data/content';

/**
 * Main App component
 */
const App = () => {
  // State for active section and language
  const [activeSection, setActiveSection] = useState('home');
  const sections = ['home', 'skills', 'experience', 'education', 'projects', 'contact'];
  const [language, setLanguage] = useState('en');
  const [booting, setBooting] = useState(true);
  const [showPortfolio, setShowPortfolio] = useState(false);
  
  const handleBootComplete = () => {
    setBooting(false);
    setTimeout(() => {
      setShowPortfolio(true);
    }, 100);
  };
  
  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
  };
  
  // Function to scroll to a section
  const scrollToSection = (section) => {
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
    setActiveSection(section);
  };
  
  // Effect to update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Get correct text content for current language
  const text = content[language];

  return (
    <div className="relative min-h-screen bg-black">
      {booting && (
        <BootScreen 
          onComplete={handleBootComplete} 
          onLanguageSelect={handleLanguageSelect} 
        />
      )}
      {!booting && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${showPortfolio ? 'opacity-100' : 'opacity-0'}`}>
          <div className="relative min-h-screen font-sans text-gray-300 overflow-x-hidden bg-gray-950">
            <AnimatedBackground />
            
            <Navigation 
              activeSection={activeSection} 
              scrollToSection={scrollToSection} 
              language={language} 
              setLanguage={setLanguage} 
              sections={sections} 
            />
            
            {/* Hero Section */}
            <section id="home" className="min-h-screen flex items-center justify-center pt-24 pb-12">
              <div className="container mx-auto px-4 flex flex-col items-center text-center">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-600 to-blue-800 shadow-xl overflow-hidden mb-6">
                  {/* Profile image placeholder */}
                  <div className="w-full h-full flex items-center justify-center text-white text-6xl font-bold">
                    ET
                  </div>
                </div>
                
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                  {text.hero.title}
                </h1>
                
                <div className="text-xl text-gray-400 mb-8">
                  <div className="flex items-center justify-center mb-2">
                    <Briefcase className="mr-2" size={18} />
                    <span>{text.hero.role}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-wrap justify-center gap-2">
                      {text.hero.location.map((loc, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                          {loc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="max-w-2xl text-lg text-gray-300 mb-8">
                  {text.hero.bio}
                </p>
                
                <button 
                  className="bg-purple-700 hover:bg-purple-600 text-white font-medium py-3 px-8 rounded-full shadow-lg flex items-center transition-all duration-300 hover:shadow-xl"
                  onClick={() => scrollToSection('skills')}
                >
                  {text.hero.cta}
                  <ChevronDown className="ml-2" />
                </button>
              </div>
            </section>
            
            {/* Skills Section */}
            <section id="skills" className="py-20 bg-gray-900">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-purple-400">{text.sections.skills}</h2>
                <SkillUniverse language={language} />
              </div>
            </section>
            
            {/* Experience Section */}
            <section id="experience" className="py-20">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-purple-400">{text.sections.experience}</h2>
                <ExperienceTimeline language={language} />
              </div>
            </section>
            
            {/* Education Section */}
            <section id="education" className="py-20 bg-gray-900">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-purple-400">{text.sections.education}</h2>
                <Education language={language} />
              </div>
            </section>
            
            {/* Projects Section */}
            <section id="projects" className="py-20">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-purple-400">{text.sections.projects}</h2>
                <Projects language={language} />
              </div>
            </section>
            
            {/* Contact Section */}
            <section id="contact" className="py-20 bg-gradient-to-br from-purple-900 to-blue-900 text-white">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8">{text.sections.contact}</h2>
                <p className="mb-8 max-w-2xl mx-auto text-lg">
                  {text.contact.intro}
                </p>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
                  <a href="mailto:ethan.tomaso@gmail.com" className="bg-gray-900 text-purple-300 py-3 px-6 rounded-lg flex items-center hover:bg-gray-800 transition-colors duration-300 shadow-lg">
                    <Mail className="mr-2" />
                    ethan.tomaso@gmail.com
                  </a>
                  <a href="tel:+33768060161" className="bg-gray-900 text-purple-300 py-3 px-6 rounded-lg flex items-center hover:bg-gray-800 transition-colors duration-300 shadow-lg">
                    <ExternalLink className="mr-2" />
                    07.68.06.01.61
                  </a>
                </div>
              </div>
            </section>
            
            {/* Footer */}
            <footer className="bg-gray-950 text-gray-500 py-6">
              <div className="container mx-auto px-4 text-center">
                <p>&copy; {new Date().getFullYear()} Ethan Tomaso. {text.footer.rights}</p>
              </div>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
