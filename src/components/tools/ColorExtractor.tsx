
import React, { useState, useRef } from 'react';
import { Image, Upload, Copy, RotateCcw } from 'lucide-react';
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
  const [extractedColors, setExtractedColors] = useState<Color[]>([]);
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setExtractedColors([]);
      };
      reader.readAsDataURL(file);
    }
  };

  const extractColors = () => {
    if (!originalImage) return;
    
    setIsExtracting(true);
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (!imageData) return;
      
      const colorMap = new Map<string, number>();
      
      // Sample every 10th pixel for performance
      for (let i = 0; i < imageData.data.length; i += 40) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        
        // Skip transparent pixels
        if (imageData.data[i + 3] < 128) continue;
        
        const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        const rgb = `rgb(${r}, ${g}, ${b})`;
        
        const key = `${hex}|${rgb}`;
        colorMap.set(key, (colorMap.get(key) || 0) + 1);
      }
      
      // Get top 12 colors
      const sortedColors = Array.from(colorMap.entries())
        .sort(([, a], [, b]) => b - a)
        .slice(0, 12)
        .map(([key, count]) => {
          const [hex, rgb] = key.split('|');
          return { hex, rgb, count };
        });
      
      setExtractedColors(sortedColors);
      setIsExtracting(false);
    };
    
    img.src = originalImage;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const reset = () => {
    setOriginalImage('');
    setExtractedColors([]);
    setIsExtracting(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center mb-4">
          <Image className="w-8 h-8 text-white" />
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
                    disabled={isExtracting}
                  >
                    {isExtracting ? 'Extracting...' : 'Extract Colors'}
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
            {isExtracting && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-600">Extracting colors...</p>
              </div>
            )}

            {extractedColors.length > 0 && !isExtracting && (
              <div className="grid grid-cols-2 gap-3">
                {extractedColors.map((color, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <div 
                      className="w-full h-16 rounded mb-2 border border-gray-200"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    <div className="text-sm space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs">{color.hex}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(color.hex)}
                          className="p-1 h-6 w-6"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs">{color.rgb}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(color.rgb)}
                          className="p-1 h-6 w-6"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!originalImage && !isExtracting && (
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
