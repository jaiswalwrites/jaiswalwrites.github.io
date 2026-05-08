import React, { useRef, useEffect, useState } from 'react';
import { writingSamples } from '../data/mock';
import { Card } from './ui/card';
import { ExternalLink, Filter } from 'lucide-react';
import { Button } from './ui/button';

const WritingPortfolio = () => {
  const [filter, setFilter] = useState('All');
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  const categories = ['All', ...new Set(writingSamples.map(s => s.category))];

  const filteredSamples = filter === 'All' 
    ? writingSamples 
    : writingSamples.filter(sample => sample.category === filter);

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
    <section id="work" ref={sectionRef} className="py-32 relative overflow-hidden bg-black">
      {/* Subtle background */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[128px] animate-blob" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-4">Writing Portfolio</h2>
          <div className="w-24 h-px bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto md:mx-0 mb-4" />
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto md:mx-0">
            Featured documentation work across complex platforms
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-16">
          <div className="flex items-center gap-2 text-white/60 mr-2">
            <Filter className="w-4 h-4" />
            <span className="font-medium tracking-tight text-sm">Filter:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-5 py-2 rounded-full font-medium tracking-tight text-sm transition-all duration-300 ${
                  filter === category
                    ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                    : 'glass-pill text-white/70 hover:bg-white/10 hover:text-white border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSamples.map((sample, index) => (
            <div
              key={sample.id}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`transform transition-all duration-700 ${visibleItems.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="group h-full glass-panel hover:bg-white/5 transition-all duration-500 overflow-hidden flex flex-col">
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img
                    src={sample.image}
                    alt={sample.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 z-20" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 z-30">
                    <span className="px-3 py-1.5 glass-pill bg-black/50 border-white/10 text-white font-medium tracking-tight text-xs backdrop-blur-md">
                      {sample.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1 relative z-30 -mt-16">
                  {/* Company */}
                  <p className="text-cyan-400 text-sm font-medium tracking-tight mb-3 drop-shadow-md">{sample.company}</p>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold tracking-tighter text-white mb-4 group-hover:text-purple-400 transition-colors duration-300 drop-shadow-md">
                    {sample.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/60 text-sm leading-relaxed mb-6 font-light flex-1">
                    {sample.description}
                  </p>

                  {/* Link button */}
                  {sample.link !== '#' && (
                    <div className="pt-6 border-t border-white/10 mt-auto">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default WritingPortfolio;