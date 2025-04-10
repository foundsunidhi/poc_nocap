// components/Search.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import Link from 'next/link';

interface DocItem {
  title: string;
  category: string;
  slug: string;
  description: string;
}

// This would normally be fetched from an API
const getAllDocuments = (): DocItem[] => {
  return [
    {
      title: 'Installation',
      category: 'getting-started',
      slug: 'installation',
      description: 'Set up Flutter SDK on your system'
    },
    {
      title: 'Setup Editor',
      category: 'getting-started',
      slug: 'setup-editor',
      description: 'Configure VS Code or Android Studio for Flutter development'
    },
    {
      title: 'Basic Widgets',
      category: 'widgets',
      slug: 'basic-widgets',
      description: 'Text, Image, Icon, and other fundamental widgets'
    },
    {
      title: 'Layout Widgets',
      category: 'widgets',
      slug: 'layout-widgets',
      description: 'Container, Row, Column, and other layout widgets'
    },
    {
      title: 'Provider',
      category: 'state',
      slug: 'provider',
      description: 'Simple state management for Flutter'
    },
    // More documents...
  ];
};

export default function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DocItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const documents = getAllDocuments();
    const filtered = documents.filter(doc => 
      doc.title.toLowerCase().includes(query.toLowerCase()) || 
      doc.description.toLowerCase().includes(query.toLowerCase())
    );
    
    setResults(filtered);
    setIsOpen(true);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search documentation..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
        />
        {query && (
          <button 
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            onClick={clearSearch}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-96 overflow-y-auto">
          <ul className="py-1">
            {results.map((doc) => (
              <li key={`${doc.category}-${doc.slug}`}>
                <Link
                  href={`/docs/${doc.category}/${doc.slug}`}
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="font-medium text-gray-900">{doc.title}</div>
                  <div className="text-sm text-gray-500">
                    <span className="capitalize">{doc.category.replace(/-/g, ' ')}</span> · {doc.description}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200">
          <div className="px-4 py-6 text-center text-gray-500">
            No results found for &quot;{query}&quot;
          </div>
        </div>
      )}
    </div>
  );
}