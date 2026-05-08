import React, { useRef, useEffect, useState } from 'react';
import { skills, certifications, achievements } from '../data/mock';
import { Card } from './ui/card';
import { Award, CheckCircle2, Code, Wrench, Cloud, FileText, Palette, Blocks, Cpu } from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    { title: 'AI & Machine Learning', items: skills.ai_and_ml, icon: Cpu },
    { title: 'Documentation Strategy', items: skills.documentation, icon: FileText },
    { title: 'DevOps & Cloud', items: skills.devops, icon: Cloud },
    { title: 'Languages', items: skills.languages, icon: Code },
    { title: 'Design Tools', items: skills.design, icon: Palette },
    { title: 'Blockchain/Web3', items: skills.blockchain, icon: Blocks },
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-32 relative overflow-hidden bg-black">
      {/* Subtle background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[128px] animate-blob" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-4">Skills & Expertise</h2>
          <div className="w-24 h-px bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto md:mx-0" />
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className={`glass-panel p-8 group hover:-translate-y-1 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className="mb-6 relative">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Icon className="w-6 h-6 text-white group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-medium tracking-tight text-white mb-6">
                  {category.title}
                </h3>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 glass-pill bg-white/5 border-white/5 text-white/70 text-sm hover:bg-white/10 hover:text-white transition-all duration-300 cursor-default font-medium tracking-tight"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Certifications */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h3 className="text-3xl font-semibold tracking-tighter text-white mb-8 flex items-center gap-3">
              <Award className="w-8 h-8 text-cyan-400" />
              Certifications
            </h3>
            <div className="flex flex-col gap-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="glass-panel p-5 group hover:bg-white/5 transition-all duration-300"
                  style={{ transitionDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium tracking-tight mb-1">
                        {cert.name}
                      </h4>
                      <p className="text-white/50 text-sm tracking-tight">{cert.issuer}</p>
                    </div>
                    <div className="text-cyan-400 text-sm font-medium tracking-tight glass-pill px-3 py-1">{cert.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h3 className="text-3xl font-semibold tracking-tighter text-white mb-8 flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-purple-400" />
              Key Achievements
            </h3>
            <div className="flex flex-col gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="glass-panel p-6 group hover:bg-white/5 transition-all duration-300"
                  style={{ transitionDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-white font-medium tracking-tight mb-2">
                        {achievement.title}
                      </h4>
                      <p className="text-white/60 text-sm leading-relaxed font-light">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;