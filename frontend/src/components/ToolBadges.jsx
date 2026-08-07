import React from 'react';

// Real SVG Logos for Tech & Documentation Tools
export const ToolIconMap = {
  'github': {
    name: 'GitHub',
    color: '#ffffff',
    bgColor: 'bg-white/10',
    borderColor: 'border-white/20',
    textColor: 'text-white',
    svg: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    )
  },
  'markdown': {
    name: 'Markdown',
    color: '#00b4d8',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    textColor: 'text-cyan-300',
    svg: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
        <path d="M22.27 19.385H1.73A1.73 1.73 0 010 17.655V6.345a1.73 1.73 0 011.73-1.73h20.54A1.73 1.73 0 0124 6.345v11.31a1.73 1.73 0 01-1.73 1.73zM3.46 16.5h2.31v-4.615l2.308 2.885 2.307-2.885V16.5h2.31V7.5h-2.31l-2.307 2.885L5.77 7.5H3.46v9zM18.808 16.5l3.461-4.327h-2.307V7.5h-2.308v4.673h-2.308L18.808 16.5z"/>
      </svg>
    )
  },
  'docusaurus': {
    name: 'Docusaurus',
    color: '#35d07f',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-300',
    svg: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z"/>
      </svg>
    )
  },
  'antora': {
    name: 'Antora',
    color: '#f97316',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    textColor: 'text-orange-300',
    svg: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
        <path d="M12 2L2 19.5h20L12 2zm0 4.5l6.5 11.5h-13L12 6.5z"/>
      </svg>
    )
  },
  'document360': {
    name: 'Document360',
    color: '#3b82f6',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-300',
    svg: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zm-3 8h6v2h-6v-2zm0 4h6v2h-6v-2zm-3-4h2v2H7v-2zm0 4h2v2H7v-2z"/>
      </svg>
    )
  },
  'pendo': {
    name: 'Pendo',
    color: '#ff2a70',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
    textColor: 'text-pink-300',
    svg: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
        <path d="M6 2h6a6 6 0 016 6v0a6 6 0 01-6 6H9v8H6V2zm3 3v5h3a3 3 0 003-3v0a3 3 0 00-3-3H9z"/>
      </svg>
    )
  },
  'helpdocs': {
    name: 'HelpDocs',
    color: '#f59e0b',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-300',
    svg: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 11.9 12 12.5 12 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/>
      </svg>
    )
  },
  'camtasia': {
    name: 'Camtasia',
    color: '#10b981',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-300',
    svg: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
        <path d="M4 3h16a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2zm0 3v12h16V6H4zm3 2h5v8H7V8zm7 0h3v8h-3V8z"/>
      </svg>
    )
  },
  'dita': {
    name: 'DITA XML',
    color: '#f97316',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    textColor: 'text-orange-300',
    svg: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
      </svg>
    )
  },
  'oxygen': {
    name: 'Oxygen XML',
    color: '#ef4444',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/30',
    textColor: 'text-rose-300',
    svg: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a6 6 0 110 12 6 6 0 010-12zm-2 4v4h4v-4h-4z"/>
      </svg>
    )
  },
  'ixiasoft': {
    name: 'Ixiasoft CMS',
    color: '#a855f7',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    textColor: 'text-purple-300',
    svg: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
        <path d="M4 4h4v16H4V4zm6 0h4v16h-4V4zm6 0h4v16h-4V4z"/>
      </svg>
    )
  }
};

// Helper parser to match tools from string definitions
export const getToolBadges = (toolsString) => {
  if (!toolsString) return [];

  const lower = toolsString.toLowerCase();
  const badges = [];

  if (lower.includes('dita')) badges.push({ key: 'dita', label: 'DITA XML' });
  if (lower.includes('oxygen')) badges.push({ key: 'oxygen', label: 'Oxygen XML' });
  if (lower.includes('ixiasoft')) badges.push({ key: 'ixiasoft', label: 'Ixiasoft CMS' });
  if (lower.includes('antora')) badges.push({ key: 'antora', label: 'Antora' });
  if (lower.includes('markdown')) badges.push({ key: 'markdown', label: 'Markdown' });
  if (lower.includes('docusaurus')) badges.push({ key: 'docusaurus', label: 'Docusaurus' });
  if (lower.includes('document360') || lower.includes('document 360')) badges.push({ key: 'document360', label: 'Document360' });
  if (lower.includes('pendo')) badges.push({ key: 'pendo', label: 'Pendo' });
  if (lower.includes('helpdocs')) badges.push({ key: 'helpdocs', label: 'HelpDocs' });
  if (lower.includes('camtasia')) badges.push({ key: 'camtasia', label: 'Camtasia' });
  if (lower.includes('github')) badges.push({ key: 'github', label: 'GitHub' });

  return badges;
};

const ToolBadges = ({ toolsString }) => {
  const badgeItems = getToolBadges(toolsString);

  if (badgeItems.length === 0) {
    return (
      <span className="inline-block px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 font-mono text-[11px]">
        {toolsString}
      </span>
    );
  }

  return (
    <div className="flex flex-wrap gap-1.5 items-center mt-1">
      {badgeItems.map((item) => {
        const info = ToolIconMap[item.key] || {};
        return (
          <div
            key={item.key}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-mono font-medium backdrop-blur-md transition-all duration-300 ${info.bgColor || 'bg-cyan-500/10'} ${info.borderColor || 'border-cyan-500/30'} ${info.textColor || 'text-cyan-300'} shadow-[0_0_10px_rgba(0,0,0,0.3)] hover:scale-105`}
          >
            {info.svg}
            <span>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ToolBadges;
