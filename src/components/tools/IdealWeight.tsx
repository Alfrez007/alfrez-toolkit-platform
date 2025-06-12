
import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const IdealWeight = () => {
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [result, setResult] = useState<any>(null);

  const calculateIdealWeight = () => {
    const h = parseFloat(height);
    const a = parseInt(age);
    
    if (!h || !a || h <= 0 || a <= 0) return;
    
    // Using multiple formulas
    const heightInches = h / 2.54; // Convert cm to inches
    
    // Robinson Formula
    let robinson = 0;
    if (gender === 'male') {
      robinson = 52 + 1.9 * ((heightInches - 60) / 2.54 * 2.54 / 2.54);
      robinson = 52 + 1.9 * (h - 152.4) / 2.54;
    } else {
      robinson = 49 + 1.7 * (h - 152.4) / 2.54;
    }
    
    // Miller Formula
    let miller = 0;
    if (gender === 'male') {
      miller = 56.2 + 1.41 * (h - 152.4) / 2.54;
    } else {
      miller = 53.1 + 1.36 * (h - 152.4) / 2.54;
    }
    
    // Devine Formula
    let devine = 0;
    if (gender === 'male') {
      devine = 50 + 2.3 * (h - 152.4) / 2.54;
    } else {
      devine = 45.5 + 2.3 * (h - 152.4) / 2.54;
    }
    
    const average = (robinson + miller + devine) / 3;
    const range = {
      min: Math.round(average * 0.9),
      max: Math.round(average * 1.1)
    };
    
    setResult({
      robinson: Math.round(robinson),
      miller: Math.round(miller),
      devine: Math.round(devine),
      average: Math.round(average),
      range
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center mb-4">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ideal Weight Calculator</h1>
        <p className="text-gray-600">Calculate your ideal body weight using multiple formulas</p>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
              <Input
                type="number"
                placeholder="e.g., 175"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <Input
                type="number"
                placeholder="e.g., 30"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Button
          onClick={calculateIdealWeight}
          className="w-full bg-gradient-to-r from-red-500 to-pink-500"
          disabled={!height || !age}
        >
          Calculate Ideal Weight
        </Button>
      </Card>

      {result && (
        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Your Ideal Weight Range</h3>
          
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {result.range.min} - {result.range.max} kg
            </div>
            <div className="text-gray-600">Recommended weight range</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{result.robinson} kg</div>
              <div className="text-sm text-gray-600">Robinson Formula</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{result.miller} kg</div>
              <div className="text-sm text-gray-600">Miller Formula</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{result.devine} kg</div>
              <div className="text-sm text-gray-600">Devine Formula</div>
            </div>
          </div>

          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{result.average} kg</div>
            <div className="text-sm text-gray-600">Average of all formulas</div>
          </div>
        </Card>
      )}

      <Card className="p-6">
        <h4 className="font-semibold mb-2">About the Formulas:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• <strong>Robinson Formula:</strong> Most commonly used in medical practice</li>
          <li>• <strong>Miller Formula:</strong> More recent adaptation of Devine formula</li>
          <li>• <strong>Devine Formula:</strong> Originally developed for drug dosing</li>
          <li>• These are estimates - consult healthcare professionals for personalized advice</li>
        </ul>
      </Card>
    </div>
  );
};

export default IdealWeight;
