// components/CodeSnippet.tsx
'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeSnippetProps {
  code: string;
  language?: string;
}

export default function CodeSnippet({ code, language = 'dart' }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4">
      <div className="flex justify-between items-center bg-gray-800 px-4 py-2 rounded-t-md">
        <span className="text-gray-300 text-sm">{language}</span>
        <button 
          onClick={copyToClipboard}
          className="text-blue-300 hover:text-white"
          aria-label="Copy code"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto rounded-b-md">
        <code className="text-gray-100">{code}</code>
      </pre>
    </div>
  );
}