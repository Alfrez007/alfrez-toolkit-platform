
import React, { useState, useRef } from 'react';
import { Zap, Upload, Download, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const ImageCompressor = () => {
  const [originalImage, setOriginalImage] = useState<string>('');
  const [compressedImage, setCompressedImage] = useState<string>('');
  const [quality, setQuality] = useState<number>(80);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setCompressedImage('');
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = () => {
    if (!originalImage) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const compressed = canvas.toDataURL('image/jpeg', quality / 100);
      setCompressedImage(compressed);
      
      // Calculate compressed size (approximate)
      const base64Length = compressed.length - 'data:image/jpeg;base64,'.length;
      const sizeInBytes = Math.round((base64Length * 3) / 4);
      setCompressedSize(sizeInBytes);
    };
    img.src = originalImage;
  };

  const downloadImage = () => {
    if (!compressedImage) return;
    const link = document.createElement('a');
    link.download = 'compressed-image.jpg';
    link.href = compressedImage;
    link.click();
  };

  const reset = () => {
    setOriginalImage('');
    setCompressedImage('');
    setOriginalSize(0);
    setCompressedSize(0);
    setQuality(80);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const compressionRatio = originalSize > 0 && compressedSize > 0 
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
    : 0;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-4">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Image Compressor</h1>
        <p className="text-gray-600">Reduce image file size while maintaining quality</p>
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
                <div>
                  <Label>Quality: {quality}%</Label>
                  <Input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="mt-1"
                  />
                  <div className="text-sm text-gray-600 mt-1">
                    Lower quality = smaller file size
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">File Information</h4>
                  <div className="text-sm space-y-1">
                    <div>Original size: {formatFileSize(originalSize)}</div>
                    {compressedSize > 0 && (
                      <>
                        <div>Compressed size: {formatFileSize(compressedSize)}</div>
                        <div className="font-medium text-green-600">
                          Reduction: {compressionRatio}%
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={compressImage} className="flex-1">
                    Compress Image
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

            {compressedImage && (
              <div>
                <h4 className="font-medium mb-2">Compressed (Quality: {quality}%)</h4>
                <img
                  src={compressedImage}
                  alt="Compressed"
                  className="max-w-full h-auto border border-gray-200 rounded"
                  style={{ maxHeight: '200px' }}
                />
                <Button onClick={downloadImage} className="w-full mt-2">
                  <Download className="w-4 h-4 mr-2" />
                  Download Compressed Image
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

export default ImageCompressor;
