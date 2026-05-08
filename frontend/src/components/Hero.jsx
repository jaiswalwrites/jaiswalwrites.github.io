import React, { useEffect, useState } from 'react';
import { personalInfo, about } from '../data/mock';
import { Github, Linkedin, Mail, FileText, ArrowDown } from 'lucide-react';
import { Button } from './ui/button';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 10 - 5,
        y: (e.clientY / window.innerHeight) * 10 - 5,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Subtle background gradient */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-slate-400/5 rounded-full blur-3xl"
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          {/* Profile Image - Left Side */}
          <div className="md:col-span-2 flex justify-center md:justify-end">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-slate-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-72 h-96 md:w-80 md:h-[420px] overflow-hidden border-2 border-slate-800 shadow-2xl">
                <img
                  src={personalInfo.image}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Content - Right Side */}
          <div className="md:col-span-3 text-center md:text-left space-y-6">
            {/* Name */}
            <div>
              <h1 className="text-5xl md:text-7xl font-light text-white mb-3 tracking-tight">
                {personalInfo.name}
              </h1>
              <div className="w-24 h-px bg-gradient-to-r from-amber-500 to-transparent" />
            </div>

            {/* Roles */}
            <div className="space-y-2">
              <p className="text-xl md:text-2xl text-amber-500 font-light">
                {personalInfo.title}
              </p>
            </div>

            {/* Tagline */}
            <p className="text-2xl font-mono text-slate-500 font-light">
              &lt;{personalInfo.tagline}/&gt;
            </p>

            {/* Description */}
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
              {about.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
              <Button 
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-medium px-8 py-6 text-base"
                onClick={() => scrollToSection('work')}
              >
                Build Scalable Doc Systems
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600 font-medium px-8 py-6 text-base"
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center md:justify-start pt-4">
              <a 
                href={personalInfo.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 border border-slate-800 rounded-lg hover:border-amber-500/50 hover:bg-slate-900 text-slate-400 hover:text-amber-500 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href={personalInfo.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 border border-slate-800 rounded-lg hover:border-amber-500/50 hover:bg-slate-900 text-slate-400 hover:text-amber-500 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href={`mailto:${personalInfo.email}`}
                className="p-3 border border-slate-800 rounded-lg hover:border-amber-500/50 hover:bg-slate-900 text-slate-400 hover:text-amber-500 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href={personalInfo.resumeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 border border-slate-800 rounded-lg hover:border-amber-500/50 hover:bg-slate-900 text-slate-400 hover:text-amber-500 transition-all duration-300"
              >
                <FileText className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-slate-600" />
        </div>
      </div>
    </section>
  );
};

export default Hero;