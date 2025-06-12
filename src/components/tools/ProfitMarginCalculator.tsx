
import React, { useState } from 'react';
import { PieChart, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const ProfitMarginCalculator = () => {
  const [revenue, setRevenue] = useState('');
  const [costs, setCosts] = useState('');
  const [results, setResults] = useState<{
    grossProfit: number;
    profitMargin: number;
    markupPercentage: number;
  } | null>(null);

  const calculateProfitMargin = () => {
    const revenueNum = parseFloat(revenue) || 0;
    const costsNum = parseFloat(costs) || 0;
    
    const grossProfit = revenueNum - costsNum;
    const profitMargin = revenueNum > 0 ? (grossProfit / revenueNum) * 100 : 0;
    const markupPercentage = costsNum > 0 ? (grossProfit / costsNum) * 100 : 0;
    
    setResults({
      grossProfit,
      profitMargin,
      markupPercentage
    });
  };

  const reset = () => {
    setRevenue('');
    setCosts('');
    setResults(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-4">
          <PieChart className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profit Margin Calculator</h1>
        <p className="text-gray-600">Calculate your profit margins and markup percentages</p>
      </div>

      <Card className="p-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Revenue ($)
            </label>
            <Input
              type="number"
              placeholder="Enter total revenue"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Costs ($)
            </label>
            <Input
              type="number"
              placeholder="Enter total costs"
              value={costs}
              onChange={(e) => setCosts(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex space-x-3">
            <Button 
              onClick={calculateProfitMargin}
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500"
            >
              Calculate
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
            Profit Analysis Results
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                ${results.grossProfit.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Gross Profit</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {results.profitMargin.toFixed(2)}%
              </div>
              <div className="text-sm text-gray-600">Profit Margin</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {results.markupPercentage.toFixed(2)}%
              </div>
              <div className="text-sm text-gray-600">Markup Percentage</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Interpretation:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Profit Margin: Shows what percentage of revenue is profit</li>
              <li>• Markup: Shows how much you're charging above cost</li>
              <li>• Higher margins indicate better profitability</li>
            </ul>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProfitMarginCalculator;
