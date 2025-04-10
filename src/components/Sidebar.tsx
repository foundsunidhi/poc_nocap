// components/Sidebar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarItem {
  name: string;
  slug: string;
}

interface SidebarCategory {
  name: string;
  slug: string;
  items: SidebarItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const sidebarCategories: SidebarCategory[] = [
  { 
    name: "Getting Started",
    slug: "getting-started",
    items: [
      { name: "Installation", slug: "installation" },
      { name: "Setup Editor", slug: "setup-editor" },
      { name: "First App", slug: "first-app" },
      { name: "Project Structure", slug: "project-structure" }
    ]
  },
  { 
    name: "Widgets",
    slug: "widgets",
    items: [
      { name: "Basic Widgets", slug: "basic-widgets" },
      { name: "Layout Widgets", slug: "layout-widgets" },
      { name: "Material Components", slug: "material-components" },
      { name: "Cupertino Widgets", slug: "cupertino-widgets" }
    ]
  },
  { 
    name: "Layout",
    slug: "layout",
    items: [
      { name: "Responsive Layout", slug: "responsive-layout" },
      { name: "Constraints", slug: "constraints" },
      { name: "Box Model", slug: "box-model" }
    ]
  },
  { 
    name: "State Management",
    slug: "state",
    items: [
      { name: "StatefulWidget", slug: "stateful-widget" },
      { name: "Provider", slug: "provider" },
      { name: "Riverpod", slug: "riverpod" },
      { name: "Bloc", slug: "bloc" }
    ]
  },
  { 
    name: "Navigation",
    slug: "navigation",
    items: [
      { name: "Navigator", slug: "navigator" },
      { name: "Named Routes", slug: "named-routes" },
      { name: "Navigation 2.0", slug: "navigation-2" }
    ]
  },
  { 
    name: "Network & Data",
    slug: "network",
    items: [
      { name: "HTTP Requests", slug: "http-requests" },
      { name: "JSON Parsing", slug: "json-parsing" },
      { name: "Local Storage", slug: "local-storage" }
    ]
  }
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  
  // Extract the current category and page from the pathname
  const pathParts = pathname.split('/').filter(part => part);
  const currentCategory = pathParts.length > 1 ? pathParts[1] : '';
  const currentPage = pathParts.length > 2 ? pathParts[2] : '';

  return (
    <div 
      className={`fixed md:relative w-64 h-full bg-white shadow-md z-10 transition-transform duration-300 overflow-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="p-4 border-b">
        <Link href="/" className="block" onClick={() => onClose()}>
          <h2 className="text-xl font-bold text-blue-600">Flutter Docs</h2>
          <p className="text-sm text-gray-600">Learn in 15 minutes</p>
        </Link>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link 
              href="/" 
              className={`block py-2 px-4 rounded hover:bg-blue-50 ${
                pathname === '/' ? 'text-blue-600 font-medium' : 'text-gray-700'
              }`}
              onClick={() => onClose()}
            >
              Home
            </Link>
          </li>
        </ul>

        {sidebarCategories.map((category) => (
          <div key={category.slug} className="mt-6">
            <Link 
              href={`/docs/${category.slug}`}
              onClick={() => onClose()}
            >
              <h3 className={`mb-2 font-medium text-sm uppercase ${
                currentCategory === category.slug ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {category.name}
              </h3>
            </Link>
            <ul className="space-y-1">
              {category.items.map((item) => (
                <li key={item.slug}>
                  <Link 
                    href={`/docs/${category.slug}/${item.slug}`}
                    className={`block py-2 px-4 rounded text-gray-700 hover:bg-blue-50 ${
                      currentCategory === category.slug && currentPage === item.slug 
                        ? 'bg-blue-50 text-blue-600 font-medium' 
                        : ''
                    }`}
                    onClick={() => onClose()}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}