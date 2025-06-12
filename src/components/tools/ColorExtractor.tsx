
import React, { useState, useRef } from 'react';
import { Palette, Upload, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface Color {
  hex: string;
  rgb: string;
  count: number;
}

const ColorExtractor = () => {
  const [originalImage, setOriginalImage] = useState<string>('');
  const [colors, setColors] = useState<Color[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setColors([]);
      };
      reader.readAsDataURL(file);
    }
  };

  const extractColors = () => {
    if (!originalImage) return;
    
    setIsProcessing(true);
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = document.createElement('img');

    img.onload = () => {
      // Resize image for faster processing
      const maxSize = 100;
      const ratio = Math.min(maxSize / img.width, maxSize / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData?.data;
      
      if (data) {
        const colorMap = new Map<string, number>();
        
        // Sample every 4th pixel for performance
        for (let i = 0; i < data.length; i += 16) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          
          if (a > 128) { // Only count non-transparent pixels
            const hex = `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
            colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
          }
        }
        
        // Convert to array and sort by frequency
        const sortedColors = Array.from(colorMap.entries())
          .map(([hex, count]) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return {
              hex,
              rgb: `rgb(${r}, ${g}, ${b})`,
              count
            };
          })
          .sort((a, b) => b.count - a.count)
          .slice(0, 10); // Top 10 colors
        
        setColors(sortedColors);
      }
      
      setIsProcessing(false);
    };
    img.src = originalImage;
  };

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
  };

  const reset = () => {
    setOriginalImage('');
    setColors([]);
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-4">
          <Palette className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Color Extractor</h1>
        <p className="text-gray-600">Extract dominant colors from your images</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Upload Image</h3>
          
          <div className="space-y-4">
            <div>
              <Label>Select Image</Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              />
            </div>

            {originalImage && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Image Preview</h4>
                  <img
                    src={originalImage}
                    alt="Original"
                    className="max-w-full h-auto border border-gray-200 rounded"
                    style={{ maxHeight: '300px' }}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button 
                    onClick={extractColors} 
                    className="flex-1"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Extracting...' : 'Extract Colors'}
                  </Button>
                  <Button onClick={reset} variant="outline">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Extracted Colors</h3>
          
          <div className="space-y-4">
            {isProcessing && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-600">Extracting colors...</p>
              </div>
            )}

            {colors.length > 0 && !isProcessing && (
              <div className="space-y-3">
                {colors.map((color, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <div 
                      className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => copyToClipboard(color.hex)}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{color.hex}</div>
                      <div className="text-sm text-gray-600">{color.rgb}</div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => copyToClipboard(color.hex)}
                    >
                      Copy
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {!originalImage && !isProcessing && (
              <div className="text-center py-8 text-gray-500">
                Upload an image to extract colors
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ColorExtractor;
