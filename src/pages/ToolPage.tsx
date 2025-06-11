
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BMICalculator from '@/components/tools/BMICalculator';
import InvoiceGenerator from '@/components/tools/InvoiceGenerator';

const ToolPage = () => {
  const { categoryId, toolId } = useParams();

  const renderTool = () => {
    if (categoryId === 'health') {
      switch (toolId) {
        case 'bmi-calculator':
          return <BMICalculator />;
        default:
          return <PlaceholderTool toolName={toolId?.replace(/-/g, ' ')} />;
      }
    } else if (categoryId === 'business') {
      switch (toolId) {
        case 'invoice-generator':
          return <InvoiceGenerator />;
        default:
          return <PlaceholderTool toolName={toolId?.replace(/-/g, ' ')} />;
      }
    }
    
    return <PlaceholderTool toolName={toolId?.replace(/-/g, ' ')} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to={`/categories/${categoryId}`} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to {categoryId === 'health' ? 'Health Tools' : 'Business Tools'}</span>
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

      {/* Tool Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {renderTool()}
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

const PlaceholderTool = ({ toolName }: { toolName?: string }) => (
  <div className="max-w-4xl mx-auto">
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 capitalize">
        {toolName}
      </h1>
      <p className="text-xl text-gray-600">
        This tool is currently under development. Coming soon!
      </p>
    </div>

    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl">🚧</span>
        </div>
        
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Under Development
        </h3>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We're working on creating this amazing tool with powerful features and a beautiful interface.
        </p>
        
        <Link to="/coming-soon">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
            Get Notified When Ready
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

export default ToolPage;
