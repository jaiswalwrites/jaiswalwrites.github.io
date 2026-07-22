import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, ChevronDown, ChevronUp, Cpu, Github, Layers } from 'lucide-react';
import { Button } from './ui/button';

const projectsData = [
  {
    id: '01',
    title: 'Global Context MCP Router Gateway',
    emoji: '🔌',
    description: 'Enterprise intent routing gateway implementing the Model Context Protocol (MCP). Dynamically routes query prompts to target context servers.',
    domain: 'AI & Agents',
    tags: ['FastAPI', 'Pydantic', 'MCP Spec', 'Intent Routing'],
    architecture: 'Prompt Input → Intent Classification → MCP Router → Node Query Dispatch → Context Aggregator',
    github: 'https://github.com/jaiswalwrites/Global-Context-MCP-Gateway-Model-COntext-Protocol-Router-'
  },
  {
    id: '02',
    title: 'DevSecOps Autonomous AST Patching Agent',
    emoji: '🛡️',
    description: 'Security transformation engine utilizing python AST (Abstract Syntax Tree) manipulation to automatically repair code execution vulnerabilities.',
    domain: 'Security & DevSecOps',
    tags: ['Python AST', 'astor', 'Static Analysis', 'Auto-Remediation'],
    architecture: 'Source Code → AST Parse → Visitor Scan → eval() Call Found → Replace with literal_eval → astor Compile',
    github: 'https://github.com/jaiswalwrites/DevSecOps-Autonomous-Patching-Agent'
  },
  {
    id: '03',
    title: 'Multi-Agent Consensus Debate Loop',
    emoji: '🤝',
    description: 'Orchestrator driving security, linter, and performance critic agents into a structured score-moderation consensus loop before output execution.',
    domain: 'AI & Agents',
    tags: ['Pydantic', 'Multi-Agent', 'Consensus Score', 'Critic Debate'],
    architecture: 'LLM Code → Critic Agent Matrix → Divergent Feedback → Debate Round → Arbiter Resolution → Approved Code',
    github: 'https://github.com/jaiswalwrites/Multi-Agent-Consensus-Loop'
  },
  {
    id: '04',
    title: 'Automated Cloud Billing Audit Engine',
    emoji: '📊',
    description: 'Data ingestion pipeline running rolling Z-Score moving standard deviations over AWS/GCP cost tables to isolate anomalies.',
    domain: 'MLOps & Data',
    tags: ['Pandas', 'NumPy', 'Z-Score Analysis', 'Anomaly Detection'],
    architecture: 'Daily Cost Logs → Pandas Ingestion → Rolling Moving StdDev → Threshold Check (Z > 2.5) → Billing Alert Trigger',
    github: 'https://github.com/jaiswalwrites/Automated-Cloud-Billing-Audit-Engine'
  },
  {
    id: '05',
    title: 'Universal REST to GraphQL Adapter',
    emoji: '🔄',
    description: 'FastAPI proxy translator middleware that dynamically compiles incoming REST requests into optimized GraphQL schemas.',
    domain: 'Systems & Hardware',
    tags: ['FastAPI', 'GraphQL Compiler', 'HTTP Middleware', 'Dynamic Mapping'],
    architecture: 'REST POST /users → Parameter Mapper → GraphQL Compiler → Query String Compile → Unified GraphQL Call',
    github: 'https://github.com/jaiswalwrites/Universal-REST-to-GraphQL-Adapter'
  },
  {
    id: '06',
    title: 'Semantic Document Ingestion Pipeline',
    emoji: '🧠',
    description: 'Recursive text processing utility chunking raw document strings, generating vector representations, and saving blocks in an SQLite index.',
    domain: 'MLOps & Data',
    tags: ['SQLite', 'NumPy', 'Document Chunking', 'Vector Ingest'],
    architecture: 'Raw Documents → Recursive Chunker (Overlap 20) → Embeddings Run → Float Array serialization → SQLite Binary Blob',
    github: 'https://github.com/jaiswalwrites/Semantic-Document-Ingestion-Pipeline'
  },
  {
    id: '07',
    title: 'LLM Quantization Edge Inference Suite',
    emoji: '📱',
    description: 'Hardware footprint benchmarker evaluating model footprints (RAM, CPU throttling, latency curves) of quantized INT4 model weights.',
    domain: 'Systems & Hardware',
    tags: ['psutil', 'INT4 Quantization', 'Model Latency', 'Edge Profiling'],
    architecture: 'Model Execution → RAM RSS Monitoring → Generation latency tracker → Metrics Output → Quantization Report',
    github: 'https://github.com/jaiswalwrites/LLM-Quantization-Edge-Inference-Suite'
  },
  {
    id: '08',
    title: 'Custom Accelerator Prompt Compiler',
    emoji: '⚡',
    description: 'Prompt compiler packing strings into token structures aligned for custom accelerator silicon register sequences.',
    domain: 'Systems & Hardware',
    tags: ['NumPy', 'Token Padding', 'Tensor Alignment', 'Hardware Spec'],
    architecture: 'Prompt String → Hash Vocab map → Length Check → Token Matrix Pad → INT32 Accelerator Tensor compile',
    github: 'https://github.com/jaiswalwrites/Custom-Accelerator-Prompt-Compiler'
  },
  {
    id: '09',
    title: 'Semantic Cache API Gateway Proxy',
    emoji: '💾',
    description: 'High-performance API Gateway routing layer calculating cosine similarity vectors to fetch prompt completions from cache indices.',
    domain: 'AI & Agents',
    tags: ['FastAPI', 'Cosine Similarity', 'Caching Proxy', 'In-Memory DB'],
    architecture: 'Prompt Input → Similarity Check (Threshold 0.92) → Match Cache Found → return Cached Response → Bypassed API Call',
    github: 'https://github.com/jaiswalwrites/Semantic-Cache-API-Gateway'
  },
  {
    id: '10',
    title: 'Real-Time Data Drift Pipeline',
    emoji: '📡',
    description: 'MLOps pipeline calculating Population Stability Index (PSI) values with Laplace smoothing to monitor streaming inputs for concept drift.',
    domain: 'MLOps & Data',
    tags: ['NumPy', 'PSI Algorithm', 'Laplace Smoothing', 'Model Drift'],
    architecture: 'Baseline Distribution → Ingress Data Stream → Quantile Histogram Bins → PSI Calculation → Drift Alert (PSI > 0.2)',
    github: 'https://github.com/jaiswalwrites/Real-Time-Data-Drift-Pipeline'
  },
  {
    id: '11',
    title: 'LLM Guardrails PII Gateway',
    emoji: '🤐',
    description: 'Security proxy filtering dynamic PII elements (emails, phone formats) via optimized regex rules before upstream API submission.',
    domain: 'Security & DevSecOps',
    tags: ['FastAPI', 'Regex Compilers', 'Data Masking', 'Proxy Gateway'],
    architecture: 'User Prompt → Regex PII Filter → Anonymization Match → Tag Masks ([MASKED_EMAIL]) → Clean prompt dispatch',
    github: 'https://github.com/jaiswalwrites/LLM-Guardrails-PII-Gateway'
  },
  {
    id: '12',
    title: 'Dynamic RAG Directory Sync Engine',
    emoji: '📁',
    description: 'Background scanning daemon tracking directory modification times to increment document indices inside knowledge bases.',
    domain: 'MLOps & Data',
    tags: ['watchdog', 'SQLite Index', 'Background Daemon', 'Thread Safety'],
    architecture: 'Local Directory → os.walk Scanner → File Time Tracker (mtime) → Change Detected → Index SQLite Registry update',
    github: 'https://github.com/jaiswalwrites/Dynamic-RAG-Sync-Engine'
  },
  {
    id: '13',
    title: 'Predictive Agentic BI Text-to-SQL Tool',
    emoji: '🔮',
    description: 'SQL adapter routing natural language inquiries into compiled database scripts. Operates in read-only mode to prevent SQL injections.',
    domain: 'AI & Agents',
    tags: ['Pandas', 'SQLite ro', 'Text-to-SQL', 'BI Analytics'],
    architecture: 'Inquiry → SQL Query Compiler → Read-Only Db check → Query run → Pandas metrics layout generation',
    github: 'https://github.com/jaiswalwrites/Predictive-Agentic-BI-Tool'
  },
  {
    id: '14',
    title: 'Decentralized AI Coordinate SDK',
    emoji: '🌐',
    description: 'Networking coordination library spinning up multithreaded socket peers to evaluate local latencies and orchestrate distributed tasks.',
    domain: 'Systems & Hardware',
    tags: ['sockets', 'P2P Network', 'Multithreading', 'Latency Pings'],
    architecture: 'Host node start → Socket listener thread run → Ping peer registers → Capability matching exchange → Task allocation',
    github: 'https://github.com/jaiswalwrites/Decentralized-AI-Coordinate-SDK'
  },
  {
    id: '15',
    title: 'AI-Powered RAG Directory Sync Organizer',
    emoji: '🧹',
    description: 'File manager parsing text layouts, sorting documents semantically using density metrics, and structuring output directories.',
    domain: 'MLOps & Data',
    tags: ['scikit-learn', 'Semantic Sort', 'shutil utility', 'File Clustering'],
    architecture: 'Source Folder → Read text layouts → Density Classification → Destination create → shutil file relocation',
    github: 'https://github.com/jaiswalwrites/AI-Powered-RAG-Directory-Sync'
  }
];

const domainColors = {
  'AI & Agents': '#f59e0b',
  'Security & DevSecOps': '#ef4444',
  'MLOps & Data': '#10b981',
  'Systems & Hardware': '#8b5cf6',
};

const ProjectCard = ({ project, isVisible, index }) => {
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
        <div className="p-8 pt-4 border-t border-white/5 mt-auto">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white hover:text-cyan-400 font-medium tracking-tight text-sm group/link transition-colors"
          >
            <Github className="w-4 h-4" />
            Explore Codebase
            <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const domains = ['All', 'AI & Agents', 'MLOps & Data', 'Systems & Hardware', 'Security & DevSecOps'];

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
    <section id="projects" ref={sectionRef} className="py-32 relative overflow-hidden bg-black border-t border-white/5">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">⚡ Production Implementations</span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mt-3 mb-4">AI Engineering Showcase</h2>
          <div className="w-24 h-px bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto md:mx-0 mb-4" />
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto md:mx-0">
            15 standalone production repositories demonstrating agentic patterns, edge inference optimizations, and secure cloud metrics.
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
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
