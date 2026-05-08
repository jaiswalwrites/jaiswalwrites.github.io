import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/mock';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Work', href: '#work' },
    { name: 'Skills', href: '#skills' },
    { name: 'Neurals', href: '#neurals' },
    { name: 'Newsletter', href: '#newsletter' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center w-full px-4 transition-all duration-500">
      <nav className={`transition-all duration-500 ease-out flex items-center justify-between px-6 w-full max-w-5xl mx-auto ${
        isScrolled ? 'glass-pill py-3' : 'bg-transparent py-4'
      }`}>
        {/* Logo */}
        <a
          href="#"
          className="text-2xl font-semibold tracking-tighter text-white hover:text-white/80 transition-colors duration-300"
        >
          {personalInfo.name.split(' ').map(n => n[0]).join('')}
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-white/70 hover:text-white transition-colors duration-300 font-medium tracking-tight text-sm relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/50 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <Button
            onClick={(e) => handleNavClick(e, '#contact')}
            className="glass-pill border border-white/20 bg-white/10 hover:bg-white/20 text-white font-medium tracking-tight px-6 h-9"
          >
            Contact
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 md:hidden glass-panel py-4 px-4 animate-fade-in origin-top">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-white/80 hover:text-white transition-colors duration-300 font-medium py-2 px-2 rounded-lg hover:bg-white/5"
              >
                {link.name}
              </a>
            ))}
            <Button
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full mt-2 glass-pill bg-white/10 hover:bg-white/20 text-white font-medium py-3 border border-white/20"
            >
              Contact
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;