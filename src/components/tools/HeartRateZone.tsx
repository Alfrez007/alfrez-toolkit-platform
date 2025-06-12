
import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const HeartRateZone = () => {
  const [age, setAge] = useState('');
  const [restingHR, setRestingHR] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculateZones = () => {
    const a = parseInt(age);
    const rhr = parseInt(restingHR) || 60; // Default resting HR
    
    if (!a || a <= 0) return;
    
    const maxHR = 220 - a;
    const hrReserve = maxHR - rhr;
    
    // Using Karvonen formula for more accurate zones
    const zones = [
      {
        name: 'Recovery Zone',
        percentage: '50-60%',
        min: Math.round(rhr + (hrReserve * 0.5)),
        max: Math.round(rhr + (hrReserve * 0.6)),
        color: 'bg-blue-500',
        description: 'Very light activity, recovery',
        benefits: 'Active recovery, improved circulation'
      },
      {
        name: 'Aerobic Base',
        percentage: '60-70%',
        min: Math.round(rhr + (hrReserve * 0.6)),
        max: Math.round(rhr + (hrReserve * 0.7)),
        color: 'bg-green-500',
        description: 'Comfortable conversation pace',
        benefits: 'Fat burning, endurance building'
      },
      {
        name: 'Aerobic Fitness',
        percentage: '70-80%',
        min: Math.round(rhr + (hrReserve * 0.7)),
        max: Math.round(rhr + (hrReserve * 0.8)),
        color: 'bg-yellow-500',
        description: 'Moderate effort, slightly breathless',
        benefits: 'Improved aerobic capacity'
      },
      {
        name: 'Lactate Threshold',
        percentage: '80-90%',
        min: Math.round(rhr + (hrReserve * 0.8)),
        max: Math.round(rhr + (hrReserve * 0.9)),
        color: 'bg-orange-500',
        description: 'Hard effort, uncomfortable',
        benefits: 'Improved lactate threshold'
      },
      {
        name: 'Anaerobic',
        percentage: '90-100%',
        min: Math.round(rhr + (hrReserve * 0.9)),
        max: maxHR,
        color: 'bg-red-500',
        description: 'Very hard, unsustainable',
        benefits: 'Maximum power, short bursts'
      }
    ];
    
    setResult({ zones, maxHR, restingHR: rhr });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center mb-4">
          <Activity className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Heart Rate Zone Calculator</h1>
        <p className="text-gray-600">Find your target heart rate zones for optimal training</p>
      </div>

      <Card className="p-6 mb-6">
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
            <Input
              type="number"
              placeholder="e.g., 30"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resting Heart Rate (optional)
            </label>
            <Input
              type="number"
              placeholder="e.g., 60 (beats per minute)"
              value={restingHR}
              onChange={(e) => setRestingHR(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Measure when you wake up, before getting out of bed
            </p>
          </div>
        </div>

        <Button
          onClick={calculateZones}
          className="w-full bg-gradient-to-r from-red-500 to-pink-500"
          disabled={!age}
        >
          Calculate Heart Rate Zones
        </Button>
      </Card>

      {result && (
        <>
          <Card className="p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-center">Your Heart Rate Zones</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{result.maxHR}</div>
                <div className="text-sm text-gray-600">Max Heart Rate</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{result.restingHR}</div>
                <div className="text-sm text-gray-600">Resting Heart Rate</div>
              </div>
            </div>

            <div className="space-y-4">
              {result.zones.map((zone: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded ${zone.color}`}></div>
                      <div>
                        <div className="font-semibold">{zone.name}</div>
                        <div className="text-sm text-gray-600">{zone.percentage}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{zone.min}-{zone.max}</div>
                      <div className="text-sm text-gray-600">BPM</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">{zone.description}</div>
                  <div className="text-sm text-blue-600">{zone.benefits}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="font-semibold mb-2">Training Tips:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Spend 80% of training time in aerobic zones (Zone 1-2)</li>
              <li>• Use higher zones sparingly for specific adaptations</li>
              <li>• Monitor how you feel, not just heart rate numbers</li>
              <li>• Heart rate can vary with stress, sleep, and other factors</li>
            </ul>
          </Card>
        </>
      )}
    </div>
  );
};

export default HeartRateZone;
