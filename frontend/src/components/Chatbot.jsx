import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Terminal, Calendar, FileText, Code, Wrench, Sparkles, Download, Building2 } from 'lucide-react';
import avatarImg from '../assets/avatar.png';

const MODEL_URL = 'https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/shizuku/shizuku.model.json';

const GREETING = "STAY FOCUSED. I am your personal Focus Trainer. Let's cut the distractions and dive into Manish's portfolio. What do you need to know?";

// Shared Live2D init — embeds into a given canvas element
const initLive2DOnCanvas = (canvas, onHit) => {
  let attempts = 0;
  const poll = (resolve, reject) => {
    attempts++;
    if (window.PIXI && window.PIXI.live2d) resolve();
    else if (attempts > 30) reject(new Error('Live2D script timeout'));
    else setTimeout(() => poll(resolve, reject), 100);
  };

  return new Promise((resolve, reject) => poll(resolve, reject))
    .then(async () => {
      try {
        if (window.PIXI?.live2d?.SoundManager) {
          window.PIXI.live2d.SoundManager.volume = 0;
        }

        const app = new window.PIXI.Application({
          view: canvas,
          backgroundAlpha: 0,
          resolution: window.devicePixelRatio || 1,
          autoStart: true,
          resizeTo: canvas.parentElement,
        });

        const model = await window.PIXI.live2d.Live2DModel.from(MODEL_URL);
        app.stage.addChild(model);

        const width = canvas.parentElement?.clientWidth || canvas.width;
        const height = canvas.parentElement?.clientHeight || canvas.height;
        const scaleX = width / model.width;
        const scaleY = height / model.height;
        const scale = Math.min(scaleX, scaleY) * 0.95;

        model.scale.set(scale);
        model.x = (width - model.width * scale) / 2;
        model.y = (height - model.height * scale) / 2 + 10;

        model.on('hit', (hitAreas) => {
          if (hitAreas.includes('body') || hitAreas.includes('head')) {
            model.motion('tap_body');
            if (onHit) onHit();
          }
        });

        return { app, model };
      } catch (e) {
        console.warn('Live2D model render warning:', e);
        return null;
      }
    })
    .catch(() => null);
};

