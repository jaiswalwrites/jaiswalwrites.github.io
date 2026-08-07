import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, Zap, CheckCircle2, Layers, Cpu, Sparkles, X, ShieldAlert, Rocket, Code2, Terminal, FileText, Play, Pause, RotateCcw, Copy, Check } from 'lucide-react';

export const pipelineStrategies = [
  {
    id: '01',
    title: 'Orthodox Docs → AI-Friendly Specs Pipeline',
    category: 'AI & RAG',
    problem: 'Traditional HTML/PDF docs cannot be ingested accurately by AI coding assistants or RAG models due to noisy layouts and unstructured headers.',
    impact: '100% LLM Context Accuracy & zero AI hallucinations during code generation.',
    pipeline: [
      { label: 'Legacy Docs', desc: 'Raw HTML / PDF / Confluence' },
      { label: 'AST Parser', desc: 'MDX & Semantic Structure Normalizer' },
      { label: 'Header Chunking', desc: 'Hierarchical Token Splitting' },
      { label: 'AI Spec Artifact', desc: 'Clean Markdown for LLM & RAG Index' }
    ],
    architecture: 'Raw Legacy HTML/PDF → Python BeautifulSoup/AST Parser → Semantic Section Chunking → Validated Clean MDX/JSON Spec → LLM Context Ingestion Engine',
    philosophy: 'AI coding tools like Cursor and GitHub Copilot require deterministic, structured Markdown headers. Stripping presentation noise unlocks 10x retrieval quality.',
    rawInput: `<!-- Raw Unstructured Legacy HTML -->
<div class="legacy-doc-container">
  <h1 class="header-bold">Authentication Endpoint v1</h1>
  <p>To call this API, send a POST request with basic auth headers...</p>
  <table><tr><td>Header</td><td>Value</td></tr></table>
</div>`,
    rawOutput: `# Authentication Endpoint v1

> **Category**: API Authentication  
> **Target LLM Context**: High-Priority Spec  

## Overview
Send a POST request with Basic Authentication headers.

### Required Headers
| Header | Type | Required | Description |
|---|---|---|---|
| Authorization | String | Yes | Bearer token format |`,
    codebase: `# python/ast_mdx_normalizer.py
import re
from bs4 import BeautifulSoup

def normalize_html_to_ai_mdx(html_content: str) -> str:
    """Parses legacy HTML and normalizes into deterministic MDX for LLM context."""
    soup = BeautifulSoup(html_content, 'html.parser')
    for elem in soup.find_all(['script', 'style', 'nav']):
        elem.decompose()
    
    headers = soup.find_all(['h1', 'h2', 'h3'])
    mdx_out = []
    for h in headers:
        level = '#' * int(h.name[1])
        mdx_out.append(f"{level} {h.get_text().strip()}")
    
    return "\\n\\n".join(mdx_out)`
  },
  {
    id: '02',
    title: 'Legacy Wiki → RAG-Powered Vector Knowledge Graph',
    category: 'AI & RAG',
    problem: 'Scattered internal wikis cause developer frustration and slow resolution for basic architecture questions.',
    impact: '65% decrease in internal developer support tickets.',
    pipeline: [
      { label: 'Wiki Crawler', desc: 'Confluence & Notion API Sync' },
      { label: 'Semantic Chunker', desc: 'Context-Aware Overlapping Windows' },
      { label: 'Embedding Model', desc: 'OpenAI text-embedding-3-large' },
      { label: 'Vector Knowledge', desc: 'Qdrant / Pinecone Index + Chatbot' }
    ],
    architecture: 'Notion/Confluence Webhook → Recursive Text Splitter → OpenAI Embeddings API → Vector DB Indexing → Hybrid RAG Search API',
    philosophy: 'Knowledge should be retrieved, not manually searched. Embedding documentation into a high-density vector space gives developers instant, accurate answers.',
    rawInput: `{
  "wiki_page_id": "conf_9921",
  "title": "OAuth2 Refresh Token Invalidation",
  "body": "When a refresh token expires after 30 days, the auth server returns 401 invalid_grant..."
}`,
    rawOutput: `{
  "chunk_id": "vec_881",
  "embedding": [0.012, -0.045, 0.089, 0.003, ...],
  "metadata": {
    "source": "OAuth2 Refresh Token Invalidation",
    "section": "Token Expiry Handlers",
    "token_count": 142
  }
}`,
    codebase: `# python/rag_vector_indexer.py
from langchain.text_splitter import RecursiveCharacterTextSplitter
from qdrant_client import QdrantClient
from openai import OpenAI

client = OpenAI()
qdrant = QdrantClient(url="https://qdrant.cluster.internal")

def index_wiki_page(title: str, text: str):
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = splitter.split_text(text)
    
    for i, chunk in enumerate(chunks):
        res = client.embeddings.create(input=chunk, model="text-embedding-3-large")
        vector = res.data[0].embedding
        qdrant.upsert(collection_name="docs_kb", points=[{
            "id": f"{title}_{i}",
            "vector": vector,
            "payload": {"text": chunk, "title": title}
        }])`
  },
  {
    id: '03',
    title: 'Manual Spec Writing → Spec-First OpenAPI Pipeline',
    category: 'Docs-as-Code',
    problem: 'Code and API documentation drift apart, creating broken code samples and developer distrust.',
    impact: '0 API drift & 90% faster doc release cycles.',
    pipeline: [
      { label: 'Git Spec Commit', desc: 'OpenAPI 3.0 YAML in Code Repo' },
      { label: 'Semantic Linter', desc: 'Spectral Rule Engine Check' },
      { label: 'Markdown Generator', desc: 'Jinja2 Template Transformer' },
      { label: 'Live API Portal', desc: 'Interactive Swagger & Try-It Console' }
    ],
    architecture: 'Git Spec Push → Spectral OpenAPI Linter → Python MDX Generator → Static Site Generator Build (Docusaurus) → Production Deploy',
    philosophy: 'The API specification IS the source of truth. By generating documentation directly from version-controlled OpenAPI specs, documentation never lags behind code.',
    rawInput: `openapi: 3.0.0
info:
  title: Payment Gateway API
  version: 1.0.0
paths:
  /v1/charge:
    post:
      summary: Process Credit Card Charge`,
    rawOutput: `# /v1/charge (POST)

### Summary
Process Credit Card Charge

\`\`\`bash
curl -X POST https://api.payments.com/v1/charge \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{"amount": 5000, "currency": "usd"}'
\`\`\``,
    codebase: `# scripts/openapi_to_mdx.py
import yaml
import jinja2

TEMPLATE = """
# {{ title }} (v{{ version }})

{% for path, methods in paths.items() %}
## {{ path }}
{% for method, details in methods.items() %}
### {{ method.upper() }} - {{ details.summary }}
{% endfor %}
{% endfor %}
"""

def generate_docs(spec_path: str):
    with open(spec_path) as f:
        spec = yaml.safe_load(f)
    t = jinja2.Template(TEMPLATE)
    return t.render(title=spec['info']['title'], version=spec['info']['version'], paths=spec['paths'])`
  },
  {
    id: '04',
    title: 'Manual PR Reviews → AI + Vale Style Gatekeeper',
    category: 'Automation',
    problem: 'Inconsistent tone, passive voice, and branding typos slipping into production docs due to manual review bottlenecks.',
    impact: '100% style guide adherence before human review.',
    pipeline: [
      { label: 'Doc PR Created', desc: 'Developer submits Markdown PR' },
      { label: 'Vale Linter', desc: 'Microsoft & Custom Style Checks' },
      { label: 'LLM Clarity Audit', desc: 'Passive Voice & Tone Analysis' },
      { label: 'Inline PR Feedback', desc: 'Automated GitHub Review Comments' }
    ],
    architecture: 'PR Created → GitHub Actions Trigger → Vale CLI Runner → LLM Diff Reviewer → GitHub PR Review API Commenter',
    philosophy: 'Automate mechanical rules so human technical writers can focus on deep architecture diagrams and developer journeys.',
    rawInput: `# Getting Started
The configuration file should be modified by the user before the application is executed.`,
    rawOutput: `[VALE WARNING] Line 2: Avoid passive voice ("should be modified by the user").
SUGGESTION: "Modify the configuration file before executing the application."`,
    codebase: `# .github/workflows/vale-linter.yml
name: Documentation Style Linter
on: [pull_request]

jobs:
  vale:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Vale Style Check
        uses: errata-ai/vale-action@v2
        with:
          files: 'docs/'
          styles: 'Microsoft, Google, CustomBrand'
          fail_on_error: true
  },
  {
    id: '19',
    title: 'Structured DITA XML & Oxygen DTP Publishing Pipeline',
    category: 'DITA & DTP',
    problem: 'Enterprise multi-channel documentation requires strict XML validation, conditional profiling (DITAVAL), and pixel-perfect DTP PDF/HTML publishing without manual formatting errors.',
    impact: '100% Schema Compliance, automated DITAMAP validation & 400-page legacy document converted into modular DITA-OT outputs.',
    pipeline: [
      { label: 'Oxygen DITAMAP', desc: 'Hierarchy & Topic Structuring' },
      { label: 'DITAVAL Profiling', desc: 'Conditional Audience/Platform Filtering' },
      { label: 'Schematron Linter', desc: 'Oxygen XML Validation Rules' },
      { label: 'DITA-OT / DTP Build', desc: 'Custom XSL-FO PDF & HTML5 Publishing' }
    ],
    architecture: 'Oxygen XML Editor (.ditamap & .xml) → DITAVAL Conditional Filtering → Schematron Rule Engine → IXIASOFT DITA CMS / DITA-OT Pipeline → PDF & Web Portal DTP Publishing',
    philosophy: 'Single-source authoring with DITA XML ensures absolute consistency, zero content duplication, and automated multi-format Desktop Publishing (DTP) for complex enterprise platforms.',
    rawInput: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE map PUBLIC "-//OASIS//DTD DITA Map//EN" "map.dtd">
<map title="Skyhigh CASB Security Guide">
  <topicref href="concepts/casb_overview.dita" navtitle="Overview"/>
  <topicref href="tasks/configure_dlp_policy.dita" navtitle="DLP Configuration" audience="admin"/>
  <topicref href="references/api_endpoints.dita" navtitle="API References" platform="cloud"/>
</map>`,
    rawOutput: `<!-- DITAVAL Filtered Output (Audience: Admin, Platform: Cloud) -->
<pdf-dtp-output-manifest>
  <book-title>Skyhigh CASB Security Guide</book-title>
  <chapter-count>3</chapter-count>
  <compiled-topics>
    <topic status="validated">concepts/casb_overview.dita</topic>
    <topic status="filtered_pass">tasks/configure_dlp_policy.dita</topic>
    <topic status="filtered_pass">references/api_endpoints.dita</topic>
  </compiled-topics>
  <dtp-target>Oxygen PDF Chemistry / DITA-OT 4.1</dtp-target>
</pdf-dtp-output-manifest>`,
    codebase: `# dita_ot_publish.sh
#!/bin/bash
# DITA-OT Automated DTP Build Script for Oxygen XML Editor Projects

DITA_MAP="maps/skyhigh_casb_master.ditamap"
DITAVAL_FILTER="filters/enterprise_admin.ditaval"
OUTPUT_DIR="dist/pdf"

echo "[BUILD] Validating DITA XML map with Oxygen Schematron rules..."
dita --input="$DITA_MAP" --filter="$DITAVAL_FILTER" --format=pdf --output="$OUTPUT_DIR" \\
     -Dpdf.formatter=fop \\
     -Dargs.css=styles/custom_dtp_theme.css

echo "[SUCCESS] PDF DTP Published cleanly to $OUTPUT_DIR"`
  }
];

