import React, { useState } from 'react';
import { personalInfo } from '../data/mock';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Phone, Linkedin, Github, Send, MapPin } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Using Web3Forms for sending emails without a backend.
    const submissionData = {
      ...formData,
      // NOTE: Replace this placeholder with your actual Web3Forms access key
      access_key: "YOUR_WEB3FORMS_ACCESS_KEY_HERE" 
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(submissionData)
      });

      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast({
          title: "Something went wrong",
          description: result.message || "Please try again later.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Failed to send message. Please check your connection.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-black">
      {/* Subtle background */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[128px] animate-blob animation-delay-4000" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-16 md:text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-4">Get In Touch</h2>
          <div className="w-24 h-px bg-gradient-to-r from-cyan-400 to-purple-400 mb-4 md:mx-auto" />
          <p className="text-xl text-white/60 font-light max-w-2xl md:mx-auto">
            Have a project in mind? Let's collaborate and build something amazing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="p-6 glass-panel hover:bg-white/5 transition-all duration-500 group">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center group-hover:bg-cyan-400/20 transition-colors">
                  <Mail className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium tracking-tight mb-1">Email</h3>
                  <a href={`mailto:${personalInfo.email}`} className="text-white/60 hover:text-cyan-400 font-light transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 glass-panel hover:bg-white/5 transition-all duration-500 group">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-purple-400/10 border border-purple-400/20 flex items-center justify-center group-hover:bg-purple-400/20 transition-colors">
                  <Phone className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium tracking-tight mb-1">Phone</h3>
                  <a href={`tel:${personalInfo.phone}`} className="text-white/60 hover:text-purple-400 font-light transition-colors">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 glass-panel hover:bg-white/5 transition-all duration-500 group">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-400/10 border border-blue-400/20 flex items-center justify-center group-hover:bg-blue-400/20 transition-colors">
                  <MapPin className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium tracking-tight mb-1">Location</h3>
                  <p className="text-white/60 font-light">Bangalore, India</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6">
              <h3 className="text-white font-medium tracking-tight mb-4">Connect on Social</h3>
              <div className="flex gap-4">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 flex items-center justify-center rounded-2xl border border-white/10 hover:border-cyan-400/50 hover:bg-white/5 text-white/60 hover:text-cyan-400 transition-all duration-300"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 flex items-center justify-center rounded-2xl border border-white/10 hover:border-purple-400/50 hover:bg-white/5 text-white/60 hover:text-purple-400 transition-all duration-300"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 md:p-10 glass-panel">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-medium tracking-tight text-sm mb-2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full bg-white/5 border border-white/10 focus:border-cyan-400 text-white placeholder:text-white/40 h-12 px-5 rounded-xl outline-none transition-colors font-light"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-medium tracking-tight text-sm mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className="w-full bg-white/5 border border-white/10 focus:border-purple-400 text-white placeholder:text-white/40 h-12 px-5 rounded-xl outline-none transition-colors font-light"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-white font-medium tracking-tight text-sm mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                  className="w-full bg-white/5 border border-white/10 focus:border-cyan-400 text-white placeholder:text-white/40 h-12 px-5 rounded-xl outline-none transition-colors font-light"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-medium tracking-tight text-sm mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 focus:border-purple-400 text-white placeholder:text-white/40 p-5 rounded-xl outline-none transition-colors resize-none font-light"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-white hover:bg-white/90 text-black font-medium tracking-tight py-4 rounded-xl transition-colors flex items-center justify-center group shadow-[0_0_20px_rgba(255,255,255,0.1)] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                {!isSubmitting && <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;