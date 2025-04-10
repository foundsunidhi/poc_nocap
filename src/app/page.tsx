// app/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu } from 'lucide-react';

const categories = [
  { name: "Getting Started", path: "/docs/getting-started", description: "Set up your environment and create your first Flutter app" },
  { name: "Widgets", path: "/docs/widgets", description: "Learn about Flutter's UI building blocks" },
  { name: "Layout", path: "/docs/layout", description: "Arrange widgets on the screen" },
  { name: "State Management", path: "/docs/state", description: "Manage app state and data flow" },
  { name: "Navigation", path: "/docs/navigation", description: "Move between screens and routes" },
  { name: "Network & Data", path: "/docs/network", description: "Work with APIs and local storage" },
];

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Filter categories based on search query
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed top-0 left-0 z-20 p-4">
        <button onClick={toggleSidebar} className="text-gray-700">
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed md:relative w-64 h-full bg-white shadow-md z-10 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-blue-600">Flutter Docs</h2>
          <p className="text-sm text-gray-600">Learn in 15 minutes</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link href="/" className="block py-2 px-4 rounded hover:bg-blue-50 text-blue-600 font-medium">
                Home
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.path}>
                <Link href={category.path} className="block py-2 px-4 rounded hover:bg-blue-50 text-gray-700">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 bg-white shadow-sm z-5 p-4 md:px-6">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 md:hidden">Flutter Docs</h1>
            <div className="relative w-full max-w-md ml-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto p-4 md:p-6">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Flutter Documentation</h1>
            <p className="text-lg text-gray-600">Simplified docs to help you learn Flutter in 15 minutes or less.</p>
          </div>

          {searchQuery && filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No results found for &quot;{searchQuery}&quot;</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => (
                <Link
                  href={category.path}
                  key={category.path}
                  className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h2>
                  <p className="text-gray-600">{category.description}</p>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Start</h2>
            <div className="prose max-w-none">
              <p>Get started with Flutter in just a few minutes:</p>
              <ol className="ml-5 space-y-2 text-gray-700">
                <li>Install Flutter SDK</li>
                <li>Set up your editor (VS Code recommended)</li>
                <li>Create a new project</li>
                <li>Build your first widget</li>
              </ol>
              <Link href="/docs/getting-started" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Start Learning →
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}