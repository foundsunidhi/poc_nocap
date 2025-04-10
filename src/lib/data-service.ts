// lib/data-service.ts
// This is a mock service that would normally fetch data from an API or database
// In a real application, this would connect to a CMS or backend service

export interface DocItem {
	title: string;
	slug: string;
	description: string;
	readTime?: string;
  }
  
  export interface DocCategory {
	title: string;
	slug: string;
	description: string;
	topics: DocItem[];
  }
  
  export interface DocContent {
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
  
  // Mock categories and their topics
  const categories: DocCategory[] = [
	{
	  title: 'Getting Started',
	  slug: 'getting-started',
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
	{
	  title: 'Widgets',
	  slug: 'widgets',
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
	// More categories...
  ];
  
  // Mock content for documents
  const docs: Record<string, Record<string, DocContent>> = {
	'getting-started': {
	  'installation': {
		title: 'Installation',
		description: 'Set up Flutter SDK on your system',
		content: `
  ## System Requirements
  
  Before installing Flutter, ensure your development environment meets these requirements:
  
  - **Operating System**: Windows 10 or later, macOS 10.15 or later, or Linux
  - **Disk Space**: At least 2.5 GB (not including IDE/tools)
  - **Tools**: Git, a proper code editor (VS Code, Android Studio, etc.)
  
  ## Download Flutter SDK
  
  1. **Download the SDK**: Head to [flutter.dev](https://flutter.dev) and download the latest stable release
  2. **Extract the archive**: Place it in a location where you have write permissions
  
  \`\`\`bash
  # On macOS/Linux, you might use:
  cd ~/development
  unzip ~/Downloads/flutter_sdk.zip
  \`\`\`
  
  ## Add Flutter to your path
  
  Add Flutter to your PATH variable so you can run Flutter commands from any terminal window.
  
  \`\`\`bash
  # On macOS/Linux, add to .bashrc or .zshrc:
  export PATH="$PATH:$HOME/development/flutter/bin"
  \`\`\`
  
  ## Run flutter doctor
  
  Verify your installation and check for any dependencies you still need to install:
  
  \`\`\`bash
  flutter doctor
  \`\`\`
  
  Follow the instructions to complete any remaining setup steps.
		`,
		next: {
		  title: 'Setup Editor',
		  slug: 'setup-editor'
		}
	  },
	  'setup-editor': {
		title: 'Setup Editor',
		description: 'Configure VS Code or Android Studio for Flutter development',
		content: `
  ## Choose Your Editor
  
  Flutter provides first-class support for two primary editors:
  
  1. **Visual Studio Code**: A lightweight, cross-platform editor
  2. **Android Studio/IntelliJ IDEA**: Full-featured IDEs with robust tooling
  
  This guide covers setting up both options.
  
  ## VS Code Setup
  
  1. **Install VS Code** from [code.visualstudio.com](https://code.visualstudio.com/)
  
  2. **Install Flutter Extension**
	 - Launch VS Code
	 - Open the Extensions view (Ctrl+Shift+X / Cmd+Shift+X)
	 - Search for "Flutter"
	 - Click Install on the Flutter extension by Dart Code
  
  \`\`\`dart
  // The extension provides:
  // - Syntax highlighting
  // - Code completion
  // - Widget editing assists
  // - Debugging support
  \`\`\`
  
  3. **Verify Setup**
	 - Open the Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
	 - Type "Flutter: New Project"
	 - If the command is available, your setup is complete
  
  ## Android Studio Setup
  
  1. **Install Android Studio** from [developer.android.com](https://developer.android.com/studio)
  
  2. **Install Flutter Plugin**
	 - Start Android Studio
	 - Open Preferences > Plugins (on macOS) or File > Settings > Plugins (on Windows/Linux)
	 - Search for "Flutter"
	 - Click Install and restart the IDE when prompted
  
  3. **Verify Setup**
	 - If setup correctly, you'll see "Start a new Flutter project" on the welcome screen
		`,
		prev: {
		  title: 'Installation',
		  slug: 'installation'
		},
		next: {
		  title: 'First App',
		  slug: 'first-app'
		}
	  },
	  // More docs...
	},
	// More categories...
  };
  
  // Service functions
  export function getAllCategories(): DocCategory[] {
	return categories;
  }
  
  export function getCategoryBySlug(slug: string): DocCategory | null {
	return categories.find(category => category.slug === slug) ?? null;
  }
  
  export function getDocContent(categorySlug: string, docSlug: string): DocContent | null {
	const category = docs[categorySlug];
	if (!category) return null;
	
	return category[docSlug] ?? null;
  }
  
  export function getAllDocItems(): DocItem[] {
	return categories.flatMap(category => 
	  category.topics.map(topic => ({
		...topic,
		category: category.slug
	  }))
	);
  }
  
  export function searchDocs(query: string): DocItem[] {
	if (!query || query.length < 2) return [];
	
	const allDocs = getAllDocItems();
	const normalizedQuery = query.toLowerCase();
	
	return allDocs.filter(doc => 
	  doc.title.toLowerCase().includes(normalizedQuery) ||
	  doc.description.toLowerCase().includes(normalizedQuery)
	);
  }