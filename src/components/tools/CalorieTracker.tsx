
import React, { useState } from 'react';
import { Target, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface FoodItem {
  name: string;
  calories: number;
}

const CalorieTracker = () => {
  const [targetCalories, setTargetCalories] = useState(2000);
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [newFood, setNewFood] = useState({ name: '', calories: 0 });

  const addFood = () => {
    if (newFood.name && newFood.calories > 0) {
      setFoods([...foods, newFood]);
      setNewFood({ name: '', calories: 0 });
    }
  };

  const removeFood = (index: number) => {
    setFoods(foods.filter((_, i) => i !== index));
  };

  const totalCalories = foods.reduce((sum, food) => sum + food.calories, 0);
  const remainingCalories = targetCalories - totalCalories;
  const progressPercentage = Math.min((totalCalories / targetCalories) * 100, 100);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center mb-4">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Calorie Tracker</h1>
        <p className="text-gray-600">Track your daily calorie intake and stay on target</p>
      </div>

      <Card className="p-6 mb-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Daily Calorie Target</label>
          <Input
            type="number"
            value={targetCalories}
            onChange={(e) => setTargetCalories(parseInt(e.target.value) || 2000)}
            className="w-full"
          />
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{totalCalories} / {targetCalories} calories</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-red-500 to-pink-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{totalCalories}</div>
            <div className="text-sm text-gray-600">Consumed</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{remainingCalories}</div>
            <div className="text-sm text-gray-600">Remaining</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{foods.length}</div>
            <div className="text-sm text-gray-600">Items</div>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Add Food Item</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Food name"
            value={newFood.name}
            onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Calories"
            value={newFood.calories || ''}
            onChange={(e) => setNewFood({ ...newFood, calories: parseInt(e.target.value) || 0 })}
          />
          <Button onClick={addFood} className="bg-gradient-to-r from-red-500 to-pink-500">
            <Plus className="w-4 h-4 mr-2" />
            Add Food
          </Button>
        </div>
      </Card>

      {foods.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Today's Foods</h3>
          <div className="space-y-3">
            {foods.map((food, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{food.name}</div>
                  <div className="text-sm text-gray-600">{food.calories} calories</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeFood(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default CalorieTracker;
