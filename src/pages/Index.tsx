
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, Briefcase, Image, FileText, Calculator, Code, Shield, BookOpen, Bot, Globe, Palette, Music, DollarSign, HardDrive, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const modules = [
  {
    id: 'health',
    name: 'Health Tools',
    description: 'BMI, calorie tracking, diet analysis & health calculators',
    icon: Heart,
    color: 'from-red-500 to-pink-500',
    available: true
  },
  {
    id: 'business',
    name: 'Business Tools',
    description: 'Invoice generation, profit calculators & business utilities',
    icon: Briefcase,
    color: 'from-blue-500 to-indigo-500',
    available: true
  },
  {
    id: 'image',
    name: 'Image Tools',
    description: 'Resize, compress, convert & manipulate images',
    icon: Image,
    color: 'from-purple-500 to-violet-500',
    available: false
  },
  {
    id: 'document',
    name: 'Document Converters',
    description: 'PDF converters, compressors & document utilities',
    icon: FileText,
    color: 'from-green-500 to-emerald-500',
    available: false
  },
  {
    id: 'general',
    name: 'General Tools',
    description: 'Age calculator, stopwatch, unit converter & more',
    icon: Calculator,
    color: 'from-orange-500 to-amber-500',
    available: false
  },
  {
    id: 'developer',
    name: 'Developer Tools',
    description: 'JSON formatter, regex tester, UUID generator',
    icon: Code,
    color: 'from-slate-500 to-gray-500',
    available: false
  },
  {
    id: 'security',
    name: 'Security & Privacy',
    description: 'Password generator, QR codes & hash utilities',
    icon: Shield,
    color: 'from-teal-500 to-cyan-500',
    available: false
  },
  {
    id: 'educational',
    name: 'Educational Tools',
    description: 'Grammar checker, plagiarism detector & citation tools',
    icon: BookOpen,
    color: 'from-indigo-500 to-blue-500',
    available: false
  },
  {
    id: 'ai',
    name: 'AI Tools',
    description: 'AI chatbot, resume analyzer & content generators',
    icon: Bot,
    color: 'from-pink-500 to-rose-500',
    available: false
  },
  {
    id: 'web',
    name: 'Web Tools',
    description: 'Uptime checker, meta analyzer & website utilities',
    icon: Globe,
    color: 'from-emerald-500 to-green-500',
    available: false
  },
  {
    id: 'design',
    name: 'Design Tools',
    description: 'Color picker, CSS generators & design utilities',
    icon: Palette,
    color: 'from-violet-500 to-purple-500',
    available: false
  },
  {
    id: 'audio-video',
    name: 'Audio/Video Tools',
    description: 'MP3 cutter, video compressor & media converters',
    icon: Music,
    color: 'from-amber-500 to-orange-500',
    available: false
  },
  {
    id: 'financial',
    name: 'Financial Tools',
    description: 'Tax calculator, budget planner & investment tools',
    icon: DollarSign,
    color: 'from-green-500 to-teal-500',
    available: false
  },
  {
    id: 'system',
    name: 'System Utilities',
    description: 'IP lookup, ping tool & network utilities',
    icon: HardDrive,
    color: 'from-gray-500 to-slate-500',
    available: false
  },
  {
    id: 'legal',
    name: 'Legal & Compliance',
    description: 'Policy generators & legal document templates',
    icon: Scale,
    color: 'from-cyan-500 to-blue-500',
    available: false
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredModules = modules.filter(module =>
    module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="text-xl font-bold text-gray-900">Alfrez Toolkit</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              Your Ultimate
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Digital Toolkit
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in">
              Discover 200+ powerful tools across 15 categories. From health calculators to AI generators, 
              we have everything you need in one place.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12 animate-fade-in">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for tools (e.g., BMI calculator, invoice generator...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Explore Our Tool Categories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredModules.map((module, index) => {
              const IconComponent = module.icon;
              return (
                <Link
                  key={module.id}
                  to={module.available ? `/categories/${module.id}` : '/coming-soon'}
                  className="group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
                    {!module.available && (
                      <div className="absolute top-3 right-3 bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-1 rounded-full">
                        🔒 Soon
                      </div>
                    )}
                    
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {module.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {module.description}
                    </p>
                    
                    <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {module.available ? 'Explore Tools' : 'Coming Soon'}
                      </span>
                      <div className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                  A
                </div>
                <span className="text-xl font-bold">Alfrez Toolkit</span>
              </div>
              <p className="text-gray-400">
                Your ultimate digital toolkit with 200+ powerful tools across 15 categories.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Home</a>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors block">About</a>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors block">Contact</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Cookie Policy</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Stay Updated</h4>
              <p className="text-gray-400 mb-4">Get notified when new tools are launched.</p>
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="rounded-r-none bg-gray-800 border-gray-700 text-white"
                />
                <Button className="rounded-l-none bg-blue-600 hover:bg-blue-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Alfrez Toolkit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
