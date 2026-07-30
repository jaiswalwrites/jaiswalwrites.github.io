import React, { useEffect, useState } from 'react';
import { personalInfo, about } from '../data/mock';
import { Github, Linkedin, Mail, FileText, ArrowDown, Terminal } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import AnimeBackground from './AnimeBackground';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 10 }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] pt-20 font-sans">
      <AnimeBackground />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <motion.div 
          className="grid lg:grid-cols-5 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Content - Left Side */}
          <div className="lg:col-span-3 text-center lg:text-left space-y-8 order-2 lg:order-1">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#00f0ff]/30 bg-[#00f0ff]/5 backdrop-blur-md rounded-sm mb-6 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
                <Terminal className="w-4 h-4 text-[#00f0ff]" />
                <p className="text-xs font-mono font-bold tracking-widest text-[#00f0ff] uppercase">
                  Sys.Init({personalInfo.tagline})
                </p>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 leading-none">
                {personalInfo.name.split(' ')[0]}<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#ff003c]">
                  {personalInfo.name.split(' ')[1] || 'Engineered'}
                </span>
              </h1>
              
              <div className="flex flex-wrap items-center gap-2 mb-8 justify-center lg:justify-start">
                <span className="px-4 py-1.5 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/40 text-[#00f0ff] font-mono text-xs sm:text-sm font-bold tracking-wider uppercase">
                  Senior Technical Writer
                </span>
                <span className="px-4 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/40 text-purple-300 font-mono text-xs sm:text-sm font-bold tracking-wider uppercase">
                  Docs Strategist
                </span>
                <span className="px-4 py-1.5 rounded-lg bg-[#ff003c]/10 border border-[#ff003c]/40 text-[#ff003c] font-mono text-xs sm:text-sm font-bold tracking-wider uppercase">
                  Writer Who Codes
                </span>
              </div>

              <p className="text-lg text-white/50 leading-relaxed max-w-2xl font-light">
                {about.description.split('.')[0]}. {about.description.split('.')[1]}.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start pt-6">
              <a 
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#00f0ff] text-black hover:bg-[#00f0ff]/80 font-bold tracking-widest px-8 py-4 text-xs uppercase shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all relative overflow-hidden group font-mono"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Download Resume
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </a>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent text-white hover:bg-white/5 border border-white/20 font-mono tracking-widest px-8 py-6 rounded-none text-xs uppercase transition-all"
                onClick={() => scrollToSection('contact')}
              >
                Contact
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-4 justify-center lg:justify-start pt-8">
              {[
                { icon: Github, link: personalInfo.github },
                { icon: Linkedin, link: personalInfo.linkedin },
                { icon: Mail, link: `mailto:${personalInfo.email}` },
                { icon: FileText, link: personalInfo.resumeUrl }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 border border-white/10 hover:border-[#00f0ff]/50 bg-black/50 hover:bg-[#00f0ff]/10 text-white/50 hover:text-[#00f0ff] transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Profile Image - Circular Avatar (Shifted Upwards) with Illumination Light & Rotating Fast JSON API Text Ring */}
          <motion.div variants={itemVariants} className="lg:col-span-2 flex justify-center items-start lg:-mt-12 order-1 lg:order-2">
            <div className="relative group w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center">
              
              {/* High-Impact Neon Illumination Background Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#00f0ff] via-purple-500 to-[#ff003c] rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 animate-pulse pointer-events-none" />
              
              {/* Rotating Neon Ring Accent */}
              <div className="absolute -inset-1 rounded-full border border-[#00f0ff]/40 group-hover:border-[#00f0ff] transition-colors pointer-events-none" />

              {/* Fast Rotating SVG JSON API Text Ring */}
              <div className="absolute -inset-6 pointer-events-none z-20">
                <svg viewBox="0 0 300 300" className="w-full h-full" style={{ animation: 'spin 10s linear infinite' }}>
                  <path
                    id="jsonTextPath"
                    d="M 150, 150 m -135, 0 a 135,135 0 1,1 270,0 a 135,135 0 1,1 -270,0"
                    fill="none"
                  />
                  <text className="text-[11px] font-mono fill-[#00f0ff] tracking-widest font-bold drop-shadow-[0_0_10px_rgba(0,240,255,0.9)] uppercase">
                    <textPath href="#jsonTextPath" startOffset="0%">
                      {"{\"architect\":\"Manish Jaiswal\",\"role\":\"Docs Strategist & Writer Who Codes\",\"skills\":[\"Git\",\"K8s\",\"FastAPI\"]} ✦ "}
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Inner Circular Avatar Image (Reduced by 1/3rd) */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full border-4 border-[#00f0ff]/50 group-hover:border-[#00f0ff] overflow-hidden shadow-[0_0_40px_rgba(0,240,255,0.4)] transition-all duration-500 transform group-hover:scale-[1.03]">
                <img
                  src={personalInfo.image}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent opacity-50" />
              </div>

            </div>
          </motion.div>

        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ArrowDown className="w-6 h-6 text-[#00f0ff]/50" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;