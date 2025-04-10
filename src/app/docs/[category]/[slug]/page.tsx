// app/docs/[category]/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Menu, ChevronRight, ChevronLeft } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import CodeSnippet from '@/components/CodeSnippet';

interface DocContent {
  title: string;
  description: string;
  content: string;
  next?: {
    title: string;
    slug: string;
  };
  prev?: {
    title: string;
    slug: string;
  };
}

// This would normally be fetched from an API or CMS
const getDocContent = (category: string, slug: string): DocContent => {
  // Placeholder for actual content fetching logic
  return {
    title: `${slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`,
    description: `Learn about ${slug} in Flutter`,
    content: `
## Introduction

This is the documentation page for ${slug} in the ${category} category. 

Flutter makes it easy to build beautiful interfaces with a rich set of widgets and tools. Let's learn how to use them effectively.

## Key Concepts

When working with this feature, remember these important principles:

1. **Declarative UI**: Flutter uses a declarative approach to building UIs
2. **Widget Composition**: Everything is a widget, and widgets can be composed
3. **Immutability**: Widgets are immutable, which helps performance

## Code Example

Here's how you can implement this in your app:

\`\`\`dart
import 'package:flutter/material.dart';

class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(16.0),
      child: Text(
        'Hello Flutter!',
        style: TextStyle(fontSize: 24.0),
      ),
    );
  }
}
\`\`\`

## Common Patterns

Here are some common patterns to solve typical problems:

- Use StatefulWidget when you need to maintain state
- Leverage Flutter's built-in animations for smooth transitions
- Follow Material Design guidelines for consistent UI

## Next Steps

Now that you understand the basics, try building a small sample app using these concepts.
    `,
    next: {
      title: 'Advanced Techniques',
      slug: 'advanced-techniques'
    },
    prev: {
      title: 'Basic Concepts',
      slug: 'basic-concepts'
    }
  };
};

export default function DocPage() {
  const params = useParams();
  const category = params.category as string;
  const slug = params.slug as string;
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [doc, setDoc] = useState<DocContent | null>(null);

  useEffect(() => {
    if (category && slug) {
      const docData = getDocContent(category, slug);
      setDoc(docData);
    }
  }, [category, slug]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // If the page is still loading
  if (!doc) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // Render markdown-like content
  const renderContent = (content: string) => {
    // Split the content by code blocks
    const parts = content.split(/(\`\`\`[\s\S]*?\`\`\`)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        // It's a code block
        const codeContent = part.replace(/```dart\n|```\n?/g, '');
        return <CodeSnippet key={index} code={codeContent} language="dart" />;
      } else {
        // It's regular text - parse markdown-like syntax
        let formattedText = part;
        
        // Headers
        formattedText = formattedText.replace(/## (.*)/g, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>');
        formattedText = formattedText.replace(/### (.*)/g, '<h3 class="text-xl font-bold mt-5 mb-2">$1</h3>');
        
        // Bold
        formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // List items
        formattedText = formattedText.replace(/- (.*)/g, '<li class="ml-6 list-disc">$1</li>');
        formattedText = formattedText.replace(/\d+\. (.*)/g, '<li class="ml-6 list-decimal">$1</li>');
        
        // Convert newlines to breaks
        formattedText = formattedText.replace(/\n\n/g, '<br /><br />');
        
        return <div key={index} dangerouslySetInnerHTML={{ __html: formattedText }} />;
      }
    });
  };

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
        <main className="max-w-4xl mx-auto p-4 md:p-8">
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <ChevronRight size={16} className="mx-1" />
              <Link href={`/docs/${category}`} className="hover:text-blue-600 capitalize">
                {category?.replace(/-/g, ' ')}
              </Link>
              <ChevronRight size={16} className="mx-1" />
              <span className="text-gray-700">{doc.title}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{doc.title}</h1>
            <p className="text-lg text-gray-600 mt-2">{doc.description}</p>
          </div>

          <div className="prose max-w-none">
            {renderContent(doc.content)}
          </div>

          {/* Prev/Next navigation */}
          <div className="mt-12 border-t pt-6 flex justify-between">
            {doc.prev ? (
              <Link 
                href={`/docs/${category}/${doc.prev.slug}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <ChevronLeft size={20} className="mr-1" />
                <span>{doc.prev.title}</span>
              </Link>
            ) : (
              <div></div>
            )}
            
            {doc.next ? (
              <Link 
                href={`/docs/${category}/${doc.next.slug}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <span>{doc.next.title}</span>
                <ChevronRight size={20} className="ml-1" />
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}