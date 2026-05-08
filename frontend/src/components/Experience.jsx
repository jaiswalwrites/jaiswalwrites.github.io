import React, { useRef, useEffect, useState } from 'react';
import { experience } from '../data/mock';
import { Card } from './ui/card';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

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
    <section id="experience" ref={sectionRef} className="py-32 relative overflow-hidden bg-black">
      {/* Subtle background */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[128px] animate-blob animation-delay-4000" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-4">Experience</h2>
          <div className="w-24 h-px bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto md:mx-0 mb-6" />
          <p className="text-xl text-white/60 font-light max-w-2xl">
            10+ years crafting scalable documentation architectures for industry leaders and innovative AI startups.
          </p>
        </div>

        {/* Experience items */}
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {experience.map((job, index) => (
            <div
              key={job.id}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group transform transition-all duration-700 ${visibleItems.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              {/* Timeline dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-black shadow-[0_0_20px_rgba(255,255,255,0.1)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Briefcase className="w-4 h-4 text-cyan-400" />
              </div>
              
              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] glass-panel p-8 hover:bg-white/5 transition-all duration-500">
                {/* Header */}
                <div className="flex flex-col gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tighter text-white mb-1">
                      {job.company}
                    </h3>
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
                <p className="text-white/80 mb-6 leading-relaxed font-light">
                  {job.description}
                </p>

                {/* Highlights */}
                <div className="space-y-3 pt-6 border-t border-white/10">
                  {job.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0 shadow-[0_0_10px_rgba(192,132,252,0.5)]" />
                      <p className="text-white/60 text-sm leading-relaxed font-light">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;