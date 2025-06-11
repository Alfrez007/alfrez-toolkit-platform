
import React, { useState } from 'react';
import { Calculator, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<{ bmi: number; category: string; color: string } | null>(null);

  const calculateBMI = () => {
    const h = parseFloat(height) / 100; // Convert cm to meters
    const w = parseFloat(weight);
    
    if (!h || !w || h <= 0 || w <= 0) return;
    
    const bmi = w / (h * h);
    let category = '';
    let color = '';
    
    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-blue-600';
    } else if (bmi < 25) {
      category = 'Normal weight';
      color = 'text-green-600';
    } else if (bmi < 30) {
      category = 'Overweight';
      color = 'text-orange-600';
    } else {
      category = 'Obese';
      color = 'text-red-600';
    }
    
    setResult({ bmi: parseFloat(bmi.toFixed(1)), category, color });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center mb-4">
          <Calculator className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">BMI Calculator</h1>
        <p className="text-gray-600">Calculate your Body Mass Index and understand your weight status</p>
      </div>

      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
            <Input
              type="number"
              placeholder="e.g., 175"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
            <Input
              type="number"
              placeholder="e.g., 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <Button 
          onClick={calculateBMI}
          className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
          disabled={!height || !weight}
        >
          Calculate BMI
        </Button>
      </Card>

      {result && (
        <Card className="p-6 mb-6 animate-fade-in">
          <h3 className="text-xl font-semibold mb-4 text-center">Your Results</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">{result.bmi}</div>
            <div className={`text-lg font-semibold ${result.color} mb-4`}>{result.category}</div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-2">BMI Categories:</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Underweight:</span>
                  <span className="text-blue-600">Below 18.5</span>
                </div>
                <div className="flex justify-between">
                  <span>Normal weight:</span>
                  <span className="text-green-600">18.5 - 24.9</span>
                </div>
                <div className="flex justify-between">
                  <span>Overweight:</span>
                  <span className="text-orange-600">25 - 29.9</span>
                </div>
                <div className="flex justify-between">
                  <span>Obese:</span>
                  <span className="text-red-600">30 and above</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-6">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-500 mt-0.5" />
          <div className="text-sm text-gray-600">
            <p className="mb-2">
              <strong>Disclaimer:</strong> BMI is a useful indicator but doesn't account for muscle mass, bone density, and other factors.
            </p>
            <p>Consult with a healthcare professional for a comprehensive health assessment.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BMICalculator;
