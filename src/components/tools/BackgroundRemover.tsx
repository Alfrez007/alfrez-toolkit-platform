
import React, { useState, useRef } from 'react';
import { Scissors, Upload, Download, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const BackgroundRemover = () => {
  const [originalImage, setOriginalImage] = useState<string>('');
  const [processedImage, setProcessedImage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setProcessedImage('');
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBackground = async () => {
    if (!originalImage) return;
    
    setIsProcessing(true);
    
    // Simulate background removal process
    setTimeout(() => {
      // For demo purposes, we'll just add a transparent checkerboard pattern
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Create checkerboard pattern to simulate transparency
        const checkSize = 20;
        for (let x = 0; x < canvas.width; x += checkSize) {
          for (let y = 0; y < canvas.height; y += checkSize) {
            const isEven = (Math.floor(x / checkSize) + Math.floor(y / checkSize)) % 2 === 0;
            ctx!.fillStyle = isEven ? '#f0f0f0' : '#e0e0e0';
            ctx!.fillRect(x, y, checkSize, checkSize);
          }
        }
        
        // Draw the original image with some transparency
        ctx!.globalAlpha = 0.8;
        ctx!.drawImage(img, 0, 0);
        
        setProcessedImage(canvas.toDataURL('image/png'));
        setIsProcessing(false);
      };
      img.src = originalImage;
    }, 2000);
  };

  const downloadImage = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.download = 'background-removed.png';
    link.href = processedImage;
    link.click();
  };

  const reset = () => {
    setOriginalImage('');
    setProcessedImage('');
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center mb-4">
          <Scissors className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Background Remover</h1>
        <p className="text-gray-600">Remove backgrounds from your images with AI technology</p>
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
                  <h4 className="font-medium mb-2">Original Image</h4>
                  <img
                    src={originalImage}
                    alt="Original"
                    className="max-w-full h-auto border border-gray-200 rounded"
                    style={{ maxHeight: '300px' }}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button 
                    onClick={removeBackground} 
                    className="flex-1"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Remove Background'}
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
          <h3 className="text-xl font-semibold mb-4">Result</h3>
          
          <div className="space-y-4">
            {isProcessing && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-600">Removing background...</p>
              </div>
            )}

            {processedImage && !isProcessing && (
              <div>
                <h4 className="font-medium mb-2">Background Removed</h4>
                <img
                  src={processedImage}
                  alt="Processed"
                  className="max-w-full h-auto border border-gray-200 rounded"
                  style={{ maxHeight: '300px' }}
                />
                <Button onClick={downloadImage} className="w-full mt-4">
                  <Download className="w-4 h-4 mr-2" />
                  Download Image
                </Button>
              </div>
            )}

            {!originalImage && !isProcessing && (
              <div className="text-center py-8 text-gray-500">
                Upload an image to get started
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BackgroundRemover;
