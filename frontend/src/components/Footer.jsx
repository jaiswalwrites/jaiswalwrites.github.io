import React from 'react';
import { personalInfo } from '../data/mock';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 py-16 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-semibold tracking-tighter text-white mb-3">
              {personalInfo.name}
            </h3>
            <p className="text-white/60 text-sm font-light leading-relaxed max-w-sm">
              {personalInfo.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium tracking-tight mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-white/60 hover:text-cyan-400 transition-colors font-light text-sm">
                  About
                </a>
              </li>
              <li>
                <a href="#experience" className="text-white/60 hover:text-cyan-400 transition-colors font-light text-sm">
                  Experience
                </a>
              </li>
              <li>
                <a href="#work" className="text-white/60 hover:text-cyan-400 transition-colors font-light text-sm">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#skills" className="text-white/60 hover:text-cyan-400 transition-colors font-light text-sm">
                  Skills
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/60 hover:text-cyan-400 transition-colors font-light text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-medium tracking-tight mb-6">Connect</h4>
            <div className="flex gap-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 text-white/60 hover:text-cyan-400 transition-all duration-300"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-purple-400/50 hover:bg-white/10 text-white/60 hover:text-purple-400 transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-blue-400/50 hover:bg-white/10 text-white/60 hover:text-blue-400 transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-white/40 text-sm font-light">
              © {currentYear} {personalInfo.name}. All rights reserved.
            </p>
          </div>
          <div className="text-center md:text-right">
             <p className="text-white/40 text-sm font-light">
              Built with React & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;