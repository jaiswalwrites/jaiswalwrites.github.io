import React, { useRef, useEffect, useState } from 'react';
import { neurals } from '../data/mock';
import { Card } from './ui/card';
import { ExternalLink, Check } from 'lucide-react';
import { Button } from './ui/button';

const Neurals = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="neurals" ref={sectionRef} className="py-32 relative overflow-hidden bg-black">
      {/* Subtle background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[128px] animate-blob" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-20">
          <div className="mb-8">
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter text-white mb-6">Neurals.in</h2>
            <div className="w-24 h-px bg-gradient-to-r from-cyan-400 to-purple-400 mb-4" />
          </div>
          <p className="text-xl text-cyan-400 font-medium tracking-tight mb-4">{neurals.tagline}</p>
          <p className="text-2xl md:text-3xl text-white/90 font-light leading-relaxed max-w-4xl">
            {neurals.description}
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {neurals.highlights.map((highlight, index) => (
            <div 
              key={index}
              className={`glass-panel p-8 hover:bg-white/5 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <div className="w-6 h-6 border border-cyan-400/50 rounded-full flex items-center justify-center bg-cyan-400/10">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                </div>
                <p className="text-white/80 leading-relaxed font-light">{highlight}</p>
              </div>
            </div>
          ))}
        </div>

        {/* AI Agents */}
        <div className="mb-20">
          <h3 className="text-3xl font-semibold tracking-tighter text-white mb-10">AI Agents Ecosystem</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {neurals.agents.map((agent, index) => (
              <div
                key={index}
                className={`glass-panel p-8 hover:-translate-y-1 hover:bg-white/5 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <h4 className="text-2xl font-medium tracking-tight text-white mb-2">{agent.name}</h4>
                <p className="text-purple-400 font-medium tracking-tight text-sm mb-4 glass-pill inline-block px-3 py-1 bg-purple-500/10 border-purple-500/20">{agent.role}</p>
                <p className="text-white/60 text-sm leading-relaxed font-light">{agent.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-white/90 font-medium tracking-tight px-10 py-7 rounded-full text-lg shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all group inline-flex items-center"
            onClick={() => window.open(neurals.website, '_blank')}
          >
            Visit Neurals.in
            <ExternalLink className="ml-3 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Neurals;