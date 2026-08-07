import React, { useRef, useEffect, useState } from 'react';
import { experience } from '../data/mock';
import { MapPin, Calendar, Wrench } from 'lucide-react';
import useNetflixCarousel from '../hooks/useNetflixCarousel';

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

const Experience = () => {
  const sectionRef = useRef(null);
  const { emblaRef, selectedIndex, pause, resume, scrollTo, getDistance } = useNetflixCarousel();
  const loopingExperience = getLoopingItems(experience);

  return (
    <section id="experience" ref={sectionRef} className="py-24 relative overflow-hidden bg-[#050505] font-sans">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff003c]/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="mb-16 text-center md:text-left max-w-7xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-[#00f0ff] uppercase font-mono">⚡ Career Timeline</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mt-3 mb-4">Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00f0ff] to-[#ff003c] mx-auto md:mx-0 mb-6" />
          <p className="text-xl text-white/50 font-light max-w-2xl mx-auto md:mx-0">
            10+ years crafting scalable documentation architectures for industry leaders and innovative AI startups.
          </p>
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
            {loopingExperience.map((job, index) => {
              const dist = getDistance(index, loopingExperience.length);
              const isActive = dist === 0;
              const isNeighbor = dist === 1;

              return (
                <div
                  key={job._uniqueKey}
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

                    <div className="glass-panel bg-[#050505]/80 p-8 h-full flex flex-col border border-[#00f0ff]/20 rounded-xl relative overflow-hidden backdrop-blur-md">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#00f0ff]/10 to-transparent rounded-bl-full" />

                      {/* Header */}
                      <div className="flex flex-col gap-4 mb-6 relative z-10">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            {job.logo && (
                              <img
                                src={job.logo}
                                alt={`${job.company} logo`}
                                className="w-10 h-10 object-contain bg-white rounded p-1"
                                onError={(e) => { e.target.style.display = 'none' }}
                              />
                            )}
                            <h3 className="text-2xl font-black tracking-tighter text-white">
                              {job.company}
                            </h3>
                          </div>
                          <div className="text-[#00f0ff] font-medium tracking-tight text-lg mb-4 font-mono">
                            &gt; {job.role}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="inline-block self-start px-3 py-1 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-bold tracking-widest font-mono uppercase rounded">
                            {job.domain}
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-white/50 text-sm font-mono tracking-tight mt-2">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4 text-[#ff003c]" />
                              {job.duration}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4 text-[#ff003c]" />
                              {job.location}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-white/80 mb-4 leading-relaxed font-light relative z-10">
                        {job.description}
                      </p>

                      {/* Tools Used Badge */}
                      {job.toolsUsed && (
                        <div className="mb-6 flex flex-col gap-1.5 relative z-10">
                          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#00f0ff]">
                            <Wrench className="w-3.5 h-3.5" />
                            <span>Tools Used:</span>
                          </div>
                          <div className="inline-block px-3 py-1 rounded bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-cyan-200 font-mono text-xs shadow-[0_0_10px_rgba(0,240,255,0.1)]">
                            {job.toolsUsed}
                          </div>
                        </div>
                      )}

                      {/* Highlights */}
                      <div className="space-y-3 pt-6 border-t border-[#00f0ff]/20 mt-auto relative z-10">
                        {job.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#ff003c] flex-shrink-0 shadow-[0_0_10px_rgba(255,0,60,0.8)] animate-pulse" />
                            <p className="text-white/60 text-sm leading-relaxed font-light">{highlight}</p>
                          </div>
                        ))}
                      </div>
                    </div>
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

export default Experience;