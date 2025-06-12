
import React, { useState } from 'react';
import { TrendingUp, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const BreakEvenCalculator = () => {
  const [fixedCosts, setFixedCosts] = useState('');
  const [variableCostPerUnit, setVariableCostPerUnit] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [results, setResults] = useState<{
    breakEvenUnits: number;
    breakEvenRevenue: number;
    contributionMargin: number;
    contributionMarginRatio: number;
  } | null>(null);

  const calculateBreakEven = () => {
    const fixed = parseFloat(fixedCosts) || 0;
    const variableCost = parseFloat(variableCostPerUnit) || 0;
    const price = parseFloat(pricePerUnit) || 0;
    
    const contributionMargin = price - variableCost;
    const contributionMarginRatio = price > 0 ? (contributionMargin / price) * 100 : 0;
    
    const breakEvenUnits = contributionMargin > 0 ? fixed / contributionMargin : 0;
    const breakEvenRevenue = breakEvenUnits * price;
    
    setResults({
      breakEvenUnits,
      breakEvenRevenue,
      contributionMargin,
      contributionMarginRatio
    });
  };

  const reset = () => {
    setFixedCosts('');
    setVariableCostPerUnit('');
    setPricePerUnit('');
    setResults(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-4">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Break-Even Calculator</h1>
        <p className="text-gray-600">Calculate how many units you need to sell to break even</p>
      </div>

      <Card className="p-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fixed Costs ($)
            </label>
            <Input
              type="number"
              placeholder="Enter fixed costs (rent, salaries, etc.)"
              value={fixedCosts}
              onChange={(e) => setFixedCosts(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Variable Cost per Unit ($)
            </label>
            <Input
              type="number"
              placeholder="Enter variable cost per unit"
              value={variableCostPerUnit}
              onChange={(e) => setVariableCostPerUnit(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price per Unit ($)
            </label>
            <Input
              type="number"
              placeholder="Enter selling price per unit"
              value={pricePerUnit}
              onChange={(e) => setPricePerUnit(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex space-x-3">
            <Button 
              onClick={calculateBreakEven}
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500"
            >
              Calculate Break-Even
            </Button>
            <Button onClick={reset} variant="outline">
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {results && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Break-Even Analysis Results
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {Math.ceil(results.breakEvenUnits)}
              </div>
              <div className="text-sm text-gray-600">Units to Break Even</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                ${results.breakEvenRevenue.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Break-Even Revenue</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                ${results.contributionMargin.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Contribution Margin per Unit</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {results.contributionMarginRatio.toFixed(2)}%
              </div>
              <div className="text-sm text-gray-600">Contribution Margin Ratio</div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Key Insights:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• You need to sell <strong>{Math.ceil(results.breakEvenUnits)} units</strong> to cover all costs</li>
              <li>• Each unit sold contributes <strong>${results.contributionMargin.toFixed(2)}</strong> toward fixed costs</li>
              <li>• Once you exceed break-even, each additional unit generates <strong>${results.contributionMargin.toFixed(2)}</strong> in profit</li>
            </ul>
          </div>
        </Card>
      )}
    </div>
  );
};

export default BreakEvenCalculator;
