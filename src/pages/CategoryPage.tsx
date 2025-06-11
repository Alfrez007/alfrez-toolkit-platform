
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Calculator, Target, Droplets, Activity, Users, Receipt, PieChart, TrendingUp, DollarSign, FileText, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  ]
};

const categoryNames = {
  health: 'Health Tools',
  business: 'Business Tools'
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
                <span className="text-xl font-bold text-gray-900">Alfrez Toolkit</span>
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
              Professional tools to help you {categoryId === 'health' ? 'maintain your health and wellness' : 'manage your business efficiently'}
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
              return (
                <Link
                  key={tool.id}
                  to={`/categories/${categoryId}/${tool.id}`}
                  className="group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 animate-fade-in">
                    <div className={`w-12 h-12 rounded-xl ${categoryId === 'health' ? 'bg-gradient-to-br from-red-500 to-pink-500' : 'bg-gradient-to-br from-blue-500 to-indigo-500'} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
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
                        Open Tool
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
            <span className="text-xl font-bold">Alfrez Toolkit</span>
          </div>
          <p className="text-gray-400">
            &copy; 2024 Alfrez Toolkit. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CategoryPage;
