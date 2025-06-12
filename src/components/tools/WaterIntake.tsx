
import React, { useState } from 'react';
import { Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const WaterIntake = () => {
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'moderate' | 'active' | 'very-active'>('moderate');
  const [climate, setClimate] = useState<'cool' | 'moderate' | 'hot'>('moderate');
  const [result, setResult] = useState<any>(null);

  const calculateWaterIntake = () => {
    const w = parseFloat(weight);
    
    if (!w || w <= 0) return;
    
    // Base calculation: 35ml per kg of body weight
    let baseIntake = w * 35;
    
    // Activity level adjustments
    const activityMultiplier = {
      'sedentary': 1.0,
      'moderate': 1.2,
      'active': 1.4,
      'very-active': 1.6
    };
    
    // Climate adjustments
    const climateAdjustment = {
      'cool': 0,
      'moderate': 200,
      'hot': 500
    };
    
    const totalIntake = (baseIntake * activityMultiplier[activityLevel]) + climateAdjustment[climate];
    const glasses = Math.round(totalIntake / 250); // 250ml per glass
    const bottles = Math.round(totalIntake / 500); // 500ml per bottle
    
    setResult({
      totalMl: Math.round(totalIntake),
      glasses,
      bottles,
      liters: (totalIntake / 1000).toFixed(1)
    });
  };

  const activityLevels = [
    { key: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise' },
    { key: 'moderate', label: 'Moderate', desc: 'Light exercise 1-3 days/week' },
    { key: 'active', label: 'Active', desc: 'Moderate exercise 3-5 days/week' },
    { key: 'very-active', label: 'Very Active', desc: 'Heavy exercise 6-7 days/week' }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center mb-4">
          <Droplets className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Water Intake Calculator</h1>
        <p className="text-gray-600">Calculate your daily water requirements based on your lifestyle</p>
      </div>

      <Card className="p-6 mb-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Body Weight (kg)</label>
            <Input
              type="number"
              placeholder="e.g., 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Activity Level</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activityLevels.map((level) => (
                <div
                  key={level.key}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    activityLevel === level.key
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setActivityLevel(level.key as any)}
                >
                  <div className="font-medium">{level.label}</div>
                  <div className="text-sm text-gray-600">{level.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Climate</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: 'cool', label: 'Cool', desc: 'Below 20°C' },
                { key: 'moderate', label: 'Moderate', desc: '20-25°C' },
                { key: 'hot', label: 'Hot', desc: 'Above 25°C' }
              ].map((c) => (
                <div
                  key={c.key}
                  className={`p-3 border rounded-lg cursor-pointer text-center transition-colors ${
                    climate === c.key
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setClimate(c.key as any)}
                >
                  <div className="font-medium">{c.label}</div>
                  <div className="text-xs text-gray-600">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button
          onClick={calculateWaterIntake}
          className="w-full mt-6 bg-gradient-to-r from-red-500 to-pink-500"
          disabled={!weight}
        >
          Calculate Water Intake
        </Button>
      </Card>

      {result && (
        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Your Daily Water Requirement</h3>
          
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">{result.liters}L</div>
            <div className="text-gray-600">Total daily intake</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{result.totalMl} ml</div>
              <div className="text-sm text-gray-600">Milliliters</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{result.glasses}</div>
              <div className="text-sm text-gray-600">Glasses (250ml)</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{result.bottles}</div>
              <div className="text-sm text-gray-600">Bottles (500ml)</div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Tips for staying hydrated:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Drink water throughout the day, not just when thirsty</li>
              <li>• Increase intake during exercise or hot weather</li>
              <li>• Monitor urine color - pale yellow indicates good hydration</li>
              <li>• Include water-rich foods like fruits and vegetables</li>
            </ul>
          </div>
        </Card>
      )}
    </div>
  );
};

export default WaterIntake;
