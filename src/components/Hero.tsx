import React from 'react';
import { ChevronDown } from 'lucide-react';
import { personalInfo } from '../data/mockData';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-10 relative overflow-hidden">
      {/* Subtle background animation */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-black dark:bg-white rounded-full animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-black dark:bg-white rounded-full animate-float animate-delay-200"></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-black dark:bg-white rounded-full animate-float animate-delay-400"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4 animate-slide-up">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-mono font-bold tracking-tight hover:scale-105 transition-transform duration-300">
              {personalInfo.name}
            </h1>
            <div className="w-24 h-px bg-black dark:bg-white mx-auto animate-scale-in animate-delay-300"></div>
            <p className="text-lg sm:text-xl font-mono text-gray-500 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed animate-slide-up animate-delay-200">
              {personalInfo.title}<br />
              {personalInfo.subtitle}
            </p>
          </div>
          <div className="pt-48 animate-slide-up animate-delay-500">
            <a
              href="#about"
              className="inline-flex items-center space-x-2 font-mono text-sm border border-gray-200 dark:border-gray-800 px-6 py-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              <span>SCROLL</span>
              <ChevronDown size={16} className="group-hover:animate-bounce" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;