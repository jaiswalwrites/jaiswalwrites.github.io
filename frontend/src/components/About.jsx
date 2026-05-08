import React, { useRef, useEffect, useState } from 'react';
import { about } from '../data/mock';
import { Card } from './ui/card';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState(about.stats.map(() => 0));
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateCounters = () => {
    about.stats.forEach((stat, index) => {
      const target = stat.value;
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounters(prev => {
          const newCounters = [...prev];
          newCounters[index] = Math.floor(current);
          return newCounters;
        });
      }, duration / steps);
    });
  };

  return (
    <section id="about" ref={sectionRef} className="py-32 relative overflow-hidden bg-black">
      {/* Subtle background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] animate-blob animation-delay-2000" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px] animate-blob" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-4">About Me</h2>
          <div className="w-24 h-px bg-gradient-to-r from-cyan-400 to-purple-400" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start mb-20">
          {/* Description */}
          <div className={`space-y-6 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <p className="text-xl text-white/90 leading-relaxed font-light">
              {about.description}
            </p>
            <p className="text-lg text-white/60 leading-relaxed font-light">
              With <span className="text-white font-medium">10+ years of experience</span>, I've engineered documentation architectures for 
              industry leaders like <span className="text-white font-medium">Harness.io</span>, <span className="text-white font-medium">McAfee</span>, and emerging AI 
              startups like <span className="text-white font-medium">Neurals.in</span>.
            </p>
            <p className="text-lg text-white/60 leading-relaxed font-light">
              I'm passionate about <span className="text-white font-medium">docs-as-code</span>, <span className="text-white font-medium">AI Agents</span>, 
              and bridging the gap between sophisticated ML engineering and developer experience.
            </p>
          </div>

          {/* Stats Grid */}
          <div className={`grid grid-cols-2 gap-6 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            {about.stats.map((stat, index) => (
              <div 
                key={index} 
                className="glass-panel p-6 hover:bg-white/5 transition-all duration-500"
              >
                <div className="text-center">
                  <div className="text-5xl font-light text-white mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {isVisible ? counters[index] : '0'}+
                  </div>
                  <div className="text-white/60 text-sm font-medium tracking-tight">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expertise Tags */}
        <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-2xl font-semibold tracking-tighter text-white mb-8">Core Expertise</h3>
          <div className="flex flex-wrap gap-3">
            {[
              'LLM Architecture Docs',
              'AI Agent Frameworks',
              'RAG Pipelines',
              'Docs-as-Code Strategy',
              'Developer Experience (DX)',
              'API/SDK Documentation',
              'Vector Databases',
              'Cloud Automation',
            ].map((skill, index) => (
              <span
                key={index}
                className="px-6 py-2 glass-pill text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium tracking-tight text-sm cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;