
import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Search } from 'lucide-react';

export const EditorViewer = ({
  content,
  highlightText,
  onClearHighlight,
}) => {
  const editorRef = useRef(null);
  // State to hold configuration to prevent re-initialization
  const [config, setConfig] = useState({});

  // Configure Jodit for "Read Only" mode but with selection capabilities
  useEffect(() => {
    setConfig({
      readonly: true, // We don't want the user editing the legal doc, just viewing
      toolbar: false, // Hide toolbar for cleaner look
      statusbar: false,
      height: '100%',
      width: '100%',
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      iframe: false, // Inline mode is easier for simple scrolling
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      defaultActionOnPaste: 'insert_only_text',
      maxHeight: '100%',
      style: {
        fontFamily: '"Inter", sans-serif',
        fontSize: '16px',
        color: '#334155'
      }
    });
  }, []);

  // Effect to handle highlighting when `highlightText` prop changes
  useEffect(() => {
    if (editorRef.current && highlightText) {
      const editor = editorRef.current;
      
      // 1. Clear previous selection/search
      editor.selection.removeMarkers();
      
      // 2. Find the text
      const found = editor.s.find(highlightText);

      if (found) {
        // 3. Scroll into view
        const range = editor.s.range;
        if (range) {
           const startNode = range.startContainer.parentNode;
           if(startNode && startNode.scrollIntoView) {
               startNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
           }
        }
      } else {
          // Fallback: Try to find partial match or notify
          console.warn("Exact text match not found in editor");
      }
    }
  }, [highlightText]);

  return (
    <div className="h-full w-full relative bg-slate-100 flex flex-col">
      {/* Top Bar */}
      <div className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
        <h2 className="font-semibold text-slate-700">Document Viewer</h2>
        {highlightText && (
           <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium animate-fade-in">
             <Search className="w-3 h-3" />
             <span>Highlighting selection</span>
             <button onClick={onClearHighlight} className="ml-2 hover:text-yellow-900 font-bold">×</button>
           </div>
        )}
      </div>

      {/* Editor Container */}
      <div className="flex-1 overflow-hidden p-8 mx-auto max-w-5xl w-full shadow-sm bg-white my-4 rounded-lg border border-slate-200">
        {/* 
           Using key={content} forces re-mount if content changes completely (new doc upload),
           preventing stale state in Jodit 
        */}
        <JoditEditor
          ref={editorRef}
          value={content}
          config={config}
          onBlur={() => {}} // Essential prop to avoid warnings
          onChange={() => {}}
        />
      </div>
    </div>
  );
};
