import React, { useRef, useEffect, useState } from 'react';
import { blogs } from '../data/blogs';
import { Filter, BookOpen, Clock, X } from 'lucide-react';

const Blog = () => {
  const [filter, setFilter] = useState('All');
  const [visibleItems, setVisibleItems] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  const categories = ['All', ...new Set(blogs.map(b => b.category))];

  const filteredBlogs = filter === 'All' 
    ? blogs 
    : blogs.filter(blog => blog.category === filter);

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
  }, [filteredBlogs, visibleItems]);

  // Disable scroll when modal is open
  useEffect(() => {
    if (selectedBlog) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedBlog]);

  return (
    <section id="blog" ref={sectionRef} className="py-32 relative overflow-hidden bg-black border-t border-white/5">
      {/* Glow background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-blob" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-4">Insights & Publications</h2>
          <div className="w-24 h-px bg-gradient-to-r from-purple-400 to-indigo-400 mx-auto md:mx-0 mb-4" />
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto md:mx-0">
            Deep-dives into API specifications, automated style checkers, prompt patterns, and docs-as-code strategy
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-16">
          <div className="flex items-center gap-2 text-white/60 mr-2">
            <Filter className="w-4 h-4" />
            <span className="font-medium tracking-tight text-sm">Filter:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setFilter(category);
                  setVisibleItems([]); // Reset animation sequence
                }}
                className={`px-5 py-2 rounded-full font-medium tracking-tight text-sm transition-all duration-300 ${
                  filter === category
                    ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                    : 'glass-pill text-white/70 hover:bg-white/10 hover:text-white border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog, index) => (
            <div
              key={blog.id}
              ref={(el) => (itemRefs.current[index] = el)}
              onClick={() => setSelectedBlog(blog)}
              className={`transform cursor-pointer transition-all duration-700 ${
                visibleItems.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="group h-full glass-panel hover:bg-white/5 transition-all duration-500 overflow-hidden flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-white font-medium tracking-tight text-xs backdrop-blur-md">
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
                  <h3 className="text-lg font-bold tracking-tight text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed font-light mb-6 flex-1 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-purple-400 group-hover:text-purple-300 transition-colors">
                    <BookOpen className="w-4 h-4" />
                    <span>Read Article</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULL ARTICLE MODAL */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto glass-panel border border-white/15 bg-slate-950/95 shadow-2xl rounded-3xl p-8 md:p-12 animate-scale-in">
            {/* Close Button */}
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-6 right-6 p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="mb-6">
              <span className="px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 font-bold tracking-tight text-xs uppercase mb-4 inline-block">
                {selectedBlog.category}
              </span>
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight mb-4">
                {selectedBlog.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-white/55">
                <span>Published: {selectedBlog.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> {selectedBlog.readTime}
                </span>
              </div>
            </div>

            {/* Banner Image */}
            <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8 border border-white/10">
              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-invert max-w-none text-white/80 font-light leading-relaxed text-base space-y-6"
              dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;
