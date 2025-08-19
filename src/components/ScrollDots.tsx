import React, { useState, useEffect } from 'react';
import { navigationSections } from '../data/mockData';

const sections = navigationSections;

const ScrollDots: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40">
      {/* Progress bar */}
      <div className="absolute -left-8 top-0 w-1 h-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="w-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full transition-all duration-300"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      <div className="flex flex-col space-y-4">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative flex items-center transition-all duration-500 hover:scale-125 magnetic-hover"
            aria-label={`Go to ${section.label}`}
          >
            <div
              className={`w-4 h-4 rounded-full transition-all duration-500 relative overflow-hidden ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125 shadow-lg glow-on-hover'
                  : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
              }`}
            >
              {activeSection === section.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse rounded-full"></div>
              )}
            </div>
            
            {/* Enhanced tooltip */}
            <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-x-2 group-hover:translate-x-0">
              <div className="glass-morphism px-4 py-2 text-sm font-mono whitespace-nowrap rounded-xl shadow-xl border border-white/20">
                <span className="gradient-text font-bold">{section.label}</span>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1">
                  <div className="w-2 h-2 bg-white dark:bg-gray-800 rotate-45"></div>
                </div>
              </div>
            </div>

            {/* Connection line */}
            <div className={`absolute left-1/2 top-full w-px transition-all duration-300 ${
              index < sections.length - 1 ? 'h-4 bg-gray-300 dark:bg-gray-700' : 'h-0'
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScrollDots;