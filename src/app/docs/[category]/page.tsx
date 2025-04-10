// app/docs/[category]/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Search, Menu, Clock } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

interface Topic {
  title: string;
  slug: string;
  description: string;
  readTime: string;
}

interface CategoryContent {
  title: string;
  description: string;
  topics: Topic[];
}

// This would normally be fetched from an API or CMS
const getCategoryContent = (category: string): CategoryContent => {
  const categoryMap: Record<string, CategoryContent> = {
    'getting-started': {
      title: 'Getting Started',
      description: 'Everything you need to begin your Flutter journey',
      topics: [
        { 
          title: 'Installation', 
          slug: 'installation', 
          description: 'Set up Flutter SDK on your system',
          readTime: '3 min'
        },
        { 
          title: 'Setup Editor', 
          slug: 'setup-editor', 
          description: 'Configure VS Code or Android Studio for Flutter development',
          readTime: '5 min'
        },
        { 
          title: 'First App', 
          slug: 'first-app', 
          description: 'Create and run your first Flutter application',
          readTime: '8 min'
        },
        { 
          title: 'Project Structure', 
          slug: 'project-structure', 
          description: 'Understanding Flutter project organization',
          readTime: '4 min'
        }
      ]
    },
    'widgets': {
      title: 'Widgets',
      description: "Learn about Flutter's UI building blocks",
      topics: [
        { 
          title: 'Basic Widgets', 
          slug: 'basic-widgets', 
          description: 'Text, Image, Icon, and other fundamental widgets',
          readTime: '6 min'
        },
        { 
          title: 'Layout Widgets', 
          slug: 'layout-widgets', 
          description: 'Container, Row, Column, and other layout widgets',
          readTime: '7 min'
        },
        { 
          title: 'Material Components', 
          slug: 'material-components', 
          description: 'Button, AppBar, Card, and other Material Design widgets',
          readTime: '8 min'
        },
        { 
          title: 'Cupertino Widgets', 
          slug: 'cupertino-widgets', 
          description: 'iOS-style widgets for your Flutter apps',
          readTime: '5 min'
        }
      ]
    },
    'state': {
      title: 'State Management',
      description: 'Managing app state and data flow in Flutter',
      topics: [
        { 
          title: 'StatefulWidget', 
          slug: 'stateful-widget', 
          description: 'Understanding local state in Flutter',
          readTime: '5 min'
        },
        { 
          title: 'Provider', 
          slug: 'provider', 
          description: 'Simple state management for Flutter',
          readTime: '8 min'
        },
        { 
          title: 'Riverpod', 
          slug: 'riverpod', 
          description: 'A modern approach to state management',
          readTime: '10 min'
        },
        { 
          title: 'Bloc', 
          slug: 'bloc', 
          description: 'Business Logic Component pattern for Flutter',
          readTime: '12 min'
        }
      ]
    },
    'layout': {
      title: 'Layout',
      description: 'Arrange widgets on the screen effectively',
      topics: [
        { 
          title: 'Responsive Layout', 
          slug: 'responsive-layout', 
          description: 'Building adaptive UIs for different screen sizes',
          readTime: '7 min'
        },
        { 
          title: 'Constraints', 
          slug: 'constraints', 
          description: 'Understanding Flutter\'s constraint system',
          readTime: '9 min'
        },
        { 
          title: 'Box Model', 
          slug: 'box-model', 
          description: 'Margins, padding, and borders in Flutter',
          readTime: '6 min'
        }
      ]
    },
    'navigation': {
      title: 'Navigation',
      description: 'Moving between screens and handling routes',
      topics: [
        { 
          title: 'Navigator', 
          slug: 'navigator', 
          description: 'Basic navigation in Flutter',
          readTime: '5 min'
        },
        { 
          title: 'Named Routes', 
          slug: 'named-routes', 
          description: 'Using named routes for cleaner navigation',
          readTime: '7 min'
        },
        { 
          title: 'Navigation 2.0', 
          slug: 'navigation-2', 
          description: 'Advanced declarative navigation APIs',
          readTime: '10 min'
        }
      ]
    },
    'network': {
      title: 'Network & Data',
      description: 'Working with APIs and persistent storage',
      topics: [
        { 
          title: 'HTTP Requests', 
          slug: 'http-requests', 
          description: 'Making network calls in Flutter',
          readTime: '6 min'
        },
        { 
          title: 'JSON Parsing', 
          slug: 'json-parsing', 
          description: 'Converting JSON data to Dart objects',
          readTime: '8 min'
        },
        { 
          title: 'Local Storage', 
          slug: 'local-storage', 
          description: 'Persisting data on the device',
          readTime: '7 min'
        }
      ]
    }
  };

  return categoryMap[category] ?? {
    title: 'Category Not Found',
    description: 'The requested category does not exist',
    topics: []
  };
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const categoryData = getCategoryContent(category);

  // Filter topics based on search query
  const filteredTopics = categoryData.topics.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
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
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 bg-white shadow-sm z-5 p-4 md:px-6">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center text-sm text-gray-500">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-700 capitalize">{categoryData.title}</span>
            </div>
            <div className="relative w-full max-w-md ml-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder={`Search ${categoryData.title}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto p-4 md:p-6">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{categoryData.title}</h1>
            <p className="text-lg text-gray-600">{categoryData.description}</p>
          </div>

          {searchQuery && filteredTopics.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No results found for &quot;{searchQuery}&quot;</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTopics.map((topic) => (
                <Link
                  href={`/docs/${category}/${topic.slug}`}
                  key={topic.slug}
                  className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{topic.title}</h2>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock size={14} className="mr-1" />
                      {topic.readTime}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{topic.description}</p>
                  <div className="text-blue-600 font-medium">Read more →</div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Learning Path</h2>
            <p className="text-gray-700 mb-4">
              Follow this recommended learning path to master {categoryData.title.toLowerCase()} in Flutter:
            </p>
            <ol className="space-y-2">
              {categoryData.topics.slice(0, 4).map((topic, index) => (
                <li key={topic.slug} className="flex items-center">
                  <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-sm font-medium mr-3">
                    {index + 1}
                  </div>
                  <Link href={`/docs/${category}/${topic.slug}`} className="text-gray-800 hover:text-blue-600">
                    {topic.title}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </main>
      </div>
    </div>
  );
}