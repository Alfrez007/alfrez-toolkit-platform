
import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const BiologicalAge = () => {
  const [formData, setFormData] = useState({
    age: '',
    exerciseHours: '',
    sleepHours: '',
    smokingStatus: 'never',
    alcoholFrequency: 'rarely',
    stressLevel: '3',
    bmi: '',
    chronicConditions: '0'
  });
  const [result, setResult] = useState<any>(null);

  const calculateBiologicalAge = () => {
    const age = parseInt(formData.age);
    if (!age) return;

    let biologicalAge = age;
    
    // Exercise factor
    const exercise = parseInt(formData.exerciseHours) || 0;
    if (exercise >= 5) biologicalAge -= 3;
    else if (exercise >= 3) biologicalAge -= 1;
    else if (exercise < 1) biologicalAge += 2;

    // Sleep factor
    const sleep = parseInt(formData.sleepHours) || 8;
    if (sleep >= 7 && sleep <= 9) biologicalAge -= 1;
    else if (sleep < 6 || sleep > 10) biologicalAge += 2;

    // Smoking factor
    if (formData.smokingStatus === 'current') biologicalAge += 5;
    else if (formData.smokingStatus === 'former') biologicalAge += 1;

    // Alcohol factor
    if (formData.alcoholFrequency === 'daily') biologicalAge += 2;
    else if (formData.alcoholFrequency === 'weekly') biologicalAge += 0.5;

    // Stress factor
    const stress = parseInt(formData.stressLevel);
    biologicalAge += (stress - 3) * 0.5;

    // BMI factor
    const bmi = parseFloat(formData.bmi) || 0;
    if (bmi > 30) biologicalAge += 3;
    else if (bmi > 25) biologicalAge += 1;
    else if (bmi < 18.5) biologicalAge += 1;

    // Chronic conditions
    const conditions = parseInt(formData.chronicConditions) || 0;
    biologicalAge += conditions * 2;

    const difference = biologicalAge - age;
    let category = '';
    let color = '';
    
    if (difference <= -3) {
      category = 'Excellent';
      color = 'text-green-600';
    } else if (difference <= 0) {
      category = 'Good';
      color = 'text-blue-600';
    } else if (difference <= 3) {
      category = 'Average';
      color = 'text-yellow-600';
    } else {
      category = 'Needs Improvement';
      color = 'text-red-600';
    }

    setResult({
      biologicalAge: Math.round(biologicalAge * 10) / 10,
      chronologicalAge: age,
      difference: Math.round(difference * 10) / 10,
      category,
      color
    });
  };

  const updateFormData = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center mb-4">
          <Calculator className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Biological Age Calculator</h1>
        <p className="text-gray-600">Estimate your biological age based on lifestyle factors</p>
      </div>

      <Card className="p-6 mb-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chronological Age
              </label>
              <Input
                type="number"
                placeholder="e.g., 35"
                value={formData.age}
                onChange={(e) => updateFormData('age', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Exercise (hours/week)
              </label>
              <Input
                type="number"
                placeholder="e.g., 3"
                value={formData.exerciseHours}
                onChange={(e) => updateFormData('exerciseHours', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sleep (hours/night)
              </label>
              <Input
                type="number"
                placeholder="e.g., 8"
                value={formData.sleepHours}
                onChange={(e) => updateFormData('sleepHours', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                BMI (optional)
              </label>
              <Input
                type="number"
                step="0.1"
                placeholder="e.g., 24.5"
                value={formData.bmi}
                onChange={(e) => updateFormData('bmi', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Smoking Status
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.smokingStatus}
              onChange={(e) => updateFormData('smokingStatus', e.target.value)}
            >
              <option value="never">Never smoked</option>
              <option value="former">Former smoker</option>
              <option value="current">Current smoker</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alcohol Consumption
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.alcoholFrequency}
              onChange={(e) => updateFormData('alcoholFrequency', e.target.value)}
            >
              <option value="rarely">Rarely/Never</option>
              <option value="weekly">1-3 times per week</option>
              <option value="daily">Daily</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stress Level (1-5, where 5 is very high)
            </label>
            <Input
              type="range"
              min="1"
              max="5"
              value={formData.stressLevel}
              onChange={(e) => updateFormData('stressLevel', e.target.value)}
              className="w-full"
            />
            <div className="text-center text-sm text-gray-600 mt-1">
              {formData.stressLevel}/5
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Chronic Conditions
            </label>
            <Input
              type="number"
              min="0"
              placeholder="e.g., 0"
              value={formData.chronicConditions}
              onChange={(e) => updateFormData('chronicConditions', e.target.value)}
            />
          </div>
        </div>

        <Button
          onClick={calculateBiologicalAge}
          className="w-full mt-6 bg-gradient-to-r from-red-500 to-pink-500"
          disabled={!formData.age}
        >
          Calculate Biological Age
        </Button>
      </Card>

      {result && (
        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Your Biological Age</h3>
          
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {result.biologicalAge} years
            </div>
            <div className={`text-lg font-semibold ${result.color} mb-2`}>
              {result.category}
            </div>
            <div className="text-gray-600">
              {result.difference > 0 
                ? `${Math.abs(result.difference)} years older than chronological age`
                : result.difference < 0
                ? `${Math.abs(result.difference)} years younger than chronological age`
                : 'Same as chronological age'
              }
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{result.chronologicalAge}</div>
              <div className="text-sm text-gray-600">Chronological Age</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{result.biologicalAge}</div>
              <div className="text-sm text-gray-600">Biological Age</div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Tips to improve biological age:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Exercise regularly (aim for 150+ minutes per week)</li>
              <li>• Maintain 7-9 hours of quality sleep</li>
              <li>• Manage stress through meditation or relaxation</li>
              <li>• Maintain a healthy weight and BMI</li>
              <li>• Avoid smoking and limit alcohol consumption</li>
            </ul>
          </div>
        </Card>
      )}

      <Card className="p-6">
        <p className="text-sm text-gray-600">
          <strong>Disclaimer:</strong> This is an estimate based on lifestyle factors and should not replace professional medical advice. Consult healthcare professionals for comprehensive health assessments.
        </p>
      </Card>
    </div>
  );
};

export default BiologicalAge;
