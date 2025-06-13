import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Calculator, Target, Droplets, Activity, Users, Receipt, PieChart, TrendingUp, DollarSign, FileText, Lightbulb, Image, Code, Shield, BookOpen, Bot, Globe, Palette, Music, HardDrive, Scale, Clock, Zap, Eye, Scissors, Mic, CreditCard, Search, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const toolsData = {
  health: [
    { id: 'bmi-calculator', name: 'BMI Calculator', description: 'Calculate your Body Mass Index', icon: Calculator },
    { id: 'calorie-tracker', name: 'Calorie Tracker', description: 'Track your daily calorie intake', icon: Target },
    { id: 'diet-analyser', name: 'Diet Analyser', description: 'Analyze your diet and nutrition', icon: Heart },
    { id: 'waist-hip-ratio', name: 'Waist to Hip Ratio', description: 'Calculate your waist to hip ratio', icon: Activity },
    { id: 'ideal-weight', name: 'Ideal Weight Calculator', description: 'Find your ideal body weight', icon: Users },
    { id: 'water-intake', name: 'Water Intake Calculator', description: 'Calculate daily water requirements', icon: Droplets },
    { id: 'heart-rate-zone', name: 'Heart Rate Zone Calculator', description: 'Find your target heart rate zones', icon: Activity },
    { id: 'biological-age', name: 'Biological Age Calculator', description: 'Calculate your biological age', icon: Calculator }
  ],
  business: [
    { id: 'invoice-generator', name: 'Invoice Generator', description: 'Create professional invoices', icon: Receipt },
    { id: 'pi-generator', name: 'Pi Generator', description: 'Generate digits of Pi', icon: Calculator },
    { id: 'profit-margin', name: 'Profit Margin Calculator', description: 'Calculate profit margins', icon: PieChart },
    { id: 'break-even', name: 'Break-even Calculator', description: 'Calculate break-even point', icon: TrendingUp },
    { id: 'loan-emi', name: 'Business Loan EMI Calculator', description: 'Calculate loan EMI payments', icon: DollarSign },
    { id: 'startup-name', name: 'Startup Name Generator', description: 'Generate creative startup names', icon: Lightbulb }
  ],
  image: [
    { id: 'image-resizer', name: 'Image Resizer', description: 'Resize images to any dimension', icon: Image },
    { id: 'background-remover', name: 'Background Remover', description: 'Remove backgrounds from images', icon: Scissors },
    { id: 'image-compressor', name: 'Image Compressor', description: 'Compress images without quality loss', icon: Zap },
    { id: 'format-converter', name: 'Convert to WebP/JPEG/PNG', description: 'Convert images to different formats', icon: FileCheck },
    { id: 'color-extractor', name: 'Image Color Extractor', description: 'Extract colors from images', icon: Palette }
  ],
  document: [
    { id: 'pdf-to-word', name: 'PDF to Word', description: 'Convert PDF files to Word documents', icon: FileText, comingSoon: true },
    { id: 'word-to-pdf', name: 'Word to PDF', description: 'Convert Word documents to PDF', icon: FileText, comingSoon: true },
    { id: 'pdf-compressor', name: 'PDF Compressor', description: 'Reduce PDF file size', icon: Zap, comingSoon: true },
    { id: 'pdf-merger', name: 'PDF Merger', description: 'Merge multiple PDF files', icon: FileCheck, comingSoon: true },
    { id: 'image-to-pdf', name: 'Image to PDF', description: 'Convert images to PDF format', icon: Image, comingSoon: true }
  ],
  general: [
    { id: 'age-calculator', name: 'Age Calculator', description: 'Calculate your exact age', icon: Clock, comingSoon: true },
    { id: 'stopwatch', name: 'Stopwatch', description: 'Precise time measurement tool', icon: Clock, comingSoon: true },
    { id: 'unit-converter', name: 'Unit Converter', description: 'Convert between different units', icon: Calculator, comingSoon: true },
    { id: 'text-counter', name: 'Text Counter', description: 'Count words, characters, and lines', icon: FileText, comingSoon: true },
    { id: 'world-clock', name: 'World Clock', description: 'Check time across different zones', icon: Globe, comingSoon: true }
  ],
  developer: [
    { id: 'json-formatter', name: 'JSON Formatter', description: 'Format and validate JSON data', icon: Code, comingSoon: true },
    { id: 'base64-encoder', name: 'Base64 Encoder/Decoder', description: 'Encode and decode Base64 strings', icon: Code, comingSoon: true },
    { id: 'regex-tester', name: 'Regex Tester', description: 'Test and validate regular expressions', icon: Search, comingSoon: true },
    { id: 'uuid-generator', name: 'UUID Generator', description: 'Generate unique identifiers', icon: Zap, comingSoon: true },
    { id: 'lorem-ipsum', name: 'Lorem Ipsum Generator', description: 'Generate placeholder text', icon: FileText, comingSoon: true }
  ],
  security: [
    { id: 'password-generator', name: 'Password Generator', description: 'Generate secure passwords', icon: Shield, comingSoon: true },
    { id: 'qr-generator', name: 'QR Code Generator', description: 'Create QR codes for any text', icon: Eye, comingSoon: true },
    { id: 'secure-notes', name: 'Secure Notes', description: 'Encrypted note-taking tool', icon: FileText, comingSoon: true },
    { id: 'hash-generator', name: 'Hash Generator', description: 'Generate SHA256, MD5 hashes', icon: Shield, comingSoon: true },
    { id: 'url-encoder', name: 'URL Encoder/Decoder', description: 'Encode and decode URLs', icon: Globe, comingSoon: true }
  ],
  educational: [
    { id: 'plagiarism-checker', name: 'Plagiarism Checker', description: 'Check for content originality', icon: Search, comingSoon: true },
    { id: 'grammar-checker', name: 'Grammar Checker', description: 'Check and correct grammar', icon: BookOpen, comingSoon: true },
    { id: 'essay-paraphraser', name: 'Essay Paraphraser', description: 'Rephrase text intelligently', icon: FileText, comingSoon: true },
    { id: 'citation-generator', name: 'Citation Generator', description: 'Generate academic citations', icon: BookOpen, comingSoon: true },
    { id: 'reading-analyzer', name: 'Reading Level Analyzer', description: 'Analyze text readability', icon: Eye, comingSoon: true }
  ],
  ai: [
    { id: 'ai-chatbot', name: 'AI Chatbot', description: 'Intelligent conversation assistant', icon: Bot, comingSoon: true },
    { id: 'resume-analyzer', name: 'Resume Analyzer', description: 'Analyze and improve resumes', icon: FileText, comingSoon: true },
    { id: 'cover-letter', name: 'Cover Letter Generator', description: 'Generate personalized cover letters', icon: FileText, comingSoon: true },
    { id: 'story-generator', name: 'AI Story Generator', description: 'Generate creative stories', icon: BookOpen, comingSoon: true },
    { id: 'image-caption', name: 'Image Caption Generator', description: 'Generate captions for images', icon: Image, comingSoon: true }
  ],
  web: [
    { id: 'uptime-checker', name: 'Uptime Checker', description: 'Monitor website availability', icon: Globe, comingSoon: true },
    { id: 'meta-analyzer', name: 'Meta Tag Analyzer', description: 'Analyze website meta tags', icon: Search, comingSoon: true },
    { id: 'screenshot-tool', name: 'Website Screenshot Tool', description: 'Capture website screenshots', icon: Eye, comingSoon: true },
    { id: 'responsive-checker', name: 'Responsive Checker', description: 'Test responsive design', icon: Globe, comingSoon: true },
    { id: 'ssl-checker', name: 'SSL Checker', description: 'Verify SSL certificate status', icon: Shield, comingSoon: true },
    { id: 'domain-tick-mark', name: 'Domain Tick Mark Generator', description: 'Generate DMARC records', icon: Shield, comingSoon: true },
    { id: 'site-auditor', name: 'Site Auditor', description: 'Audit website performance', icon: Search, comingSoon: true }
  ],
  design: [
    { id: 'color-picker', name: 'Color Picker', description: 'Pick and generate color palettes', icon: Palette, comingSoon: true },
    { id: 'css-gradient', name: 'CSS Gradient Generator', description: 'Create beautiful CSS gradients', icon: Palette, comingSoon: true },
    { id: 'font-pairing', name: 'Font Pairing Tool', description: 'Find perfect font combinations', icon: FileText, comingSoon: true },
    { id: 'border-radius', name: 'Border Radius Visualizer', description: 'Visualize CSS border radius', icon: Eye, comingSoon: true },
    { id: 'glassmorphism', name: 'Glassmorphism Generator', description: 'Create glassmorphism effects', icon: Palette, comingSoon: true }
  ],
  'audio-video': [
    { id: 'mp3-cutter', name: 'MP3 Cutter', description: 'Cut and trim audio files', icon: Scissors, comingSoon: true },
    { id: 'audio-to-text', name: 'Audio to Text', description: 'Transcribe audio to text', icon: Mic, comingSoon: true },
    { id: 'video-compressor', name: 'Video Compressor', description: 'Compress video files', icon: Zap, comingSoon: true },
    { id: 'audio-converter', name: 'Audio Converter', description: 'Convert between audio formats', icon: Music, comingSoon: true },
    { id: 'video-to-gif', name: 'Video to GIF', description: 'Convert videos to GIF format', icon: Image, comingSoon: true },
    { id: 'auto-caption', name: 'Auto Caption Generator', description: 'Generate video captions automatically', icon: Mic, comingSoon: true },
    { id: 'ai-ugc-creator', name: 'AI UGC Creator', description: 'Create user-generated content with AI', icon: Bot, comingSoon: true },
    { id: 'audio-cleaner', name: 'Audio Cleaner/Denoise', description: 'Clean and denoise audio files', icon: Music, comingSoon: true }
  ],
  financial: [
    { id: 'tax-calculator', name: 'Tax Calculator', description: 'Calculate tax obligations', icon: CreditCard, comingSoon: true },
    { id: 'budget-planner', name: 'Budget Planner', description: 'Plan and track your budget', icon: DollarSign, comingSoon: true },
    { id: 'emi-calculator', name: 'EMI Calculator', description: 'Calculate loan EMI amounts', icon: Calculator, comingSoon: true },
    { id: 'sip-calculator', name: 'SIP Calculator', description: 'Calculate SIP returns', icon: TrendingUp, comingSoon: true },
    { id: 'currency-converter', name: 'Currency Converter', description: 'Convert between currencies', icon: DollarSign, comingSoon: true },
    { id: 'compound-interest', name: 'Compound Interest Calculator', description: 'Calculate compound interest', icon: TrendingUp, comingSoon: true }
  ],
  system: [
    { id: 'ip-lookup', name: 'IP Lookup', description: 'Look up IP address information', icon: Search, comingSoon: true },
    { id: 'ping-tool', name: 'Ping Tool', description: 'Test network connectivity', icon: HardDrive, comingSoon: true },
    { id: 'port-scanner', name: 'Port Scanner', description: 'Scan for open ports', icon: Shield, comingSoon: true },
    { id: 'whois-lookup', name: 'WHOIS Lookup', description: 'Look up domain information', icon: Globe, comingSoon: true },
    { id: 'mac-finder', name: 'MAC Address Finder', description: 'Find device MAC address', icon: HardDrive, comingSoon: true }
  ],
  legal: [
    { id: 'privacy-policy', name: 'Privacy Policy Generator', description: 'Generate privacy policies', icon: Scale, comingSoon: true },
    { id: 'terms-conditions', name: 'Terms & Conditions Generator', description: 'Generate terms and conditions', icon: FileText, comingSoon: true },
    { id: 'cookie-policy', name: 'Cookie Policy Generator', description: 'Generate cookie policies', icon: Shield, comingSoon: true },
    { id: 'nda-generator', name: 'NDA Generator', description: 'Generate non-disclosure agreements', icon: Scale, comingSoon: true },
    { id: 'disclaimer-generator', name: 'Disclaimer Generator', description: 'Generate legal disclaimers', icon: FileText, comingSoon: true }
  ]
};

