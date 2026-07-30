import React, { useRef, useEffect, useState } from 'react';
import { skills, certifications, achievements } from '../data/mock';
import { Award, CheckCircle2, Code, Wrench, Cloud, FileText, Blocks, Cpu, Sparkles, Trophy, ExternalLink } from 'lucide-react';
import useNetflixCarousel from '../hooks/useNetflixCarousel';

const getLoopingItems = (items) => {
  if (!items || items.length === 0) return [];
  const repeatCount = items.length >= 8 ? 1 : Math.ceil(10 / items.length);
  const result = [];
  for (let r = 0; r < repeatCount; r++) {
    items.forEach((item, idx) => {
      result.push({
        ...item,
        _uniqueKey: `${item.id || item.title || item.name || idx}-${r}`,
      });
    });
  }
  return result;
};

/* --- 1. SKILL CATEGORY CAROUSEL --- */
const SkillCategoryCarousel = () => {
  const { emblaRef, selectedIndex, pause, resume, scrollTo, getDistance } = useNetflixCarousel();

  const skillCategories = [
    { id: 'cat-1', title: 'AI & Machine Learning', items: skills.ai_and_ml, icon: Cpu, color: '#00f0ff', desc: 'LLM Prompt Engineering, RAG Systems, Vector Search, & Agentic Workflows' },
    { id: 'cat-2', title: 'Programming & Scripting', items: skills.programming_scripting, icon: Code, color: '#a855f7', desc: 'Python, GoLang, Java, SQL, Solidity, Shell Automation, & cURL' },
    { id: 'cat-3', title: 'Cloud & DevOps', items: skills.cloud_devops, icon: Cloud, color: '#ff003c', desc: 'Kubernetes, Docker, Helm, AWS, GCP, Jenkins, & GitHub Actions Pipelines' },
    { id: 'cat-4', title: 'FinOps & Data Analytics', items: skills.finops_data, icon: Blocks, color: '#f59e0b', desc: 'Pendo Session Replays, Cost Optimization, Anomaly Detection, & NPS' },
    { id: 'cat-5', title: 'Docs-as-Code & Tools', items: skills.tech_docs_tools, icon: FileText, color: '#10b981', desc: 'Docusaurus, Git, Swagger/OpenAPI 3.0, Vale Linters, & Antora' },
  ];

  const loopingCategories = getLoopingItems(skillCategories);

  return (
    <div className="mb-24">
      <div className="flex items-center gap-2 mb-6">
        <Cpu className="w-5 h-5 text-[#00f0ff]" />
        <h3 className="text-2xl font-bold text-white tracking-tight">Technical Competencies & Stack</h3>
      </div>

      <div
        className="overflow-hidden w-full cursor-grab active:cursor-grabbing relative"
        style={{ isolation: 'isolate' }}
        ref={emblaRef}
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        <div className="flex touch-pan-y items-stretch py-8" style={{ backfaceVisibility: 'hidden' }}>
          {loopingCategories.map((cat, index) => {
            const Icon = cat.icon;
            const dist = getDistance(index, loopingCategories.length);
            const isActive = dist === 0;
            const isNeighbor = dist === 1;

            return (
              <div
                key={cat._uniqueKey}
                className="flex-[0_0_85%] sm:flex-[0_0_70%] md:flex-[0_0_50%] lg:flex-[0_0_40%] min-w-0 px-3"
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
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#00f0ff]/30 via-purple-500/20 to-[#ff003c]/20 blur-2xl z-[-1]" />
                  )}

                  <div className="glass-panel p-7 h-full flex flex-col justify-between border-white/10 hover:border-white/20 transition-all rounded-2xl relative overflow-hidden bg-[#070709]">
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                          <Icon className="w-6 h-6" style={{ color: cat.color }} />
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border" style={{ color: cat.color, borderColor: `${cat.color}40`, backgroundColor: `${cat.color}10` }}>
                          Core Domain
                        </span>
                      </div>

                      <h4 className="text-xl font-bold tracking-tight text-white mb-2">{cat.title}</h4>
                      <p className="text-xs text-white/60 font-light leading-relaxed mb-6">{cat.desc}</p>

                      {/* Skill Tags */}
                      <div className="flex flex-wrap gap-2">
                        {cat.items.map((item, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-white/80 text-xs font-mono hover:bg-white/10 transition-colors"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* --- 2. CERTIFICATIONS CAROUSEL --- */
const CertificationsCarousel = () => {
  const { emblaRef, selectedIndex, pause, resume, scrollTo, getDistance } = useNetflixCarousel();
  const loopingCerts = getLoopingItems(certifications);

  return (
    <div className="mb-24">
      <div className="flex items-center gap-2 mb-6">
        <Award className="w-5 h-5 text-amber-400" />
        <h3 className="text-2xl font-bold text-white tracking-tight">Verified Certifications & Credentials</h3>
      </div>

      <div
        className="overflow-hidden w-full cursor-grab active:cursor-grabbing relative"
        style={{ isolation: 'isolate' }}
        ref={emblaRef}
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        <div className="flex touch-pan-y items-stretch py-8" style={{ backfaceVisibility: 'hidden' }}>
          {loopingCerts.map((cert, index) => {
            const dist = getDistance(index, loopingCerts.length);
            const isActive = dist === 0;
            const isNeighbor = dist === 1;

            return (
              <div
                key={cert._uniqueKey}
                className="flex-[0_0_85%] sm:flex-[0_0_65%] md:flex-[0_0_45%] lg:flex-[0_0_35%] min-w-0 px-3"
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
                    <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-yellow-500/15 blur-2xl z-[-1]" />
                  )}

                  <div className="glass-panel p-6 h-full flex flex-col justify-between border-white/10 hover:border-amber-400/40 transition-all rounded-2xl relative overflow-hidden bg-[#070709]">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                          <Award className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-300">
                          {cert.year}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-white mb-2 leading-snug">{cert.name}</h4>
                      <p className="text-xs text-white/50 font-mono mb-4">{cert.issuer}</p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-amber-400 font-mono">
                      <span>✓ Verified Credential</span>
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* --- 3. KEY ACHIEVEMENTS CAROUSEL --- */
const KeyAchievementsCarousel = () => {
  const { emblaRef, selectedIndex, pause, resume, scrollTo, getDistance } = useNetflixCarousel();
  const loopingAchievements = getLoopingItems(achievements);

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-5 h-5 text-purple-400" />
        <h3 className="text-2xl font-bold text-white tracking-tight">Key Career Achievements & Impact</h3>
      </div>

      <div
        className="overflow-hidden w-full cursor-grab active:cursor-grabbing relative"
        style={{ isolation: 'isolate' }}
        ref={emblaRef}
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        <div className="flex touch-pan-y items-stretch py-8" style={{ backfaceVisibility: 'hidden' }}>
          {loopingAchievements.map((ach, index) => {
            const dist = getDistance(index, loopingAchievements.length);
            const isActive = dist === 0;
            const isNeighbor = dist === 1;

            return (
              <div
                key={ach._uniqueKey}
                className="flex-[0_0_85%] sm:flex-[0_0_65%] md:flex-[0_0_45%] lg:flex-[0_0_38%] min-w-0 px-3"
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
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 blur-2xl z-[-1]" />
                  )}

                  <div className="glass-panel p-7 h-full flex flex-col justify-between border-white/10 hover:border-purple-400/40 transition-all rounded-2xl relative overflow-hidden bg-[#070709]">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300">
                          Measured Impact
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-white mb-2 leading-snug">{ach.title}</h4>
                      <p className="text-xs text-white/70 font-light leading-relaxed mb-4">{ach.description}</p>
                    </div>

                    <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-purple-400 flex items-center justify-between">
                      <span>Leadership Milestone</span>
                      <Trophy className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* --- MAIN SKILLS SECTION --- */
const Skills = () => {
  const sectionRef = useRef(null);

  return (
    <section id="skills" ref={sectionRef} className="py-32 relative overflow-hidden bg-black font-sans border-t border-white/5">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left max-w-7xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-[#00f0ff] uppercase font-mono">✦ Expertise & Credentials</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mt-3 mb-4">Skills, Certifications & Achievements</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00f0ff] to-[#ff003c] mx-auto md:mx-0 mb-4" />
          <p className="text-xl text-white/50 font-light max-w-2xl mx-auto md:mx-0">
            A comprehensive breakdown of engineering competencies, verified certifications, and career leadership achievements.
          </p>
        </div>

        {/* 1. Skill Categories Carousel */}
        <SkillCategoryCarousel />

        {/* 2. Certifications Carousel */}
        <CertificationsCarousel />

        {/* 3. Key Achievements Carousel */}
        <KeyAchievementsCarousel />
      </div>
    </section>
  );
};

export default Skills;