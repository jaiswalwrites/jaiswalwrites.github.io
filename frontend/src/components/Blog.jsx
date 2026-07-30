import React, { useRef, useEffect, useState } from 'react';
import { blogs } from '../data/blogs';
import { Filter, BookOpen, Clock, ExternalLink } from 'lucide-react';
import useNetflixCarousel from '../hooks/useNetflixCarousel';

const BlogCard = ({ blog }) => (
  <a
    href={blog.link}
    target="_blank"
    rel="noopener noreferrer"
    className="group h-full flex flex-col glass-panel hover:bg-white/5 transition-all duration-500 overflow-hidden cursor-pointer"
  >
    {/* Image */}
    <div className="relative h-52 overflow-hidden shrink-0">
      <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500 z-10" />
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 z-20" />
      <div className="absolute bottom-4 left-4 z-30 flex items-center gap-2">
        <span className="px-3 py-1.5 rounded-full bg-black/60 border border-purple-500/30 text-purple-300 font-medium tracking-tight text-xs backdrop-blur-md">
          {blog.category}
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col flex-1">
      <div className="flex items-center gap-4 text-xs text-white/40 mb-3">
        <span>{blog.date}</span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" /> {blog.readTime}
        </span>
      </div>
      <h3 className="text-lg font-bold tracking-tight text-white mb-3 group-hover:text-purple-400 transition-colors duration-300 leading-snug">
        {blog.title}
      </h3>
      <p className="text-white/55 text-sm leading-relaxed font-light mb-6 flex-1 line-clamp-3">
        {blog.excerpt}
      </p>
      <div className="flex items-center gap-2 text-sm font-semibold text-purple-400 group-hover:text-purple-300 transition-colors mt-auto">
        <BookOpen className="w-4 h-4" />
        <span>Read on NeuralDocs</span>
        <ExternalLink className="w-3 h-3 ml-auto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </div>
  </a>
);

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

const Blog = () => {
  const [filter, setFilter] = useState('All');
  const sectionRef = useRef(null);
  const { emblaRef, selectedIndex, pause, resume, scrollTo, reInit, getDistance } = useNetflixCarousel();

  const categories = ['All', ...new Set(blogs.map(b => b.category))];
  const filteredBlogs = filter === 'All' ? blogs : blogs.filter(b => b.category === filter);
  const loopingBlogs = getLoopingItems(filteredBlogs);

  useEffect(() => { reInit(); }, [filter, reInit]);

  return (
    <section id="blog" ref={sectionRef} className="py-32 relative overflow-hidden bg-black border-t border-white/5">
      {/* Glow backgrounds */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-blob pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-12 text-center md:text-left">
          <span className="text-xs font-bold tracking-widest text-purple-400 uppercase font-mono">✦ Deep Dives & Insights</span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mt-3 mb-4">Insights & Publications</h2>
          <div className="w-24 h-px bg-gradient-to-r from-purple-400 to-indigo-400 mx-auto md:mx-0 mb-4" />
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto md:mx-0">
            Deep-dives into API specifications, automated style checkers, prompt patterns, and docs-as-code strategy
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-12">
          <div className="flex items-center gap-2 text-white/60 mr-2">
            <Filter className="w-4 h-4" />
            <span className="font-medium tracking-tight text-sm">Filter:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-5 py-2 rounded-full font-medium tracking-tight text-sm transition-all duration-300 ${
                  filter === category
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                    : 'glass-pill text-white/70 hover:bg-white/10 hover:text-white border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Netflix-style Carousel */}
        <div
          className="overflow-hidden w-full cursor-grab active:cursor-grabbing relative"
          style={{ isolation: 'isolate' }}
          ref={emblaRef}
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          <div className="flex touch-pan-y items-stretch py-10" style={{ backfaceVisibility: 'hidden' }}>
            {loopingBlogs.map((blog, index) => {
              const dist = getDistance(index, loopingBlogs.length);
              const isActive = dist === 0;
              const isNeighbor = dist === 1;
              return (
                <div
                  key={blog._uniqueKey}
                  className="flex-[0_0_85%] sm:flex-[0_0_70%] md:flex-[0_0_50%] lg:flex-[0_0_38%] min-w-0 px-3"
                >
                  <div
                    onClick={(e) => { if (!isActive) { e.preventDefault(); scrollTo(index); } }}
                    className="relative w-full h-full"
                    style={{
                      transform: isActive ? 'scale(1)' : isNeighbor ? 'scale(0.88)' : 'scale(0.78)',
                      opacity: isActive ? 1 : isNeighbor ? 0.55 : dist === 2 ? 0.2 : 0,
                      transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease, filter 0.5s ease',
                      zIndex: 10 - Math.min(dist, 4) * 2,
                      filter: isActive ? 'none' : 'grayscale(0.8)',
                    }}
                  >
                    {isActive && (
                      <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/25 to-indigo-500/25 blur-2xl z-[-1]" />
                    )}
                    <BlogCard blog={blog} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {filteredBlogs.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className="transition-all duration-300"
              style={{
                width: index === selectedIndex ? '24px' : '8px',
                height: '8px',
                borderRadius: '9999px',
                background: index === selectedIndex ? '#a855f7' : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