const categoryNames = {
  health: 'Health Tools',
  business: 'Business Tools',
  image: 'Image Tools',
  document: 'Document Converters',
  general: 'General Tools',
  developer: 'Developer Tools',
  security: 'Security & Privacy',
  educational: 'Educational Tools',
  ai: 'AI Tools',
  web: 'Web Tools',
  design: 'Design Tools',
  'audio-video': 'Audio/Video Tools',
  financial: 'Financial Tools',
  system: 'System Utilities',
  legal: 'Legal & Compliance'
};

const CategoryPage = () => {
  const { categoryId } = useParams();
  const tools = toolsData[categoryId as keyof typeof toolsData] || [];
  const categoryName = categoryNames[categoryId as keyof typeof categoryNames] || 'Tools';

  if (!tools.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category not found</h1>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                  A
                </div>
                <span className="text-xl font-bold text-gray-900">Alfrez</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Category Header */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              {categoryName}
            </h1>
            <p className="text-xl text-gray-600 animate-fade-in">
              {categoryId === 'health' ? 'Professional tools to maintain your health and wellness' : 
               categoryId === 'business' ? 'Professional tools to manage your business efficiently' :
               categoryId === 'image' ? 'Powerful image editing and processing tools' :
               'Powerful tools coming soon to enhance your productivity'}
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((tool, index) => {
              const IconComponent = tool.icon;
              const isAvailable = (categoryId === 'health') || (categoryId === 'business') || (categoryId === 'image');
              const hasComingSoon = 'comingSoon' in tool && tool.comingSoon;
              const linkTo = (isAvailable && !hasComingSoon) ? `/categories/${categoryId}/${tool.id}` : '/coming-soon';
              
              return (
                <Link
                  key={tool.id}
                  to={linkTo}
                  className="group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 animate-fade-in relative">
                    {hasComingSoon && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className="bg-orange-100 text-orange-600 text-xs font-semibold">
                          🔒 Soon
                        </Badge>
                      </div>
                    )}
                    
                    <div className={`w-12 h-12 rounded-xl ${categoryId === 'health' ? 'bg-gradient-to-br from-red-500 to-pink-500' : 
                                                               categoryId === 'business' ? 'bg-gradient-to-br from-blue-500 to-indigo-500' :
                                                               categoryId === 'image' ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                                                               'bg-gradient-to-br from-gray-400 to-gray-500'} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {tool.description}
                    </p>
                    
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {(isAvailable && !hasComingSoon) ? 'Open Tool' : 'Coming Soon'}
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
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              A
            </div>
            <span className="text-xl font-bold">Alfrez</span>
          </div>
          <p className="text-gray-400">
            &copy; 2024 Alfrez. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CategoryPage;
