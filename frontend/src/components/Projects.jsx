import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, ChevronDown, ChevronUp, Cpu, Github, Layers, Play } from 'lucide-react';
import { Button } from './ui/button';
import ProjectPlayground from './ProjectPlayground';

const projectsData = [
  {
    id: '01',
    title: 'AI-Assisted Docs Generation Workflow',
    emoji: '🤖',
    description: 'An integrated workflow that utilizes LLMs to generate first-draft API documentation and architecture guides with 85% accuracy, reducing doc cycles.',
    domain: 'AI & Tooling',
    tags: ['LLM', 'Prompt Engineering', 'Vale Linter', 'Automation'],
    architecture: 'Raw Spec → LLM Draft Generation → Semantic Validation → Vale Style Linting → Human Review → Published Docs',
    github: 'https://github.com/jaiswalwrites/jaiswalwrites.github.io/tree/main/showcase-codebases/01-ai-docs-generation'
  },
  {
    id: '02',
    title: 'Developer Self-Service Portal with RAG',
    emoji: '🔍',
    description: 'A developer portal featuring an embedded RAG-powered chatbot that reduces support tickets by providing instant answers from existing documentation.',
    domain: 'Developer Experience',
    tags: ['RAG', 'Docusaurus', 'Vector Search', 'Chatbot'],
    architecture: 'User Query → Vector DB Search → Context Retrieval → LLM Response → Interactive Chat UI',
    github: 'https://github.com/jaiswalwrites/jaiswalwrites.github.io/tree/main/showcase-codebases/02-dev-portal-rag'
  },
  {
    id: '03',
    title: 'Persona-Driven Content Architecture',
    emoji: '🗺️',
    description: 'A modular content strategy framework designing documentation pathways based on user personas (Developer, DevOps, Security Admin) for faster onboarding.',
    domain: 'Content Strategy',
    tags: ['Information Architecture', 'User Personas', 'UX Design', 'Content Modeling'],
    architecture: 'User Journey Mapping → Persona Identification → Modular Topic Design → Contextual Linking → Targeted Delivery',
    github: 'https://github.com/jaiswalwrites/jaiswalwrites.github.io/tree/main/showcase-codebases/03-persona-content-architecture'
  },
  {
    id: '04',
    title: 'Docs-as-Code CI/CD Pipeline',
    emoji: '⚙️',
    description: 'A fully automated Docs-as-Code pipeline using GitHub Actions, enabling parallel building, link checking, and deployment of Markdown documentation.',
    domain: 'Docs-as-Code',
    tags: ['GitHub Actions', 'Markdown', 'CI/CD', 'Automated Testing'],
    architecture: 'Git Commit → PR Trigger → Markdown Linting → Dead Link Check → Build Docs (Docusaurus) → Vercel Deploy',
    github: 'https://github.com/jaiswalwrites/jaiswalwrites.github.io/tree/main/showcase-codebases/04-docs-cicd-pipeline'
  },
  {
    id: '05',
    title: 'Documentation Analytics & Feedback Loop',
    emoji: '📈',
    description: 'Integration of Pendo and custom feedback widgets to track user engagement, session replays, and NPS to drive data-informed content updates.',
    domain: 'Content Strategy',
    tags: ['Analytics', 'Pendo', 'NPS', 'Feedback Loop'],
    architecture: 'User Interaction → Event Tracking → Dashboard Aggregation → Insight Generation → Content Refinement',
    github: 'https://github.com/jaiswalwrites/jaiswalwrites.github.io/tree/main/showcase-codebases/05-docs-analytics-framework'
  },
  {
    id: '06',
    title: 'Semantic Context Sync Engine',
    emoji: '🔄',
    description: 'A background sync service that tracks documentation updates and automatically updates vector embeddings for AI assistants in real-time.',
    domain: 'AI & Tooling',
    tags: ['Embeddings', 'Sync Engine', 'Vector DB', 'Automation'],
    architecture: 'Markdown Update → Webhook Trigger → Semantic Chunking → Embedding Generation → Vector DB Update',
    github: 'https://github.com/jaiswalwrites/jaiswalwrites.github.io/tree/main/showcase-codebases/06-semantic-context-sync'
  },
  {
    id: '07',
    title: 'Vale Style Guide Ruleset Engine',
    emoji: '📝',
    description: 'Custom YAML rulesets to enforce Microsoft Style Guide, branding guidelines, and inclusive language checks across Markdown via CI/CD.',
    domain: 'Docs-as-Code',
    tags: ['Vale Linter', 'YAML', 'Style Guide', 'CI/CD'],
    architecture: 'Git Push → GitHub Actions Vale Runner → Custom Rule Validation (Tone/Spelling) → PR Status Check',
    github: 'https://github.com/jaiswalwrites/jaiswalwrites.github.io/tree/main/showcase-codebases/07-vale-style-guide'
  },
  {
    id: '08',
    title: 'Automated Markdown Link Checker',
    emoji: '🔗',
    description: 'A scheduled GitHub Actions workflow running markdown-link-check to automatically detect and flag 404s and broken links in production documentation.',
    domain: 'Docs-as-Code',
    tags: ['Link Checking', 'Automation', 'GitHub Actions', 'Maintenance'],
    architecture: 'Nightly Cron Job → Markdown Parsing → HTTP Status Validation → GitHub Issue Auto-Creation',
    github: 'https://github.com/jaiswalwrites/jaiswalwrites.github.io/tree/main/showcase-codebases/08-automated-link-checker'
  },
  {
    id: '09',
    title: 'OpenAPI to Markdown Pipeline',
    emoji: '⚡',
    description: 'Automated pipeline script that parses OpenAPI 3.0 specs (JSON/YAML) into beautifully structured, modular Markdown files suitable for static site generators.',
    domain: 'AI & Tooling',
    tags: ['OpenAPI', 'Swagger', 'Python Scripts', 'API Docs'],
    architecture: 'OpenAPI Spec Commit → Python Parsing Script → Jinja2 Templates → Markdown Generation → Docusaurus Build',
    github: 'https://github.com/jaiswalwrites/jaiswalwrites.github.io/tree/main/showcase-codebases/09-openapi-to-markdown'
  },
  {
    id: '10',
    title: 'Playwright Visual Regression for Docs',
    emoji: '👁️',
    description: 'Automated UI testing scripts that capture screenshots of documentation pages on staging servers to catch CSS/layout regressions before publishing.',
    domain: 'Developer Experience',
    tags: ['Playwright', 'UI Testing', 'Visual Regression', 'Quality Assurance'],
    architecture: 'Docs Build Staging → Playwright Navigation → Screenshot Capture → Baseline Image Comparison → Delta Report',
    github: 'https://github.com/jaiswalwrites/jaiswalwrites.github.io/tree/main/showcase-codebases/10-playwright-visual-regression'
  },
  {
    id: '11',
    title: 'Algolia DocSearch Implementation',
    emoji: '🔎',
    description: 'Configuration and integration of Algolia DocSearch crawler to implement highly relevant, typo-tolerant semantic search across a static docs site.',
    domain: 'Developer Experience',
    tags: ['Algolia Search', 'Crawler Config', 'SEO', 'Discoverability'],
    architecture: 'Deployed Docs → Algolia Crawler Parsing → Indexing (H1/H2/H3 tags) → Frontend Search Component Integration',
    github: 'https://github.com/jaiswalwrites/jaiswalwrites.github.io/tree/main/showcase-codebases/11-algolia-docsearch'
  },
  {
    id: '12',
    title: 'LLM Auto-Glossary Extractor',
    emoji: '📚',
    description: 'A Python utility that analyzes dense technical articles using LLMs to automatically identify key terminology, generate definitions, and build a linked glossary.',
    domain: 'AI & Tooling',
    tags: ['Python', 'LLM', 'Information Extraction', 'Content Strategy'],
    architecture: 'Raw Article Text → LLM Entity Recognition → Definition Generation → JSON Output → Markdown Glossary Page',
    github: 'https://github.com/jaiswalwrites/jaiswalwrites.github.io/tree/main/showcase-codebases/12-llm-auto-glossary'
  },
  {
    id: '13',
    title: 'Doc PR Review AI Bot',
    emoji: '🤖',
    description: 'A GitHub App that hooks into PRs and utilizes LLMs to review documentation specifically for tone, passive voice, and clarity before human review.',
    domain: 'AI & Tooling',
    tags: ['GitHub Apps', 'AI Review', 'Code Review Automation'],
    architecture: 'PR Creation → Webhook Event → LLM Diff Analysis → Inline GitHub PR Comments (Suggestions)',
    github: 'https://github.com/jaiswalwrites/jaiswalwrites.github.io/tree/main/showcase-codebases/13-doc-pr-review-bot'
  },
  {
    id: '14',
    title: 'Automated Release Notes Generator',
    emoji: '🚀',
    description: 'A CI/CD pipeline script that aggregates merged PR titles, GitHub tags, and Jira labels to automatically draft structured, formatted release notes.',
    domain: 'Docs-as-Code',
    tags: ['Release Management', 'Bash', 'GitHub API', 'Jira API'],
    architecture: 'Tag Release → Aggregate PRs by Label → Fetch Jira Descriptions → Format into Markdown → Draft GitHub Release',
    github: 'https://github.com/jaiswalwrites/jaiswalwrites.github.io/tree/main/showcase-codebases/14-automated-release-notes'
  },
  {
    id: '15',
    title: 'Multi-Version Docs Routing Architecture',
    emoji: '🔀',
    description: 'Advanced routing configuration for documentation generators to handle v1, v2, and enterprise versioned documentation seamlessly.',
    domain: 'Content Strategy',
    tags: ['Versioning', 'Information Architecture', 'Nextra/Docusaurus'],
    architecture: 'Versioned Directories → Router Config Mapping → Dropdown UI Component → Context-Aware Internal Linking',
    github: 'https://github.com/jaiswalwrites/jaiswalwrites.github.io/tree/main/showcase-codebases/15-multi-version-routing'
  },
  {
    id: '16',
    title: 'Content Linter Pre-Commit Hook',
    emoji: '🛡️',
    description: 'Husky Git hooks that strictly enforce formatting, preventing developers from committing Markdown files with malformed frontmatter or trailing whitespaces.',
    domain: 'Docs-as-Code',
    tags: ['Husky', 'Git Hooks', 'Prettier', 'MarkdownLint'],
    architecture: 'git commit → Husky Pre-commit → Prettier Formatting → MarkdownLint Check → Commit Acceptance/Rejection',
    github: 'https://github.com/jaiswalwrites/jaiswalwrites.github.io/tree/main/showcase-codebases/16-content-linter-hooks'
  }
];

