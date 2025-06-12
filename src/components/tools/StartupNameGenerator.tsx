
import React, { useState } from 'react';
import { Lightbulb, RefreshCw, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const StartupNameGenerator = () => {
  const [keywords, setKeywords] = useState('');
  const [industry, setIndustry] = useState('tech');
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const prefixes = ['Pro', 'Smart', 'Quick', 'Easy', 'Digital', 'Cloud', 'Auto', 'Instant', 'Super', 'Ultra'];
  const suffixes = ['ly', 'ify', 'wise', 'hub', 'labs', 'tech', 'soft', 'app', 'zone', 'flow'];
  const businessWords = ['solutions', 'systems', 'ventures', 'dynamics', 'innovations', 'technologies', 'enterprises', 'studios', 'works', 'group'];

  const generateNames = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const names = [];
      const keywordArray = keywords.split(',').map(k => k.trim()).filter(k => k);
      
      // Generate different types of names
      for (let i = 0; i < 20; i++) {
        const keyword = keywordArray[Math.floor(Math.random() * keywordArray.length)] || 'venture';
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        const businessWord = businessWords[Math.floor(Math.random() * businessWords.length)];
        
        // Different name patterns
        const patterns = [
          `${prefix}${keyword}`,
          `${keyword}${suffix}`,
          `${keyword} ${businessWord}`,
          `${prefix} ${keyword}`,
          `${keyword.charAt(0).toUpperCase()}${keyword.slice(1)}${suffix}`,
          `${keyword} ${prefix}`,
          `${prefix}${keyword} ${businessWord}`,
          `${keyword.toUpperCase()}`,
        ];
        
        const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
        if (!names.includes(randomPattern)) {
          names.push(randomPattern);
        }
      }
      
      setGeneratedNames(names.slice(0, 12));
      setIsGenerating(false);
    }, 1000);
  };

  const copyName = (name: string) => {
    navigator.clipboard.writeText(name);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-4">
          <Lightbulb className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Startup Name Generator</h1>
        <p className="text-gray-600">Generate creative and memorable names for your startup</p>
      </div>

      <Card className="p-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Keywords (comma-separated)
            </label>
            <Input
              placeholder="e.g., tech, digital, smart, fast"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry
            </label>
            <select 
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="tech">Technology</option>
              <option value="finance">Finance</option>
              <option value="health">Healthcare</option>
              <option value="education">Education</option>
              <option value="retail">Retail</option>
              <option value="food">Food & Beverage</option>
              <option value="travel">Travel</option>
              <option value="fitness">Fitness</option>
            </select>
          </div>
          
          <Button 
            onClick={generateNames}
            disabled={isGenerating || !keywords.trim()}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating Names...
              </>
            ) : (
              <>
                <Lightbulb className="w-4 h-4 mr-2" />
                Generate Startup Names
              </>
            )}
          </Button>
        </div>
      </Card>

      {generatedNames.length > 0 && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Generated Names</h3>
            <Button onClick={generateNames} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {generatedNames.map((name, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium text-gray-900">{name}</span>
                <Button
                  onClick={() => copyName(name)}
                  variant="ghost"
                  size="sm"
                  className="ml-2"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Tips for Choosing Your Startup Name:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Keep it short and memorable</li>
              <li>• Make sure the domain is available</li>
              <li>• Check for trademark conflicts</li>
              <li>• Ensure it's easy to pronounce and spell</li>
              <li>• Consider how it will look on business cards and logos</li>
            </ul>
          </div>
        </Card>
      )}
    </div>
  );
};

export default StartupNameGenerator;
