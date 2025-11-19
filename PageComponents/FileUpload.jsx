
import React, { useState } from 'react';
import { Upload, FileText, Loader2 } from 'lucide-react';

export const FileUpload = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = async (files) => {
    setIsLoading(true);
    try {
      await onUpload(files);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50 p-6">
      <div className="max-w-xl w-full text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Legal Doc Analyzer</h1>
        <p className="text-slate-600">Upload your Master Service Agreement and supporting documents to extract key data and identify onerous clauses.</p>
      </div>

      <div
        className={`
          w-full max-w-xl p-12 rounded-2xl border-4 border-dashed transition-all duration-300 ease-in-out flex flex-col items-center justify-center
          ${isDragging ? 'border-indigo-500 bg-indigo-50 scale-105' : 'border-slate-300 bg-white shadow-xl'}
          ${isLoading ? 'opacity-80 pointer-events-none' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isLoading ? (
          <div className="flex flex-col items-center text-indigo-600 animate-pulse">
            <Loader2 className="w-16 h-16 animate-spin mb-4" />
            <p className="text-lg font-medium">Analyzing Documents...</p>
            <p className="text-sm opacity-75">Extracting process results and onerous clauses</p>
          </div>
        ) : (
          <>
            <div className="bg-indigo-100 p-6 rounded-full mb-6">
              <Upload className="w-12 h-12 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Drag & Drop Documents</h3>
            <p className="text-slate-500 mb-8 text-center">Supported files: PDF, DOCX (Simulated)</p>
            
            <label className="relative cursor-pointer group">
              <div className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium shadow-lg group-hover:bg-indigo-700 transition-colors flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <span>Select Files</span>
              </div>
              <input 
                type="file" 
                multiple 
                className="hidden" 
                onChange={handleFileSelect} 
                accept=".pdf,.doc,.docx,.txt"
              />
            </label>
          </>
        )}
      </div>
    </div>
  );
};
