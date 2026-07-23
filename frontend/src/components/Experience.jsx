import React, { useRef, useEffect, useState } from 'react';
import { experience } from '../data/mock';
import { MapPin, Calendar } from 'lucide-react';

const Experience = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

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
  }, [visibleItems]);

  return (
    <section id="experience" ref={sectionRef} className="py-24 relative overflow-hidden bg-black">
      {/* Subtle background */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[128px] animate-blob animation-delay-4000" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-4">Experience</h2>
          <div className="w-24 h-px bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto md:mx-0 mb-6" />
          <p className="text-xl text-white/60 font-light max-w-2xl">
            10+ years crafting scalable documentation architectures for industry leaders and innovative AI startups.
          </p>
        </div>

        {/* Experience items - Horizontal Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {experience.map((job, index) => (
            <div
              key={job.id}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`glass-panel p-8 hover:bg-white/5 transition-all duration-700 transform h-full flex flex-col ${visibleItems.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className="flex flex-col gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    {job.logo && (
                      <img 
                        src={job.logo} 
                        alt={`${job.company} logo`} 
                        className="w-8 h-8 object-contain bg-white rounded p-1"
                        onError={(e) => { e.target.style.display = 'none' }}
                      />
                    )}
                    <h3 className="text-2xl font-semibold tracking-tighter text-white">
                      {job.company}
                    </h3>
                  </div>
                  <div className="text-cyan-400 font-medium tracking-tight text-lg mb-4">
                    {job.role}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="inline-block self-start px-3 py-1 glass-pill text-white/80 text-xs font-medium tracking-tight">
                    {job.domain}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-white/50 text-sm font-medium tracking-tight mt-2">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {job.duration}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/80 mb-6 leading-relaxed font-light flex-grow">
                {job.description}
              </p>

              {/* Highlights */}
              <div className="space-y-3 pt-6 border-t border-white/10 mt-auto">
                {job.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0 shadow-[0_0_10px_rgba(192,132,252,0.5)]" />
                    <p className="text-white/60 text-sm leading-relaxed font-light">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;