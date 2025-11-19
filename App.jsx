
import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { Sidebar } from './components/Sidebar';
import { EditorViewer } from './components/EditorViewer';
import { simulateDocProcessing } from './services/mockService';
import { PanelLeftClose, PanelLeftOpen, Download, Share2 } from 'lucide-react';

const App = () => {
  const [data, setData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [highlightText, setHighlightText] = useState(null);

  const handleUpload = async (files) => {
    // Simulate API call
    const result = await simulateDocProcessing(files);
    setData(result);
  };

  const handleHighlight = (text) => {
    // Strip surrounding quotes if they exist in the value but not in the text
    // For simplicity, we pass raw text. The EditorViewer handles exact finding.
    setHighlightText(text);
  };

  const clearHighlight = () => {
      setHighlightText(null);
  }

  if (!data) {
    return <FileUpload onUpload={handleUpload} />;
  }

  return (
    <div className="flex h-screen w-screen bg-slate-100 overflow-hidden font-sans text-slate-900">
      
      {/* Sidebar */}
      <div className={`flex-shrink-0 transition-all duration-300 ease-in-out h-full ${isSidebarOpen ? 'w-96' : 'w-0'} overflow-hidden`}>
        <Sidebar 
          processResult={data.processResult} 
          onerous={data.Onerous} 
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onHighlight={handleHighlight}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative min-w-0">
        
        {/* Floating Controls */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
            <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="bg-white p-2 rounded-md shadow-md border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-all"
                title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
            >
                {isSidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
            </button>
        </div>

        {/* Header Actions (Optional decorative) */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
             <button className="bg-white/80 backdrop-blur p-2 rounded-md shadow-sm border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-white transition-all">
                <Share2 className="w-4 h-4" />
            </button>
            <button className="bg-indigo-600 p-2 rounded-md shadow-md border border-indigo-600 text-white hover:bg-indigo-700 transition-all flex items-center gap-2 px-4">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Export Report</span>
            </button>
        </div>

        {/* Editor */}
        <div className="flex-1 h-full overflow-hidden">
            <EditorViewer 
                content={data.bgTextHtml} 
                highlightText={highlightText}
                onClearHighlight={clearHighlight}
            />
        </div>
      </div>
    </div>
  );
};

export default App;
