
import React, { useState } from 'react';
import { SidebarTab } from '../constants';
import { AlertTriangle, FileCheck, ChevronRight, Search } from 'lucide-react';

export const Sidebar = ({
  processResult,
  onerous,
  isOpen,
  toggleSidebar,
  onHighlight,
}) => {
  const [activeTab, setActiveTab] = useState(SidebarTab.PROCESS);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="w-96 bg-white border-r border-slate-200 flex flex-col h-full shadow-xl z-20 transition-all duration-300">
      {/* Header / Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab(SidebarTab.PROCESS)}
          className={`flex-1 py-4 px-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
            activeTab === SidebarTab.PROCESS
              ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          Process Result
        </button>
        <button
          onClick={() => setActiveTab(SidebarTab.ONEROUS)}
          className={`flex-1 py-4 px-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
            activeTab === SidebarTab.ONEROUS
              ? 'text-amber-600 border-b-2 border-amber-600 bg-amber-50/50'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          Onerous ({onerous.length})
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 bg-slate-50">
        
        {/* Process Result Panel */}
        {activeTab === SidebarTab.PROCESS && (
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-4">Extracted Key Data</p>
            {Object.entries(processResult).map(([key, value], idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden group cursor-pointer hover:border-indigo-300 hover:shadow-md transition-all"
                onClick={() => onHighlight(value)}
              >
                <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-600">{key}</span>
                  <Search className="w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="px-4 py-3">
                  <p className="text-sm text-slate-800 font-medium break-words">{value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Onerous Clauses Panel */}
        {activeTab === SidebarTab.ONEROUS && (
          <div className="space-y-3">
             <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-4">Risk Analysis</p>
            {onerous.map((clause, idx) => (
              <div
                key={idx}
                onClick={() => onHighlight(clause)}
                className="bg-white p-4 rounded-lg border-l-4 border-amber-500 shadow-sm cursor-pointer hover:bg-amber-50 hover:shadow-md transition-all group"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold text-amber-600 mb-1 block">Clause Warning</span>
                  <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-sm text-slate-700 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                  "{clause}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-slate-200 bg-white text-xs text-slate-400 text-center">
        LegalDoc Analyzer v1.0
      </div>
    </div>
  );
};
