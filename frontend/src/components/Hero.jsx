import React, { useEffect, useState } from 'react';
import { personalInfo, about } from '../data/mock';
import { Github, Linkedin, Mail, FileText, ArrowDown } from 'lucide-react';
import { Button } from './ui/button';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
      {/* Animated Mesh Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-[128px] opacity-40 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-[128px] opacity-40 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-screen filter blur-[128px] opacity-40 animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          
          {/* Content - Left Side */}
          <div className="md:col-span-3 text-center md:text-left space-y-8 order-2 md:order-1">
            <div className="animate-fade-in">
              <div className="inline-block px-4 py-1.5 glass-pill mb-6">
                <p className="text-sm font-medium tracking-tight text-white/80 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  &lt;{personalInfo.tagline}/&gt;
                </p>
              </div>
              <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-6 leading-tight text-glow">
                {personalInfo.name}
              </h1>
              
              <div className="space-y-3 mb-8">
                <p className="text-xl md:text-3xl text-white/90 font-medium tracking-tight">
                  {personalInfo.title}
                </p>
              </div>

              <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl font-light">
                Helping organizations build scalable, AI-driven documentation ecosystems.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4 animate-fade-in-delay-1">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-white/90 font-medium tracking-tight px-8 py-6 rounded-full text-base shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all"
                onClick={() => scrollToSection('projects')}
              >
                Explore AI Repositories
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="glass-pill text-white hover:bg-white/10 border-white/20 font-medium tracking-tight px-8 py-6 text-base"
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch
              </Button>
            </div>

            {/* Signature Showcases */}
            <div className="pt-6 space-y-3 text-left max-w-xl mx-auto md:mx-0 animate-fade-in-delay-2">
              <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase">★ Active AI & Developer Showcases</span>
              <div className="grid grid-cols-3 gap-3">
                <a
                  href="https://jaiswalwrites.github.io/docusaurus-portfolio-site/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl glass-panel hover:bg-white/5 transition-all duration-300 border-cyan-500/20 group/item flex flex-col justify-between h-[105px]"
                >
                  <span className="text-xl">🦕</span>
                  <div>
                    <h4 className="text-xs font-semibold text-white group-hover/item:text-cyan-400 transition-colors">NeuralDocs</h4>
                    <p className="text-[9px] text-white/50">Docusaurus Portal</p>
                  </div>
                </a>
                <a
                  href="https://jaiswalwrites.github.io/ai-doc-workflow/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl glass-panel hover:bg-white/5 transition-all duration-300 border-purple-500/20 group/item flex flex-col justify-between h-[105px]"
                >
                  <span className="text-xl">⚡</span>
                  <div>
                    <h4 className="text-xs font-semibold text-white group-hover/item:text-purple-400 transition-colors">AI Workflow</h4>
                    <p className="text-[9px] text-white/50">Interactive Process</p>
                  </div>
                </a>
                <a
                  href="https://jaiswalwrites.github.io/openapi-docs-generator/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl glass-panel hover:bg-white/5 transition-all duration-300 border-indigo-500/20 group/item flex flex-col justify-between h-[105px]"
                >
                  <span className="text-xl">📄</span>
                  <div>
                    <h4 className="text-xs font-semibold text-white group-hover/item:text-indigo-400 transition-colors">OpenAPI Spec</h4>
                    <p className="text-[9px] text-white/50">Redoc API Ref</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center md:justify-start pt-4 animate-fade-in-delay-2">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-3 glass-pill hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300">
                <Github className="w-5 h-5" />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 glass-pill hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={`mailto:${personalInfo.email}`} className="p-3 glass-pill hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300">
                <Mail className="w-5 h-5" />
              </a>
              <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer" className="p-3 glass-pill hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300">
                <FileText className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Profile Image - Right Side */}
          <div className="md:col-span-2 flex justify-center order-1 md:order-2 animate-fade-in-delay-1">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-blob"></div>
              <div className="relative glass-panel p-2 w-72 h-96 md:w-80 md:h-[420px] rounded-[2rem] transform group-hover:-translate-y-2 transition-all duration-500">
                <img
                  src={personalInfo.image}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover rounded-[1.5rem] opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce animate-fade-in-delay-3">
          <ArrowDown className="w-6 h-6 text-white/30" />
        </div>
      </div>
    </section>
  );
};

export default Hero;