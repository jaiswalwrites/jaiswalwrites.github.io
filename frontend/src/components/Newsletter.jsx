import React, { useRef, useEffect, useState } from 'react';
import { newsletter } from '../data/mock';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail, Send, CheckCircle, Users, Calendar } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Newsletter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const sectionRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Thanks for subscribing!",
        description: "You'll receive the latest tech writing insights in your inbox.",
      });
      setEmail('');
    }
  };

  return (
    <section id="newsletter" ref={sectionRef} className="py-32 relative overflow-hidden bg-black">
      {/* Subtle background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[128px] animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-4">Newsletter</h2>
          <div className="w-24 h-px bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto" />
        </div>

        <div className={`glass-panel p-8 md:p-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center gap-5 p-6 glass-panel hover:bg-white/5 transition-colors duration-300">
              <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-3xl font-medium tracking-tight text-white mb-1">{newsletter.subscribers}</div>
                <div className="text-white/60 text-sm font-medium tracking-tight uppercase">Subscribers</div>
              </div>
            </div>
            <div className="flex items-center gap-5 p-6 glass-panel hover:bg-white/5 transition-colors duration-300">
              <div className="w-14 h-14 rounded-2xl bg-purple-400/10 border border-purple-400/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="text-3xl font-medium tracking-tight text-white mb-1">{newsletter.frequency}</div>
                <div className="text-white/60 text-sm font-medium tracking-tight uppercase">Publishing</div>
              </div>
            </div>
            <div className="flex items-center gap-5 p-6 glass-panel hover:bg-white/5 transition-colors duration-300">
              <div className="w-14 h-14 rounded-2xl bg-blue-400/10 border border-blue-400/20 flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-3xl font-medium tracking-tight text-white mb-1">Newsletter</div>
                <div className="text-white/60 text-sm font-medium tracking-tight uppercase">LinkedIn</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="text-center mb-12">
            <p className="text-xl text-white/80 leading-relaxed font-light max-w-3xl mx-auto">
              {newsletter.description}
            </p>
          </div>

          {/* Topics */}
          <div className="mb-12">
            <h4 className="text-white font-medium tracking-tight text-center mb-6">Topics Covered:</h4>
            <div className="flex flex-wrap justify-center gap-3">
              {newsletter.topics.map((topic, index) => (
                <span
                  key={index}
                  className="px-5 py-2 glass-pill bg-white/5 border-white/10 text-white/80 text-sm font-medium tracking-tight hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Subscribe Form */}
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/5 border border-white/10 focus:border-cyan-400 text-white placeholder:text-white/40 h-14 px-6 rounded-full outline-none transition-colors"
              />
              <button
                type="submit"
                className="bg-white hover:bg-white/90 text-black font-medium tracking-tight px-8 h-14 rounded-full transition-colors flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.15)]"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
            <p className="text-white/50 text-sm text-center mt-6 font-medium tracking-tight">
              Join 1,000+ tech writers staying ahead of the AI curve
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;