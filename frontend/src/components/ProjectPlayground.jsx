import React, { useState, useEffect } from 'react';
import { X, Play, Terminal, CheckCircle, AlertCircle, FileText, Loader2 } from 'lucide-react';

const TerminalLine = ({ text, delay, onComplete, isError, isSuccess }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      if (onComplete) onComplete();
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, onComplete]);

  if (!visible) return null;

  return (
    <div className={`font-mono text-[11px] leading-tight mb-1 ${isError ? 'text-red-400' : isSuccess ? 'text-green-400' : 'text-gray-300'}`}>
      <span className="text-gray-500 mr-2">$</span>
      {text}
    </div>
  );
};

const GenericTerminal = ({ project }) => {
  const [stage, setStage] = useState(0);

  const lines = [
    { text: `Initializing workspace for ${project.title}...`, delay: 500 },
    { text: `Fetching dependencies...`, delay: 1200 },
    { text: `Executing workflow scripts...`, delay: 2000 },
    { text: `Processing data chunks...`, delay: 3000 },
    { text: `Analyzing results...`, delay: 4200 },
    { text: `Workflow completed successfully in 3.2s`, delay: 5000, isSuccess: true },
  ];

  return (
    <div className="bg-black/80 rounded-md p-4 h-64 overflow-y-auto border border-white/10 font-mono relative">
      <div className="text-gray-500 text-[10px] mb-4 border-b border-white/10 pb-2">Terminal Execution</div>
      {lines.map((line, idx) => (
        <TerminalLine 
          key={idx} 
          text={line.text} 
          delay={line.delay} 
          isError={line.isError}
          isSuccess={line.isSuccess}
          onComplete={() => setStage(idx + 1)} 
        />
      ))}
      {stage < lines.length && (
        <div className="flex items-center gap-2 mt-2 text-cyan-400">
          <Loader2 className="w-3 h-3 animate-spin" />
          <span className="text-[10px]">Running...</span>
        </div>
      )}
    </div>
  );
};

const ValeSimulator = () => {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState(null);
  const defaultText = "The documentation is written by the engineering team. It utilizes complex architectural diagrams to show how the system works.";

  const handleRun = () => {
    setRunning(true);
    setResults(null);
    setTimeout(() => {
      setRunning(false);
      setResults([
        { type: 'error', rule: 'Microsoft.Passive', message: "'is written' is passive voice. Try to use active voice." },
        { type: 'warning', rule: 'Corporate.Branding', message: "Avoid 'utilizes'. Use 'uses' instead for simpler vocabulary." }
      ]);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="text-xs text-white/70">Paste your Markdown text below to run it against the corporate Vale style guide:</div>
      <textarea 
        className="w-full h-32 bg-white/5 border border-white/10 rounded-md p-3 text-sm text-white/90 focus:outline-none focus:border-cyan-500/50 resize-none font-mono"
        defaultValue={defaultText}
      />
      <button 
        onClick={handleRun}
        disabled={running}
        className="self-start px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 rounded text-cyan-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors disabled:opacity-50"
      >
        {running ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
        Run Vale Linter
      </button>

      {results && (
        <div className="mt-2 bg-black/60 rounded-md p-4 border border-white/10">
          <h4 className="text-xs font-bold text-white/80 mb-3 uppercase tracking-wider">Linting Results</h4>
          <div className="space-y-2">
            {results.map((r, i) => (
              <div key={i} className={`flex items-start gap-2 p-2 rounded border ${r.type === 'error' ? 'bg-red-500/10 border-red-500/20' : 'bg-yellow-500/10 border-yellow-500/20'}`}>
                {r.type === 'error' ? <AlertCircle className="w-4 h-4 text-red-400 shrink-0" /> : <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0" />}
                <div>
                  <div className="text-xs font-bold text-white/90 font-mono mb-0.5">{r.rule}</div>
                  <div className="text-[11px] text-white/70">{r.message}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const AIDocsGenerator = () => {
  const [generating, setGenerating] = useState(false);
  const [output, setOutput] = useState('');
  
  const handleGenerate = () => {
    setGenerating(true);
    setOutput('');
    const fullText = `# User Authentication API\n\nThis endpoint allows you to authenticate a user and retrieve a JWT token.\n\n## Endpoint\n\`POST /api/v1/auth/login\`\n\n## Request Body\n\`\`\`json\n{\n  "username": "string",\n  "password": "string"\n}\n\`\`\`\n\n## Architecture Flow\n1. Client sends credentials.\n2. API Gateway routes to Auth Service.\n3. Auth Service validates against DB.\n4. JWT Token returned.`;
    
    let i = 0;
    const interval = setInterval(() => {
      setOutput(prev => prev + fullText.charAt(i));
      i++;
      if (i === fullText.length) {
        clearInterval(interval);
        setGenerating(false);
      }
    }, 15);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="text-xs text-white/70">Raw OpenAPI JSON Input:</div>
      <div className="bg-black/60 border border-white/10 rounded-md p-3 text-[11px] font-mono text-green-400">
        {`{\n  "path": "/api/v1/auth/login",\n  "method": "POST",\n  "summary": "User Auth"\n}`}
      </div>
      <button 
        onClick={handleGenerate}
        disabled={generating}
        className="self-start px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded text-purple-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors disabled:opacity-50"
      >
        {generating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
        Generate Markdown
      </button>

      <div className="mt-2 bg-white/5 rounded-md p-4 border border-white/10 h-48 overflow-y-auto">
        <h4 className="text-[10px] font-bold text-white/50 mb-3 uppercase tracking-wider">LLM Output</h4>
        <pre className="text-xs text-white/80 font-mono whitespace-pre-wrap">
          {output}
          {generating && <span className="inline-block w-2 h-3 bg-white/60 animate-pulse ml-1 align-middle" />}
        </pre>
      </div>
    </div>
  );
};

const ProjectPlayground = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-gray-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-lg">
              {project.emoji}
            </div>
            <div>
              <h2 className="text-white font-semibold text-sm">{project.title}</h2>
              <div className="text-cyan-400/80 text-[10px] uppercase tracking-wider font-bold">Interactive Playground</div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {project.id === '01' ? (
            <AIDocsGenerator />
          ) : project.id === '07' ? (
            <ValeSimulator />
          ) : (
            <GenericTerminal project={project} />
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-black/50 flex justify-between items-center text-xs text-white/40">
          <div>This is a front-end simulation running locally in your browser.</div>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">View real code</a>
        </div>
      </div>
    </div>
  );
};

export default ProjectPlayground;