const domainColors = {
  'AI & Tooling': '#f59e0b',
  'Developer Experience': '#ef4444',
  'Docs-as-Code': '#10b981',
  'Content Strategy': '#8b5cf6',
};

const ProjectCard = ({ project, isVisible, index, onPlaygroundClick }) => {
  const [expanded, setExpanded] = useState(false);
  const color = domainColors[project.domain] || '#3b82f6';

  return (
    <div 
      className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      style={{ transitionDelay: `${index * 0.05}s` }}
    >
      <div className={`group h-full glass-panel hover:bg-white/5 transition-all duration-500 overflow-hidden flex flex-col border-white/5 hover:border-white/10`}>
        {/* Header Block */}
        <div className="p-8 pb-4 flex-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border" style={{ color, borderColor: `${color}40`, backgroundColor: `${color}08` }}>
              {project.domain}
            </span>
            <span className="text-white/20 text-xs font-mono font-bold">Codebase {project.id}</span>
          </div>

          <h3 className="text-xl font-semibold tracking-tighter text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
            <span className="mr-2 text-2xl inline-block align-middle">{project.emoji}</span>
            <span className="align-middle">{project.title}</span>
          </h3>

          <p className="text-white/60 text-sm leading-relaxed mb-6 font-light">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.map((tag, i) => (
              <span key={i} className="text-[10px] font-semibold text-white/50 px-2 py-0.5 rounded bg-white/5 border border-white/5">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Expandable Architecture flow */}
        <div className="px-8 pb-4">
          <button 
            onClick={() => setExpanded(!expanded)} 
            className="flex items-center gap-1.5 text-xs font-bold text-white/60 hover:text-white transition-colors uppercase tracking-widest"
          >
            <Layers className="w-3.5 h-3.5" style={{ color }} />
            {expanded ? 'Hide Architecture' : 'View Architecture Flow'}
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {expanded && (
            <div className="mt-4 p-4 rounded-xl border border-white/5 bg-black/40 text-[11px] leading-relaxed text-white/70 font-light">
              <div className="flex flex-wrap items-center gap-1.5 font-mono">
                {project.architecture.split('→').map((step, idx, arr) => (
                  <React.Fragment key={idx}>
                    <span className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] text-white/80">
                      {step.trim()}
                    </span>
                    {idx < arr.length - 1 && <span className="text-white/30" style={{ color }}>➔</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Footer Actions */}
        <div className="px-8 py-5 border-t border-white/5 mt-auto flex items-center justify-between bg-black/20">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-cyan-400 font-medium tracking-tight text-xs group/link transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            Explore Codebase
            <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
          
          <button
            onClick={onPlaygroundClick}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-[10px] font-semibold tracking-wider transition-all shadow-[0_0_10px_rgba(6,182,212,0.1)] hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:-translate-y-px"
          >
            <Play className="w-2.5 h-2.5 fill-cyan-400 text-cyan-400" />
            Try Yourself
          </button>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const [playgroundProject, setPlaygroundProject] = useState(null);
  const sectionRef = useRef(null);

  const domains = ['All', 'AI & Tooling', 'Docs-as-Code', 'Content Strategy', 'Developer Experience'];

  const filteredProjects = filter === 'All'
    ? projectsData
    : projectsData.filter(project => project.domain === filter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative overflow-hidden bg-black border-t border-white/5">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">⚡ Documentation & AI Ecosystems</span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mt-3 mb-4">Technical Writer Showcase</h2>
          <div className="w-24 h-px bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto md:mx-0 mb-4" />
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto md:mx-0">
            Real-world implementations demonstrating modern documentation workflows, AI-assisted content strategy, and docs-as-code automation.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-12">
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setFilter(dom)}
              className={`px-5 py-2 rounded-full font-medium tracking-tight text-xs transition-all duration-300 ${
                filter === dom
                  ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                  : 'glass-pill text-white/70 hover:bg-white/10 hover:text-white border-white/10'
              }`}
            >
              {dom}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              isVisible={isVisible} 
              index={index} 
              onPlaygroundClick={() => setPlaygroundProject(project)}
            />
          ))}
        </div>
      </div>
      
      {playgroundProject && (
        <ProjectPlayground 
          project={playgroundProject} 
          onClose={() => setPlaygroundProject(null)} 
        />
      )}
    </section>
  );
};

export default Projects;
