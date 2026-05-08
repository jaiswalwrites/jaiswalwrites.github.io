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
    <section id="skills" ref={sectionRef} className="py-32 bg-slate-950 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Skills & Expertise</h2>
          <div className="w-24 h-px bg-gradient-to-r from-amber-500 to-transparent" />
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className={`p-6 bg-slate-900/30 border-slate-800/30 hover:border-amber-500/30 transition-all duration-500 hover:bg-slate-900/50 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className="mb-4">
                  <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-amber-500" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-light text-white mb-4">
                  {category.title}
                </h3>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-slate-800/50 border border-slate-700 text-slate-300 text-sm hover:border-amber-500/50 hover:text-amber-500 transition-all duration-300 cursor-default font-light"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Certifications */}
        <div className={`mb-20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-3xl font-light text-white mb-8 flex items-center gap-3">
            <Award className="w-8 h-8 text-amber-500" />
            Certifications
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className="p-6 bg-slate-900/30 border-slate-800/30 hover:border-amber-500/30 transition-all duration-500 hover:bg-slate-900/50"
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <Award className="w-5 h-5 text-amber-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-light mb-1">
                      {cert.name}
                    </h4>
                    <p className="text-slate-400 text-sm">{cert.issuer}</p>
                    <p className="text-amber-500 text-sm font-light mt-1">{cert.year}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-3xl font-light text-white mb-8 flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-amber-500" />
            Key Achievements
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="p-6 bg-slate-900/30 border-slate-800/30 hover:border-amber-500/30 transition-all duration-500 hover:bg-slate-900/50"
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-light mb-2">
                      {achievement.title}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;