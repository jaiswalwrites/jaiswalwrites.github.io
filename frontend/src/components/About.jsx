import React, { useRef, useEffect, useState } from 'react';
import { about } from '../data/mock';
import { Terminal, Shield, Cpu, Code2, Zap, CheckCircle2, Award, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import VisualPipelineBuilder from './VisualPipelineBuilder';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState(about.stats.map(() => 0));
  const [terminalLineIndex, setTerminalLineIndex] = useState(0);
  const sectionRef = useRef(null);

  const terminalCommands = [
    { cmd: "$ npx ai-docs-sync --spec=openapi.v3.json", output: "✓ Parsed 42 API endpoints successfully." },
    { cmd: "$ vale lint ./docs/architecture/*.md", output: "✓ 0 style violations found (Microsoft Style Guide)." },
    { cmd: "$ python -m rag_sync.vector_db --update", output: "✓ Embedded 128 chunks into Vector Search Index." },
    { cmd: "$ git commit -m 'docs(ai): automated context refresh'", output: "✓ Pipeline complete. Deploying to production docs portal..." }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setTerminalLineIndex(prev => (prev + 1) % terminalCommands.length);
    }, 3500);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const animateCounters = () => {
    about.stats.forEach((stat, index) => {
      const target = stat.value;
      const duration = 2000;
      const steps = 50;
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

  const coreSkills = [
    { name: 'LLM Architecture Docs', category: 'AI' },
    { name: 'RAG & Vector Search', category: 'AI' },
    { name: 'Docs-as-Code Pipelines', category: 'DevOps' },
    { name: 'Vale Style Linters', category: 'Automation' },
    { name: 'OpenAPI 3.0 & Swagger', category: 'API' },
    { name: 'Developer Portals (DX)', category: 'DX' },
    { name: 'CI/CD Automation', category: 'DevOps' },
    { name: 'Semantic Context Sync', category: 'AI' },
  ];

  const enterpriseTrust = [
    { name: 'Harness.io', role: 'Lead Technical Writer', color: '#00f0ff' },
    { name: 'McAfee', role: 'Senior API Architect', color: '#ff003c' },
    { name: 'Safe Security', role: 'Docs Infrastructure Lead', color: '#a855f7' }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-32 relative overflow-hidden bg-black font-sans border-t border-white/5">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#00f0ff]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left max-w-7xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-[#00f0ff] uppercase font-mono">✦ About The Architect</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mt-3 mb-4">Engineering Meets Documentation</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00f0ff] to-[#ff003c] mx-auto md:mx-0 mb-4" />
          <p className="text-xl text-white/50 font-light max-w-2xl mx-auto md:mx-0">
            Bridging machine learning systems, automated Docs-as-Code pipelines, and developer experience.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
          
          {/* TILE 1: Biography & Enterprise Trust (Spans 7 cols on LG) */}
          <div className="lg:col-span-7 glass-panel p-8 md:p-10 flex flex-col justify-between border-white/10 hover:border-[#00f0ff]/30 transition-all duration-500 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#00f0ff]/10 to-transparent rounded-bl-full pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 mb-6">
                <Shield className="w-5 h-5 text-[#00f0ff]" />
                <span className="text-xs font-bold font-mono tracking-widest text-white/50 uppercase">Background & Mission</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-6 leading-snug">
                10+ years engineering scalable documentation ecosystems for hyper-growth AI startups & cybersecurity giants.
              </h3>

              <p className="text-white/70 text-base md:text-lg leading-relaxed font-light mb-6">
                {about.description}
              </p>

              <p className="text-white/60 text-sm md:text-base leading-relaxed font-light mb-8">
                I specialize in turning complex AI models, high-frequency APIs, and distributed architectures into streamlined, 
                interactive developer portals with automated linting, vector search, and custom prompt workflows.
              </p>
            </div>

            {/* Enterprise Logos */}
            <div className="pt-6 border-t border-white/10">
              <span className="text-[11px] font-mono uppercase tracking-widest text-white/40 mb-4 block">Trusted Leadership at:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {enterpriseTrust.map((company, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 transition-all">
                    <div className="text-white font-bold text-sm" style={{ color: company.color }}>{company.name}</div>
                    <div className="text-[11px] text-white/50 font-mono mt-0.5">{company.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TILE 2: Animated Stats Counter (Spans 5 cols on LG) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {about.stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 120 }}
                whileHover={{ y: -6, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="glass-panel p-6 flex flex-col justify-between border-white/10 hover:border-[#00f0ff]/50 transition-all duration-500 group relative overflow-hidden cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(0,240,255,0.25)]"
              >
                {/* Animated Radial Ambient Glow on Hover */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#00f0ff]/10 rounded-full blur-2xl group-hover:bg-[#00f0ff]/30 group-hover:scale-150 transition-all duration-700 pointer-events-none" />
                
                {/* Subtle Neon Line Sweep */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

                <div className="flex items-center justify-between mb-4 z-10">
                  <span className="text-xs font-mono text-white/40 group-hover:text-[#00f0ff] transition-colors">0{index + 1}</span>
                  <motion.div
                    whileHover={{ rotate: 180, scale: 1.2 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Zap className="w-4 h-4 text-[#00f0ff] opacity-60 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
                  </motion.div>
                </div>

                <div className="z-10">
                  <motion.div 
                    className="text-4xl md:text-5xl font-black text-white mb-2 bg-gradient-to-r from-[#00f0ff] via-purple-300 to-purple-400 bg-clip-text text-transparent drop-shadow-sm"
                    animate={isVisible ? { scale: [1, 1.08, 1] } : {}}
                    transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                  >
                    {isVisible ? counters[index] : '0'}+
                  </motion.div>
                  <div className="text-white/60 text-xs md:text-sm font-medium tracking-tight group-hover:text-white/90 transition-colors">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* TILE 3: Real-Time Visual Solution Architecture Builder (Spans 6 cols on LG) */}
          <div className="lg:col-span-6">
            <VisualPipelineBuilder />
          </div>

          {/* TILE 4: Core Expertise Cyber Matrix (Spans 6 cols on LG) */}
          <div className="lg:col-span-6 glass-panel p-6 md:p-8 border-white/10 hover:border-purple-500/30 transition-all duration-500 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Cpu className="w-5 h-5 text-purple-400" />
                <span className="text-xs font-bold font-mono tracking-widest text-white/50 uppercase">Core Architectural Pillars</span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {coreSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/40 text-white/80 hover:text-white transition-all duration-300 font-mono text-xs cursor-default flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:scale-125 transition-transform" />
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
              <span className="font-sans text-white/60">Designed for Enterprise AI & Developer Ecosystems</span>
              <a href="#projects" className="text-purple-400 hover:text-purple-300 font-mono text-xs flex items-center gap-1">
                Explore Work <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;