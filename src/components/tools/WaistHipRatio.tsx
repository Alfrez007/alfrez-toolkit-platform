
import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const WaistHipRatio = () => {
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [result, setResult] = useState<{ ratio: number; category: string; color: string; risk: string } | null>(null);

  const calculateRatio = () => {
    const w = parseFloat(waist);
    const h = parseFloat(hip);
    
    if (!w || !h || w <= 0 || h <= 0) return;
    
    const ratio = w / h;
    let category = '';
    let color = '';
    let risk = '';
    
    if (gender === 'male') {
      if (ratio < 0.9) {
        category = 'Low Risk';
        color = 'text-green-600';
        risk = 'Low health risk';
      } else if (ratio < 1.0) {
        category = 'Moderate Risk';
        color = 'text-yellow-600';
        risk = 'Moderate health risk';
      } else {
        category = 'High Risk';
        color = 'text-red-600';
        risk = 'High health risk';
      }
    } else {
      if (ratio < 0.8) {
        category = 'Low Risk';
        color = 'text-green-600';
        risk = 'Low health risk';
      } else if (ratio < 0.85) {
        category = 'Moderate Risk';
        color = 'text-yellow-600';
        risk = 'Moderate health risk';
      } else {
        category = 'High Risk';
        color = 'text-red-600';
        risk = 'High health risk';
      }
    }
    
    setResult({ ratio: parseFloat(ratio.toFixed(2)), category, color, risk });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center mb-4">
          <Activity className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Waist to Hip Ratio Calculator</h1>
        <p className="text-gray-600">Assess your body fat distribution and health risks</p>
      </div>

      <Card className="p-6 mb-6">
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <div className="flex space-x-4">
              <Button
                variant={gender === 'male' ? 'default' : 'outline'}
                onClick={() => setGender('male')}
                className="flex-1"
              >
                Male
              </Button>
              <Button
                variant={gender === 'female' ? 'default' : 'outline'}
                onClick={() => setGender('female')}
                className="flex-1"
              >
                Female
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Waist (cm)</label>
              <Input
                type="number"
                placeholder="e.g., 80"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hip (cm)</label>
              <Input
                type="number"
                placeholder="e.g., 100"
                value={hip}
                onChange={(e) => setHip(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Button
          onClick={calculateRatio}
          className="w-full bg-gradient-to-r from-red-500 to-pink-500"
          disabled={!waist || !hip}
        >
          Calculate Ratio
        </Button>
      </Card>

      {result && (
        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Your Results</h3>
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-gray-900 mb-2">{result.ratio}</div>
            <div className={`text-lg font-semibold ${result.color} mb-2`}>{result.category}</div>
            <div className="text-gray-600">{result.risk}</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Health Guidelines ({gender}):</h4>
            <div className="text-sm space-y-1">
              {gender === 'male' ? (
                <>
                  <div className="flex justify-between">
                    <span>Low Risk:</span>
                    <span className="text-green-600">Below 0.9</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Moderate Risk:</span>
                    <span className="text-yellow-600">0.9 - 1.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>High Risk:</span>
                    <span className="text-red-600">Above 1.0</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span>Low Risk:</span>
                    <span className="text-green-600">Below 0.8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Moderate Risk:</span>
                    <span className="text-yellow-600">0.8 - 0.85</span>
                  </div>
                  <div className="flex justify-between">
                    <span>High Risk:</span>
                    <span className="text-red-600">Above 0.85</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>
      )}

      <Card className="p-6">
        <h4 className="font-semibold mb-2">How to Measure:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• <strong>Waist:</strong> Measure at the narrowest point, usually just above the belly button</li>
          <li>• <strong>Hip:</strong> Measure at the widest point of your hips</li>
          <li>• Use a flexible measuring tape and keep it level</li>
          <li>• Measure after exhaling normally</li>
        </ul>
      </Card>
    </div>
  );
};

export default WaistHipRatio;
