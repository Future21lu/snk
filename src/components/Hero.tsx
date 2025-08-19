import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { personalInfo } from '../data/mockData';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        
        heroRef.current.style.transform = `perspective(1000px) rotateX(${y * 2}deg) rotateY(${x * 2}deg)`;
      }
    };

    const handleMouseLeave = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full animated-blob blur-3xl"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-red-600/20 rounded-full animated-blob blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-green-400/20 to-blue-600/20 rounded-full animated-blob blur-3xl"></div>
        
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute particle opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          >
            <div className="w-1 h-1 bg-black dark:bg-white rounded-full"></div>
          </div>
        ))}
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border border-black dark:border-white"></div>
            ))}
          </div>
        </div>
      </div>
      
      <div 
        ref={heroRef}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 transition-transform duration-300 ease-out"
      >
        <div className="space-y-8">
          <div className="space-y-6 reveal-animation visible">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-mono font-bold tracking-tight relative group">
              <span className="inline-block hover:shimmer-text transition-all duration-500 hover:scale-105 cursor-default">
                {personalInfo.name.split('').map((char, index) => (
                  <span
                    key={index}
                    className="inline-block hover:text-blue-500 transition-all duration-300 hover:scale-110 hover:-translate-y-2"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </h1>
            
            <div className="relative">
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-black dark:via-white to-transparent mx-auto reveal-animation visible stagger-2"></div>
              <div className="absolute inset-0 w-32 h-px bg-gradient-to-r from-blue-500 to-purple-500 mx-auto opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            <div className="space-y-4 reveal-animation visible stagger-3">
              <p className="text-xl sm:text-2xl font-mono text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                <span className="inline-block hover:text-blue-500 transition-colors duration-300">
                  {personalInfo.title}
                </span>
              </p>
              <p className="text-lg font-mono text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                <span className="inline-block hover:text-purple-500 transition-colors duration-300">
                  {personalInfo.subtitle}
                </span>
              </p>
            </div>
          </div>
          
          <div className="pt-32 reveal-animation visible stagger-4">
            <a
              href="#about"
              className="group inline-flex items-center space-x-3 font-mono text-sm border border-gray-200 dark:border-gray-800 px-8 py-4 modern-button magnetic-hover glass-morphism hover:border-blue-500/50 transition-all duration-500"
            >
              <span className="group-hover:text-blue-500 transition-colors duration-300">EXPLORE</span>
              <ChevronDown size={16} className="group-hover:animate-bounce group-hover:text-blue-500 transition-all duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-700 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-300 dark:bg-gray-700 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;