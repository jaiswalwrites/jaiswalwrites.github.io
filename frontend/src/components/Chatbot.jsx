import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Terminal, Calendar, FileText, Code } from 'lucide-react';
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
          autoDensity: true,
          width: canvas.width || 240,
          height: canvas.height || 600,
        });

        const model = await window.PIXI.live2d.Live2DModel.from(MODEL_URL, { autoInteract: true });
        app.stage.addChild(model);

        const W = app.screen.width;
        const H = app.screen.height;
        const scale = Math.min(W / model.internalModel.width, H / model.internalModel.height) * 1.6;
        model.scale.set(scale);
        model.anchor.set(0.5, 0);
        model.x = W / 2;
        model.y = H * 0.05;

        if (onHit) {
          model.on('hit', (areas) => {
            if (areas.includes('body') || areas.includes('head')) {
              model.motion('tap_body');
              onHit();
            }
          });
        }

        return { app, model };
      } catch (err) {
        console.warn('Live2D model init failed:', err);
        return null;
      }
    })
    .catch((err) => {
      console.warn('Live2D script loading timed out:', err);
      return null;
    });
};

// Small Live2D canvas for the floating button
const Live2DButton = ({ onClick, color }) => {
  const canvasRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    let cancelled = false;

    initLive2DOnCanvas(canvasRef.current, null).then((instance) => {
      if (cancelled || !instance) return;
      instanceRef.current = instance;
    });

    return () => {
      cancelled = true;
      if (instanceRef.current) {
        try { instanceRef.current.app.destroy(true); } catch (e) {}
        instanceRef.current = null;
      }
    };
  }, []);

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 w-20 h-20 rounded-full border-2 bg-black z-50 overflow-hidden cursor-pointer shadow-[0_0_24px_rgba(0,240,255,0.5)]"
      style={{ borderColor: color }}
    >
      {/* Fallback static image behind canvas */}
      <img src={avatarImg} alt="Chat" className="absolute inset-0 w-full h-full object-cover" />
      <canvas
        ref={canvasRef}
        width={80}
        height={80}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 2 }}
      />
      <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full border border-black animate-ping z-10" style={{ backgroundColor: color }} />
    </motion.button>
  );
};

// Full Live2D canvas for the chatbox left panel
const Live2DPanel = ({ isTyping, onPoke }) => {
  const canvasRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    let cancelled = false;

    initLive2DOnCanvas(canvasRef.current, onPoke).then((instance) => {
      if (cancelled || !instance) return;
      instanceRef.current = instance;
    });

    return () => {
      cancelled = true;
      if (instanceRef.current) {
        try { instanceRef.current.app.destroy(true); } catch (e) {}
        instanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Trigger typing motion on the model
  useEffect(() => {
    if (!instanceRef.current?.model) return;
    const { model } = instanceRef.current;
    if (isTyping) {
      try { model.motion('flick_head'); } catch (e) {}
    }
  }, [isTyping]);

  return (
    <canvas
      ref={canvasRef}
      width={240}
      height={580}
      className="absolute inset-0 w-full h-full cursor-pointer z-10"
    />
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ type: 'bot', text: GREETING }]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPoked, setIsPoked] = useState(false);
  const messagesEndRef = useRef(null);
  const COLOR = '#00f0ff';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.pitch = 1.3;
    utterance.rate = 1.05;

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

      if (q.includes('experience') || q.includes('work') || q.includes('job')) {
        response = "Focus! Here is his track record:\n1. 10+ years architecting documentation for AI startups.\n2. Expert at turning chaotic data into streamlined Docs-as-Code.\n3. Master of Developer Experience (DX). Stay on task!";
      } else if (q.includes('project') || q.includes('showcase')) {
        response = "Eyes on the screen! The Showcase proves his skills:\n1. Real-world documentation portals and interactive tools.\n2. Heavy use of OpenAPI, React, and intelligent chat flows.\n3. Try the interactive playground on any project card!";
      } else if (q.includes('writing') || q.includes('portfolio') || q.includes('article')) {
        response = "Stop drifting and read his work:\n1. High-impact technical guides and API references.\n2. Complex system architectures broken down perfectly.\n3. Scroll the horizontal coverflow to see the case studies.";
      } else if (q.includes('skill') || q.includes('stack') || q.includes('tech')) {
        response = "Memorize his stack:\n1. React, Next.js, and modern frontend tools.\n2. Docusaurus, OpenAPI, Swagger, and MDX for docs.\n3. RAG and LLM integration to build actual AI ecosystems.";
      } else if (q.includes('about') || q.includes('who') || q.includes('hero')) {
        response = "Who is he? Listen closely:\n1. A Lead AI Engineer and Technical Writer.\n2. He builds ecosystems that make complex AI usable.\n3. This entire site is proof of his engineering prowess.";
      } else if (q.includes('schedule') || q.includes('call') || q.includes('meet')) {
        response = "Don't procrastinate! Book a meeting right now: https://calendly.com/jaiswalmanish060/book-a-call-with-manish";
      } else if (q.includes('resume') || q.includes('cv')) {
        response = "Review the data. Here is the updated resume: https://drive.google.com/file/d/1f9ZrT1hg0dM5yCNcdcbSq-xTPenGBLbo/view?usp=sharing";
      } else {
        response = "Stop losing focus! Ask me about Manish's Experience, Projects, Writing, or Skills, and I will give you a direct 3-line breakdown.";
      }

      setMessages(prev => [...prev, { type: 'bot', text: response }]);
      speakText(response);
    }, 1200);
  };

  const presets = [
    { label: 'Experience', query: 'Tell me about his experience', icon: FileText },
    { label: 'Projects', query: 'What is in the projects showcase?', icon: Code },
    { label: 'Book Call', query: 'I want to schedule a call', icon: Calendar },
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

              {/* Preset Questions */}
              {!isTyping && messages.length < 5 && (
                <div className="px-3 pb-2 flex flex-wrap gap-2 z-10">
                  {presets.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(p.query)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] transition-colors bg-[#00f0ff]/10 border-[#00f0ff]/30 text-[#00f0ff] hover:bg-[#00f0ff]/20"
                    >
                      <p.icon className="w-3 h-3" /> {p.label}
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