// 1. Floating round button component (bottom-right)
const Live2DButton = ({ onClick, color }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let instance = null;
    if (canvasRef.current) {
      initLive2DOnCanvas(canvasRef.current).then((inst) => {
        instance = inst;
      });
    }
    return () => {
      if (instance?.app) {
        try { instance.app.destroy(true, { children: true, texture: true, baseTexture: true }); } catch (e) {}
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center cursor-pointer group"
      onClick={onClick}
    >
      <div
        className="absolute inset-0 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity animate-pulse"
        style={{ backgroundColor: color }}
      />
      <div
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 bg-black/80 backdrop-blur-md relative overflow-hidden flex items-center justify-center shadow-2xl transition-transform group-hover:scale-105"
        style={{ borderColor: color }}
      >
        <canvas ref={canvasRef} className="w-full h-full pointer-events-none" />
        <div className="absolute top-1 right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-black animate-ping" />
        <div className="absolute top-1 right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-black" />
      </div>
    </motion.div>
  );
};

// 2. Chat panel Live2D canvas component (inside left column of chat window)
const Live2DPanel = ({ isTyping, onPoke }) => {
  const canvasRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    let instance = null;
    if (canvasRef.current) {
      initLive2DOnCanvas(canvasRef.current, onPoke).then((inst) => {
        instance = inst;
        if (inst) modelRef.current = inst.model;
      });
    }
    return () => {
      if (instance?.app) {
        try { instance.app.destroy(true, { children: true, texture: true, baseTexture: true }); } catch (e) {}
      }
    };
  }, [onPoke]);

  useEffect(() => {
    if (isTyping && modelRef.current) {
      try { modelRef.current.motion('flick_head'); } catch (e) {}
    }
  }, [isTyping]);

  return <canvas ref={canvasRef} className="w-full h-full cursor-pointer relative z-10" />;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ type: 'bot', text: GREETING }]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPoked, setIsPoked] = useState(false);
  const messagesEndRef = useRef(null);
  const COLOR = '#00f0ff';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/https?:\/\/[^\s]+/g, 'link').replace(/[*#]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.1;
    utterance.pitch = 1.2;

    const speak = () => {
      const voices = window.speechSynthesis.getVoices();
      const female = voices.find(v =>
        (v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Samantha') ||
         v.name.includes('Google UK English Female') || v.name.includes('Victoria')) &&
        !v.name.includes('Male') && !v.name.includes('David') && !v.name.includes('Mark')
      );
      if (female) utterance.voice = female;
      window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = speak;
    } else {
      speak();
    }
  };

  const handlePoke = () => {
    if (isPoked) return;
    setIsPoked(true);
    speakText("Don't flick me. Focus on the profile.");
    setTimeout(() => setIsPoked(false), 1500);
  };

  const handleSend = (text) => {
    const query = (text || inputValue).trim();
    if (!query) return;
    setMessages(prev => [...prev, { type: 'user', text: query }]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const q = query.toLowerCase();
      let response = '';

      if (q.includes('dita') || q.includes('oxygen') || q.includes('ditamap') || q.includes('dtp') || q.includes('ixiasoft')) {
        response = "⚡ DITA XML & Oxygen XML Master:\n1. 10+ years structured XML authoring using Oxygen XML Editor, DITAMAPs, DITAVAL profiling & IXIASOFT DITA CMS.\n2. Built enterprise DTP & DITA-OT publishing pipelines for McAfee (Skyhigh Security CASB) & KanTime Healthcare.\n3. Automated PDF Chemistry, Schematron validation, and multi-channel single-sourcing.";
      } else if (q.includes('docs-as-code') || q.includes('docs as code') || q.includes('pipeline') || q.includes('antora') || q.includes('docusaurus')) {
        response = "🚀 Docs-as-Code Architect:\n1. Engineered production CI/CD documentation pipelines with GitHub Actions, Git, Markdown, MDX, Antora & Docusaurus.\n2. Integrated Spectral OpenAPI linting, Vale style enforcement, and automated link checkers.\n3. Zero doc-to-code drift with continuous publishing alongside product releases.";
      } else if (q.includes('ai-ready') || q.includes('ai ready') || q.includes('rag') || q.includes('llm') || q.includes('safex') || q.includes('vector')) {
        response = "🤖 AI-Ready Documentation Leader:\n1. Structures content for LLM & RAG ingestion using semantic chunking, metadata tagging, and LLM-friendly MDX.\n2. Ingested 400+ REST APIs & ML docs into Safe Security's in-house AI assistant (Safex), boosting answer accuracy by 60% and reducing response time by 75%.\n3. Created automated LLM workflows to accelerate drafting and ensure style consistency.";
      } else if (q.includes('kloudfuse')) {
        response = "💼 Kloudfuse (Lead Technical Writer | Mar 2025 - Apr 2026):\n1. Built end-to-end documentation system for cloud-native observability infrastructure running on Kubernetes.\n2. Architected Antora & AsciiDoc modular, versioned doc system.\n3. Created LLM-friendly semantic doc pipelines and customer feedback loops.";
      } else if (q.includes('safe security') || q.includes('safe')) {
        response = "🛡️ Safe Security (Lead Technical Writer | Aug 2023 - Sep 2024):\n1. Optimized & documented 400+ REST APIs on Swagger (reducing support queries by 50%).\n2. Trained Safex AI agent via prompt engineering (75% faster responses).\n3. Leveraged Pendo product analytics & session replays to cut onboarding time by 50%.";
      } else if (q.includes('mcafee') || q.includes('skyhigh') || q.includes('casb')) {
        response = "🔒 McAfee / Skyhigh Security (Technical Writer | Nov 2018 - Apr 2021):\n1. Authored Skyhigh Cloud Access Security Broker (CASB) docs covering DLP policies & threat protection.\n2. Utilized Oxygen XML Editor, DITAMAP, and IXIASOFT DITA CMS.\n3. Replaced a legacy 400-page document with structured digital user assistance.";
      } else if (q.includes('harness')) {
        response = "⚡ Harness.io (Senior Technical Writer | Mar 2021 - Jul 2023):\n1. Owned Harness Continuous Integration (CI) product docs.\n2. Built K8s, Docker, and AWS test pipelines to validate docs against real deployments.\n3. Created quickstarts & video tutorials using HelpDocs & Camtasia.";
      } else if (q.includes('kantime')) {
        response = "🏥 KanTime (Technical Writer | Dec 2015 - Nov 2018):\n1. Created user guides & release notes for US Healthcare SaaS portal using DITA XML & Oxygen XML Editor.\n2. Embedded contextual help directly into user login portals.";
      } else if (q.includes('company') || q.includes('companies')) {
        response = "🏢 Companies Manish Has Empowered:\n1. Kloudfuse — Observability & AI Docs\n2. Safe Security — Cybersecurity & OpenAPI Docs\n3. Harness.io — DevOps & CI/CD Pipelines\n4. McAfee (Skyhigh) — Cloud Security & DITA XML\n5. KanTime — Healthcare SaaS & DITA XML";
      } else if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('career')) {
        response = "📊 Manish Jaiswal — Career Track Record:\n• 10+ years engineering scalable documentation ecosystems for enterprise leaders & AI startups.\n• Specialties: DITA XML (Oxygen XML), Docs-as-Code, AI/RAG Docs, OpenAPI 3.0, Kubernetes & Developer Experience (DX).\n• Proven track record reducing support queries by up to 50% and onboarding time by 50%.";
      } else if (q.includes('project') || q.includes('showcase')) {
        response = "Eyes on the screen! The Showcase proves his skills:\n1. Real-world documentation portals and interactive tools.\n2. Heavy use of OpenAPI, React, and intelligent chat flows.\n3. Try the interactive playground on any project card!";
      } else if (q.includes('writing') || q.includes('portfolio') || q.includes('article')) {
        response = "Stop drifting and read his work:\n1. High-impact technical guides and API references.\n2. Complex system architectures broken down perfectly.\n3. Scroll the horizontal coverflow to see the case studies.";
      } else if (q.includes('skill') || q.includes('stack') || q.includes('tech')) {
        response = "Memorize his stack:\n1. DITA XML, Oxygen XML Editor, IXIASOFT CMS.\n2. Docs-as-Code: Docusaurus, Antora, Git, Markdown, OpenAPI 3.0.\n3. AI & RAG: Prompt Engineering, Semantic Chunking, LLM Knowledge Graphs.";
      } else if (q.includes('about') || q.includes('who') || q.includes('hero')) {
        response = "Who is he? Listen closely:\n1. Senior Technical Writer, Docs Strategist & Writer Who Codes.\n2. 10+ years architecting documentation systems for cloud-native, DevOps, AI, and SaaS platforms.\n3. This entire site is proof of his engineering prowess.";
      } else if (q.includes('schedule') || q.includes('call') || q.includes('meet') || q.includes('book')) {
        response = "Don't procrastinate! Book a meeting right now:\n👉 https://calendly.com/jaiswalmanish060/book-a-call-with-manish";
      } else if (q.includes('resume') || q.includes('cv')) {
        response = "Review the data. Here is his Google Drive resume:\n👉 https://drive.google.com/file/d/1f9ZrT1hg0dM5yCNcdcbSq-xTPenGBLbo/view?usp=sharing";
      } else if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach')) {
        response = "📫 Direct Contact Information:\n• Email: jaiswalmanish060@gmail.com\n• Phone: +91 9538466170\n• LinkedIn: https://www.linkedin.com/in/manish-jaiswal1993/";
      } else {
        response = "Ask me about DITA XML, Oxygen XML, Docs-as-Code, AI-Ready Docs, Kloudfuse, Safe Security, McAfee, Harness, or Resume!";
      }

      setMessages(prev => [...prev, { type: 'bot', text: response }]);
      speakText(response);
    }, 1200);
  };

  const presets = [
    { label: '⚡ DITA & Oxygen', query: 'Tell me about his DITA XML and Oxygen XML experience', icon: Wrench },
    { label: '🚀 Docs-as-Code', query: 'How does Manish build Docs-as-Code pipelines?', icon: Code },
    { label: '🤖 AI-Ready Docs', query: 'What are AI-Ready docs and RAG pipelines?', icon: Sparkles },
    { label: '💼 Experience', query: 'Overview of Manish Jaiswal\'s career experience', icon: FileText },
    { label: '🏢 Companies', query: 'What companies has Manish worked for?', icon: Building2 },
    { label: '📄 Resume', query: 'Can I download his resume?', icon: Download },
    { label: '📅 Book Call', query: 'I want to schedule a call with Manish', icon: Calendar },
  ];

  return (
    <>
      {/* Floating Live2D Button — bottom right, hidden when chat is open */}
      {!isOpen && (
        <Live2DButton onClick={() => setIsOpen(true)} color={COLOR} />
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 w-[360px] sm:w-[600px] h-[600px] bg-[#050505] shadow-[0_0_40px_rgba(0,240,255,0.15)] rounded-xl z-50 flex overflow-hidden border border-[#00f0ff]/30 font-sans"
          >
            {/* Left: Live2D Character Panel */}
            <div className="w-[240px] relative bg-gradient-to-t from-black via-[#00f0ff]/5 to-transparent flex-shrink-0 overflow-hidden border-r border-[#00f0ff]/20">
              {/* Name Tag */}
              <div className="absolute top-4 left-4 z-20">
                <div className="inline-block px-3 py-1 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-bold tracking-widest font-mono uppercase rounded backdrop-blur-md">
                  S.E.N.S.E.I
                </div>
                <div className="text-[10px] text-white/50 tracking-widest uppercase mt-1 ml-1 font-mono">Focus Trainer</div>
              </div>

              {/* Live2D WebGL Canvas */}
              <Live2DPanel isTyping={isTyping} onPoke={handlePoke} />

              {/* Blush overlay on poke */}
              <AnimatePresence>
                {isPoked && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-[45%] left-1/2 -translate-x-1/2 w-40 h-16 bg-[#ff3399] rounded-full blur-[35px] z-20 pointer-events-none mix-blend-screen"
                  />
                )}
              </AnimatePresence>

              {/* Floor glow */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#00f0ff]/20 to-transparent z-0 pointer-events-none" />
            </div>

            {/* Right: Chat Interface */}
            <div className="flex-1 flex flex-col relative bg-black/90 backdrop-blur-md min-w-0">
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '4px 4px' }} />

              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-white/50 hover:text-[#ff003c] transition-colors z-20 bg-black/50 rounded-full border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 pt-14 space-y-4 font-mono scrollbar-none z-10">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, x: msg.type === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      className={`max-w-[85%] p-3 rounded text-sm leading-relaxed whitespace-pre-line ${
                        msg.type === 'user'
                          ? 'text-white rounded-br-none border bg-[#00f0ff]/20 border-[#00f0ff]/50'
                          : 'bg-white/5 border border-white/10 text-white/90 rounded-bl-none'
                      }`}
                    >
                      {msg.type === 'bot' && <Terminal className="w-3 h-3 mb-2 opacity-50 text-[#00f0ff]" />}
                      {msg.text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
                        part.match(/https?:\/\/[^\s]+/) ? (
                          <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="underline break-all text-[#00f0ff] hover:text-[#ff003c]">{part}</a>
                        ) : <span key={i}>{part}</span>
                      )}
                    </motion.div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 border border-white/10 p-3 rounded flex items-center gap-1.5">
                      {[0, 1, 2].map(i => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full animate-bounce bg-[#00f0ff]" style={{ animationDelay: `${i * 150}ms` }} />
                      ))}
                    </motion.div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Preset Questions / Quick Shortcuts */}
              {!isTyping && (
                <div className="px-3 pb-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none z-10 py-1 border-t border-white/5">
                  {presets.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(p.query)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-mono whitespace-nowrap transition-all duration-300 bg-[#00f0ff]/10 border-[#00f0ff]/30 text-[#00f0ff] hover:bg-[#00f0ff]/25 hover:border-[#00f0ff]/60 hover:scale-105"
                    >
                      <p.icon className="w-3 h-3 text-[#00f0ff]" /> {p.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="p-3 border-t border-[#00f0ff]/20 bg-black z-10">
                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Message S.E.N.S.E.I..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none placeholder:text-white/30 focus:border-[#00f0ff]/50 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="p-2.5 rounded-full border transition-all disabled:opacity-50 bg-[#00f0ff]/10 border-[#00f0ff]/30 text-[#00f0ff] hover:bg-[#00f0ff]/20"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
