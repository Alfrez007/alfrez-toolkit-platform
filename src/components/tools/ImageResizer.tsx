
import React, { useState, useRef } from 'react';
import { Image, Upload, Download, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const ImageResizer = () => {
  const [originalImage, setOriginalImage] = useState<string>('');
  const [resizedImage, setResizedImage] = useState<string>('');
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const [originalDimensions, setOriginalDimensions] = useState<{width: number, height: number}>({width: 0, height: 0});
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.onload = () => {
          setOriginalDimensions({width: img.width, height: img.height});
          setWidth(img.width);
          setHeight(img.height);
        };
        img.src = e.target?.result as string;
        setOriginalImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resizeImage = () => {
    if (!originalImage) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = document.createElement('img');

    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);
      setResizedImage(canvas.toDataURL('image/jpeg', 0.9));
    };
    img.src = originalImage;
  };

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (maintainAspectRatio && originalDimensions.width > 0) {
      const aspectRatio = originalDimensions.height / originalDimensions.width;
      setHeight(Math.round(newWidth * aspectRatio));
    }
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (maintainAspectRatio && originalDimensions.height > 0) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      setWidth(Math.round(newHeight * aspectRatio));
    }
  };

  const downloadImage = () => {
    if (!resizedImage) return;
    const link = document.createElement('a');
    link.download = 'resized-image.jpg';
    link.href = resizedImage;
    link.click();
  };

  const reset = () => {
    setOriginalImage('');
    setResizedImage('');
    setWidth(800);
    setHeight(600);
    setOriginalDimensions({width: 0, height: 0});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
          <Image className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Image Resizer</h1>
        <p className="text-gray-600">Resize your images to any dimension while maintaining quality</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Upload & Configure</h3>
          
          <div className="space-y-4">
            <div>
              <Label>Upload Image</Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              />
            </div>

            {originalImage && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Width (px)</Label>
                    <Input
                      type="number"
                      value={width}
                      onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Height (px)</Label>
                    <Input
                      type="number"
                      value={height}
                      onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="aspectRatio"
                    checked={maintainAspectRatio}
                    onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                  />
                  <Label htmlFor="aspectRatio">Maintain aspect ratio</Label>
                </div>

                <div className="text-sm text-gray-600">
                  Original: {originalDimensions.width} × {originalDimensions.height} px
                </div>

                <div className="flex space-x-2">
                  <Button onClick={resizeImage} className="flex-1">
                    Resize Image
                  </Button>
                  <Button onClick={reset} variant="outline">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Preview</h3>
          
          <div className="space-y-4">
            {originalImage && (
              <div>
                <h4 className="font-medium mb-2">Original</h4>
                <img
                  src={originalImage}
                  alt="Original"
                  className="max-w-full h-auto border border-gray-200 rounded"
                  style={{ maxHeight: '200px' }}
                />
              </div>
            )}

            {resizedImage && (
              <div>
                <h4 className="font-medium mb-2">Resized ({width} × {height})</h4>
                <img
                  src={resizedImage}
                  alt="Resized"
                  className="max-w-full h-auto border border-gray-200 rounded"
                  style={{ maxHeight: '200px' }}
                />
                <Button onClick={downloadImage} className="w-full mt-2">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resized Image
                </Button>
              </div>
            )}

            {!originalImage && (
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

export default ImageResizer;
