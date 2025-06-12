
import React, { useState } from 'react';
import { Calculator, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const PiGenerator = () => {
  const [digits, setDigits] = useState(100);
  const [piValue, setPiValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Leibniz formula for pi (simple approximation)
  const generatePi = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      let pi = 0;
      const iterations = Math.max(10000, digits * 100);
      
      for (let i = 0; i < iterations; i++) {
        pi += ((-1) ** i) / (2 * i + 1);
      }
      
      const piResult = (4 * pi).toFixed(Math.min(digits, 15));
      setPiValue(piResult);
      setIsGenerating(false);
    }, 500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(piValue);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-4">
          <Calculator className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pi Generator</h1>
        <p className="text-gray-600">Generate digits of Pi (π) with precision</p>
      </div>

      <Card className="p-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Decimal Places (max 15)
            </label>
            <Input
              type="number"
              min="1"
              max="15"
              value={digits}
              onChange={(e) => setDigits(Math.min(15, parseInt(e.target.value) || 1))}
              className="w-full"
            />
          </div>
          
          <Button 
            onClick={generatePi}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500"
          >
            {isGenerating ? 'Generating...' : 'Generate Pi'}
          </Button>
        </div>
      </Card>

      {piValue && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Generated Pi Value</h3>
              <Button onClick={copyToClipboard} variant="outline" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-lg break-all">
              {piValue}
            </div>
            
            <div className="text-sm text-gray-600">
              <p>π ≈ {piValue}</p>
              <p>Calculated using the Leibniz formula</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PiGenerator;
