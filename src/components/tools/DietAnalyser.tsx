
import React, { useState } from 'react';
import { Heart, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const DietAnalyser = () => {
  const [meals, setMeals] = useState({
    breakfast: '',
    lunch: '',
    dinner: '',
    snacks: ''
  });
  const [analysis, setAnalysis] = useState<any>(null);

  const analyzeDiet = () => {
    // Simple analysis based on keywords
    const allMeals = Object.values(meals).join(' ').toLowerCase();
    
    const nutrients = {
      protein: (allMeals.match(/chicken|fish|egg|meat|beans|tofu|nuts/g) || []).length,
      carbs: (allMeals.match(/rice|bread|pasta|potato|fruit|oats/g) || []).length,
      fats: (allMeals.match(/oil|butter|nuts|cheese|avocado/g) || []).length,
      vegetables: (allMeals.match(/salad|broccoli|spinach|carrot|tomato|vegetable/g) || []).length,
    };

    const total = Object.values(nutrients).reduce((sum, val) => sum + val, 0);
    
    let score = 0;
    let recommendations = [];

    if (nutrients.protein >= 2) score += 25; else recommendations.push('Add more protein sources');
    if (nutrients.vegetables >= 3) score += 25; else recommendations.push('Include more vegetables');
    if (nutrients.carbs >= 2 && nutrients.carbs <= 4) score += 25; else recommendations.push('Balance your carbohydrate intake');
    if (nutrients.fats >= 1 && nutrients.fats <= 3) score += 25; else recommendations.push('Monitor fat intake');

    setAnalysis({
      score,
      nutrients,
      recommendations,
      total
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center mb-4">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Diet Analyser</h1>
        <p className="text-gray-600">Analyze your daily diet and get nutritional insights</p>
      </div>

      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Enter Your Daily Meals</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Breakfast</label>
            <Input
              placeholder="e.g., oats with banana and nuts"
              value={meals.breakfast}
              onChange={(e) => setMeals({ ...meals, breakfast: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lunch</label>
            <Input
              placeholder="e.g., chicken salad with rice"
              value={meals.lunch}
              onChange={(e) => setMeals({ ...meals, lunch: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dinner</label>
            <Input
              placeholder="e.g., grilled fish with vegetables"
              value={meals.dinner}
              onChange={(e) => setMeals({ ...meals, dinner: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Snacks</label>
            <Input
              placeholder="e.g., apple, nuts, yogurt"
              value={meals.snacks}
              onChange={(e) => setMeals({ ...meals, snacks: e.target.value })}
            />
          </div>
        </div>

        <Button
          onClick={analyzeDiet}
          className="w-full mt-6 bg-gradient-to-r from-red-500 to-pink-500"
          disabled={!Object.values(meals).some(meal => meal.trim())}
        >
          Analyze Diet
        </Button>
      </Card>

      {analysis && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Diet Analysis Results</h3>
          
          <div className="text-center mb-6">
            <div className={`text-4xl font-bold mb-2 ${
              analysis.score >= 75 ? 'text-green-600' :
              analysis.score >= 50 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {analysis.score}%
            </div>
            <div className="text-gray-600">Diet Quality Score</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-600">{analysis.nutrients.protein}</div>
              <div className="text-sm text-gray-600">Protein</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-xl font-bold text-green-600">{analysis.nutrients.vegetables}</div>
              <div className="text-sm text-gray-600">Vegetables</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-xl font-bold text-yellow-600">{analysis.nutrients.carbs}</div>
              <div className="text-sm text-gray-600">Carbs</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-xl font-bold text-purple-600">{analysis.nutrients.fats}</div>
              <div className="text-sm text-gray-600">Fats</div>
            </div>
          </div>

          {analysis.recommendations.length > 0 && (
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">Recommendations:</h4>
              <ul className="list-disc list-inside text-sm text-orange-700 space-y-1">
                {analysis.recommendations.map((rec: string, index: number) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default DietAnalyser;
