import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Bot, ArrowRight, MessageSquare, Calculator } from 'lucide-react';

function Hero() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div 
        ref={ref}
        className={`max-w-7xl mx-auto text-center transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <div className="absolute -inset-1 bg-white/20 rounded-full blur-md"></div>
            <Bot className="h-20 w-20 text-white relative" />
          </div>
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-bold text-white mb-2">
          ODA
        </h1>
        <h3 className="text-xl sm:text-2xl font-medium text-gray-300 mb-8">
          On-Demand-Agentcy
        </h3>
        
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Redefine Agency Excellence: Convert Traditional Teams into Agentic AI-Powered Superteams - Delivering Premium Results at 70% Lower Costs and Time Investment and 21% Revenue Generation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => scrollToSection('beta')}
            className="flex items-center px-8 py-4 border border-white text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            Request a demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button 
            onClick={() => scrollToSection('agentchat')}
            className="flex items-center px-8 py-4 border border-white text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            Chat with AI Agent
            <MessageSquare className="ml-2 h-5 w-5" />
          </button>
          <button 
            onClick={() => scrollToSection('calculator')}
            className="flex items-center px-8 py-4 border border-white text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            Calculate the impact
            <Calculator className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