const categories = ['All', 'AI & RAG', 'Docs-as-Code', 'DITA & DTP', 'Automation', 'Dev Experience'];

const VisualPipelineBuilder = () => {
  const [selectedStrategy, setSelectedStrategy] = useState(pipelineStrategies[0]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('pipeline'); // 'pipeline' | 'codebase' | 'rawdata'
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const filteredStrategies = activeCategory === 'All'
    ? pipelineStrategies
    : pipelineStrategies.filter(s => s.category === activeCategory);

  // Animated execution loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStepIndex(prev => (prev + 1) % selectedStrategy.pipeline.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [selectedStrategy, isPlaying]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* COMPACT BENTO TILE VIEW (Fits cleanly inside Bento Grid) */}
      <div 
        onClick={() => setIsStudioOpen(true)}
        className="glass-panel p-6 md:p-8 border-white/10 hover:border-[#00f0ff]/50 transition-all duration-500 font-sans relative flex flex-col justify-between overflow-hidden cursor-pointer group shadow-[0_0_30px_rgba(0,0,0,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.2)]"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#00f0ff]/15 via-purple-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-700" />
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff]">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold font-mono tracking-widest text-[#00f0ff] uppercase">Interactive Solution Studio</span>
                <h3 className="text-lg font-bold text-white tracking-tight">Real-Time Visual Architecture Engine</h3>
              </div>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-mono font-bold animate-pulse">
              ● Live Interactive Playground
            </span>
          </div>

          <p className="text-white/60 text-sm leading-relaxed mb-6 font-light max-w-3xl">
            Simulate 18+ enterprise documentation problems & solution pipelines in real-time. View live node execution, raw data transformations, and actual production codebases.
          </p>

          {/* Node Flow Preview Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-black/60 border border-white/10 mb-6">
            {selectedStrategy.pipeline.map((step, idx) => (
              <div key={idx} className={`p-2.5 rounded-lg border text-xs font-mono transition-all ${
                idx === activeStepIndex ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-white shadow-[0_0_15px_rgba(0,240,255,0.3)]' : 'bg-white/5 border-white/5 text-white/50'
              }`}>
                <div className="text-[10px] text-white/40 font-bold mb-0.5">Node 0{idx + 1}</div>
                <div className="truncate font-semibold">{step.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono">
          <span className="text-white/50">Strategy: <strong className="text-white font-bold">{selectedStrategy.title}</strong></span>
          <button className="px-4 py-2 rounded-lg bg-[#00f0ff]/10 group-hover:bg-[#00f0ff]/20 border border-[#00f0ff]/40 text-[#00f0ff] font-bold transition-all flex items-center gap-2">
            Launch Interactive Studio <Rocket className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* FULL EXPANDED STUDIO MODAL */}
      <AnimatePresence>
        {isStudioOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#070709] border border-[#00f0ff]/40 rounded-2xl max-w-5xl w-full p-6 sm:p-8 relative my-auto shadow-[0_0_80px_rgba(0,240,255,0.25)] flex flex-col max-h-[92vh] scrollbar-none"
            >
              {/* Modal Top Bar */}
              <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-4 shrink-0">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-[#00f0ff]" />
                    <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest font-bold">
                      Interactive Architecture Studio • Strategy {selectedStrategy.id}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">{selectedStrategy.title}</h2>
                </div>
                <button
                  onClick={() => setIsStudioOpen(false)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors border border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Strategy Selector & Controls Bar */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-6 shrink-0">
                {/* Dropdown Selection */}
                <div className="md:col-span-8">
                  <select
                    value={selectedStrategy.id}
                    onChange={(e) => {
                      const strat = pipelineStrategies.find(s => s.id === e.target.value);
                      if (strat) {
                        setSelectedStrategy(strat);
                        setActiveStepIndex(0);
                      }
                    }}
                    className="w-full bg-black border border-[#00f0ff]/40 rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-[#00f0ff]"
                  >
                    {pipelineStrategies.map(strat => (
                      <option key={strat.id} value={strat.id}>
                        [{strat.id}] {strat.title} ({strat.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Simulation Play/Pause Controls */}
                <div className="md:col-span-4 flex items-center justify-end gap-2 bg-white/5 p-1.5 rounded-xl border border-white/10">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all ${
                      isPlaying ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    {isPlaying ? <><Pause className="w-3.5 h-3.5" /> Pause Auto</> : <><Play className="w-3.5 h-3.5" /> Run Live</>}
                  </button>
                  <button
                    onClick={() => setActiveStepIndex(prev => (prev + 1) % selectedStrategy.pipeline.length)}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold transition-all border border-white/10 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Step Next
                  </button>
                </div>
              </div>

              {/* Navigation Tabs (Visual Node Flow vs Codebase vs Raw Data) */}
              <div className="flex border-b border-white/10 mb-6 shrink-0">
                <button
                  onClick={() => setActiveTab('pipeline')}
                  className={`px-5 py-2.5 text-xs font-mono font-bold flex items-center gap-2 border-b-2 transition-all ${
                    activeTab === 'pipeline'
                      ? 'border-[#00f0ff] text-[#00f0ff] bg-[#00f0ff]/5'
                      : 'border-transparent text-white/50 hover:text-white'
                  }`}
                >
                  <Layers className="w-4 h-4" /> Live Visual Pipeline
                </button>
                <button
                  onClick={() => setActiveTab('codebase')}
                  className={`px-5 py-2.5 text-xs font-mono font-bold flex items-center gap-2 border-b-2 transition-all ${
                    activeTab === 'codebase'
                      ? 'border-[#00f0ff] text-[#00f0ff] bg-[#00f0ff]/5'
                      : 'border-transparent text-white/50 hover:text-white'
                  }`}
                >
                  <Code2 className="w-4 h-4" /> Production Codebase Script
                </button>
                <button
                  onClick={() => setActiveTab('rawdata')}
                  className={`px-5 py-2.5 text-xs font-mono font-bold flex items-center gap-2 border-b-2 transition-all ${
                    activeTab === 'rawdata'
                      ? 'border-[#00f0ff] text-[#00f0ff] bg-[#00f0ff]/5'
                      : 'border-transparent text-white/50 hover:text-white'
                  }`}
                >
                  <FileText className="w-4 h-4" /> Raw Input vs Output Payload
                </button>
              </div>

              {/* TAB 1: VISUAL PIPELINE FLOW */}
              {activeTab === 'pipeline' && (
                <div className="space-y-6 overflow-y-auto pr-1 flex-1 scrollbar-none">
                  {/* Problem & Impact Card */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                      <span className="text-[10px] font-mono uppercase font-bold text-red-400 block mb-1">Friction / Pain Point:</span>
                      <p className="text-xs text-white/80 leading-relaxed font-light">{selectedStrategy.problem}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 block mb-1">Measured Return / Impact:</span>
                      <p className="text-xs text-emerald-300 font-semibold leading-relaxed">{selectedStrategy.impact}</p>
                    </div>
                  </div>

                  {/* Animated Interactive Nodes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {selectedStrategy.pipeline.map((step, idx) => {
                      const isActive = idx === activeStepIndex;
                      return (
                        <motion.div
                          key={idx}
                          animate={isActive ? { scale: 1.04, borderColor: '#00f0ff' } : { scale: 1, borderColor: 'rgba(255,255,255,0.1)' }}
                          transition={{ duration: 0.3 }}
                          onClick={() => { setActiveStepIndex(idx); setIsPlaying(false); }}
                          className={`p-4 rounded-xl border relative flex flex-col justify-between cursor-pointer transition-all ${
                            isActive
                              ? 'bg-gradient-to-b from-[#00f0ff]/20 to-black shadow-[0_0_25px_rgba(0,240,255,0.3)] text-white'
                              : 'bg-black/80 text-white/50 hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                              isActive ? 'bg-[#00f0ff] text-black' : 'bg-white/10 text-white/40'
                            }`}>
                              Node 0{idx + 1}
                            </span>
                            {isActive && <Zap className="w-4 h-4 text-[#00f0ff] animate-bounce" />}
                          </div>

                          <div>
                            <div className={`text-xs font-bold font-mono mb-1.5 ${isActive ? 'text-[#00f0ff]' : 'text-white/90'}`}>
                              {step.label}
                            </div>
                            <div className="text-[11px] text-white/60 font-light leading-snug">
                              {step.desc}
                            </div>
                          </div>

                          {idx < selectedStrategy.pipeline.length - 1 && (
                            <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                              <ArrowRight className={`w-4 h-4 ${isActive ? 'text-[#00f0ff] animate-pulse' : 'text-white/20'}`} />
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Architecture Description */}
                  <div className="p-4 rounded-xl bg-black border border-white/10 font-mono text-xs text-white/80 space-y-2">
                    <div className="text-[10px] uppercase font-bold text-[#00f0ff]">Architecture Workflow String:</div>
                    <div className="text-white/90">{selectedStrategy.architecture}</div>
                  </div>
                </div>
              )}

              {/* TAB 2: CODEBASE SCRIPT SPEC */}
              {activeTab === 'codebase' && (
                <div className="flex-1 overflow-y-auto flex flex-col justify-between scrollbar-none">
                  <div className="relative bg-black rounded-xl border border-white/10 p-4 font-mono text-xs text-emerald-400 overflow-x-auto min-h-[260px]">
                    <button
                      onClick={() => handleCopy(selectedStrategy.codebase)}
                      className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono flex items-center gap-1.5 transition-colors border border-white/10"
                    >
                      {copied ? <><Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy Code</>}
                    </button>
                    <pre className="leading-relaxed">{selectedStrategy.codebase}</pre>
                  </div>
                </div>
              )}

              {/* TAB 3: RAW INPUT VS OUTPUT PAYLOAD */}
              {activeTab === 'rawdata' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-y-auto scrollbar-none">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-amber-400 font-bold uppercase block">Raw Input Payload:</span>
                    <div className="bg-black p-4 rounded-xl border border-white/10 font-mono text-xs text-amber-300/90 overflow-x-auto min-h-[220px]">
                      <pre className="whitespace-pre-wrap">{selectedStrategy.rawInput}</pre>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono text-emerald-400 font-bold uppercase block">Transformed Output Spec:</span>
                    <div className="bg-black p-4 rounded-xl border border-white/10 font-mono text-xs text-emerald-300/90 overflow-x-auto min-h-[220px]">
                      <pre className="whitespace-pre-wrap">{selectedStrategy.rawOutput}</pre>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between shrink-0">
                <span className="text-xs font-mono text-white/40">Architected & Engineered by Manish Jaiswal</span>
                <button
                  onClick={() => setIsStudioOpen(false)}
                  className="px-6 py-2 rounded-xl bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40 font-bold text-xs uppercase font-mono tracking-wider transition-all"
                >
                  Close Studio
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VisualPipelineBuilder;
