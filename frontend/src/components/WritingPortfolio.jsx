import React, { useRef, useEffect, useState } from 'react';
import { writingSamples } from '../data/mock';
import { Card } from './ui/card';
import { ExternalLink, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import useNetflixCarousel from '../hooks/useNetflixCarousel';

const PortfolioCard = ({ sample, isVisible, index, itemRef }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      ref={itemRef}
      className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className={`group h-full glass-panel hover:bg-white/5 transition-all duration-500 overflow-hidden flex flex-col ${sample.featured ? 'border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.05)] hover:border-cyan-400/40' : ''}`}>
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
          <img
            src={sample.image}
            alt={sample.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40 opacity-90 z-20" />
          
          {/* Category & Featured badges */}
          <div className="absolute top-4 left-4 right-4 z-30 flex justify-between items-center">
            <span className="px-3 py-1.5 glass-pill bg-black/50 border-white/10 text-white font-medium tracking-tight text-xs backdrop-blur-md">
              {sample.category}
            </span>
            {sample.featured && (
              <span className="px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold tracking-tight text-[10px] uppercase backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                ★ Signature Showcase
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col flex-1 relative z-30 -mt-16 bg-gradient-to-b from-transparent via-black/80 to-black">
          {/* Company */}
          <div className="flex items-center gap-2 mb-3 pt-12">
            {sample.logo && (
              <img 
                src={sample.logo} 
                alt={`${sample.company} logo`} 
                className="w-6 h-6 object-contain bg-white rounded p-0.5"
                onError={(e) => { e.target.style.display = 'none' }}
              />
            )}
            <p className="text-cyan-400 text-sm font-medium tracking-tight drop-shadow-md">{sample.company}</p>
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-semibold tracking-tighter text-white mb-4 group-hover:text-purple-400 transition-colors duration-300 drop-shadow-md">
            {sample.title}
          </h3>
          
          {/* Description */}
          <p className="text-white/60 text-sm leading-relaxed mb-6 font-light">
            {sample.description}
          </p>

          {/* Expandable Case Study */}
          {sample.caseStudy && (
            <div className="mb-6 mt-auto">
              <button 
                onClick={() => setExpanded(!expanded)} 
                className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-widest"
              >
                {expanded ? 'Hide Strategy & Details' : 'Read Case Study'}
                {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              {expanded && (
                <div className="mt-4 space-y-3 text-[12px] leading-relaxed text-white/70 font-light border-l-2 border-cyan-500/30 pl-4 py-1">
                  <p><strong className="text-white">Architecture:</strong> {sample.caseStudy.architecture}</p>
                  <p><strong className="text-white">Philosophy:</strong> {sample.caseStudy.philosophy}</p>
                  <p><strong className="text-white">Personas:</strong> {sample.caseStudy.personas}</p>
                  <div className="mt-2">
                    <strong className="text-white">Key Achievements:</strong>
                    <ul className="list-disc pl-4 mt-1 space-y-1">
                      {sample.caseStudy.achievements.map((ach, idx) => (
                        <li key={idx}>{ach}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Link button */}
          {sample.link !== '#' && (
            <div className={`pt-6 border-t border-white/10 ${!sample.caseStudy ? 'mt-auto' : ''}`}>
              <a
                href={sample.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-cyan-400 font-medium tracking-tight text-sm group/link transition-colors"
              >
                View Documentation
                <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getLoopingItems = (items) => {
  if (!items || items.length === 0) return [];
  const repeatCount = items.length >= 8 ? 1 : Math.ceil(10 / items.length);
  const result = [];
  for (let r = 0; r < repeatCount; r++) {
    items.forEach((item, idx) => {
      result.push({
        ...item,
        _uniqueKey: `${item.id || idx}-${r}`,
      });
    });
  }
  return result;
};

const WritingPortfolio = () => {
  const sectionRef = useRef(null);
  const [filter, setFilter] = useState('All');
  const [visibleItems, setVisibleItems] = useState([]);
  const itemRefs = useRef([]);
  const { emblaRef, selectedIndex, pause, resume, scrollTo, reInit, getDistance } = useNetflixCarousel();

  const categories = ['All', ...new Set(writingSamples.map(s => s.category))];

  const filteredSamples = filter === 'All' 
    ? writingSamples 
    : writingSamples.filter(sample => sample.category === filter);

  const loopingSamples = getLoopingItems(filteredSamples);

  useEffect(() => { reInit(); }, [filter, reInit]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.indexOf(entry.target);
            if (index !== -1 && !visibleItems.includes(index)) {
              setVisibleItems((prev) => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [filteredSamples, visibleItems]);

  return (
    <section id="work" ref={sectionRef} className="py-24 relative overflow-hidden bg-[#050505] font-sans">
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#00f0ff]/10 rounded-full blur-[128px] animate-blob" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="mb-12 text-center md:text-left max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4">Writing Portfolio</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00f0ff] to-[#ff003c] mx-auto md:mx-0 mb-4" />
          <p className="text-xl text-white/50 font-light max-w-2xl mx-auto md:mx-0">
            Featured documentation work across complex platforms
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-16 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-white/50 mr-2 font-mono">
            <Filter className="w-4 h-4" />
            <span className="font-medium tracking-tight text-sm uppercase">Filter:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-5 py-2 rounded font-mono font-bold tracking-wider text-xs uppercase transition-all duration-300 border ${
                  filter === category
                    ? 'bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'bg-transparent text-white/50 hover:bg-white/5 border-white/10 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Netflix-style Center-Snapping Carousel */}
        <div
          className="overflow-hidden w-full cursor-grab active:cursor-grabbing relative"
          style={{ isolation: 'isolate' }}
          ref={emblaRef}
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          <div className="flex touch-pan-y items-stretch py-10" style={{ backfaceVisibility: 'hidden' }}>
            {loopingSamples.map((sample, index) => {
              const dist = getDistance(index, loopingSamples.length);
              const isActive = dist === 0;
              const isNeighbor = dist === 1;
              return (
                <div
                  key={sample._uniqueKey}
                  className="flex-[0_0_85%] sm:flex-[0_0_70%] md:flex-[0_0_55%] lg:flex-[0_0_45%] min-w-0 px-3"
                >
                  <div
                    onClick={() => !isActive && scrollTo(index)}
                    className="relative w-full h-full"
                    style={{
                      transform: isActive ? 'scale(1)' : isNeighbor ? 'scale(0.88)' : 'scale(0.78)',
                      opacity: isActive ? 1 : isNeighbor ? 0.55 : dist === 2 ? 0.2 : 0,
                      transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease, filter 0.5s ease',
                      zIndex: 10 - Math.min(dist, 4) * 2,
                      cursor: isActive ? 'default' : 'pointer',
                      filter: isActive ? 'none' : 'grayscale(0.8)',
                    }}
                  >
                    {isActive && (
                      <div className="absolute -inset-4 bg-gradient-to-r from-[#00f0ff]/30 to-[#ff003c]/30 blur-2xl z-[-1]" />
                    )}
                    <PortfolioCard
                      sample={sample}
                      isVisible={true}
                      index={index}
                      itemRef={(el) => (itemRefs.current[index] = el)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WritingPortfolio;