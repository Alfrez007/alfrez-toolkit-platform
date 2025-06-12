
import React, { useState, useRef } from 'react';
import { FileImage, Upload, Download, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FormatConverter = () => {
  const [originalImage, setOriginalImage] = useState<string>('');
  const [convertedImage, setConvertedImage] = useState<string>('');
  const [outputFormat, setOutputFormat] = useState<string>('jpeg');
  const [quality, setQuality] = useState<number>(90);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setConvertedImage('');
      };
      reader.readAsDataURL(file);
    }
  };

  const convertImage = () => {
    if (!originalImage) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = document.createElement('img');

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      let mimeType = 'image/jpeg';
      if (outputFormat === 'png') mimeType = 'image/png';
      if (outputFormat === 'webp') mimeType = 'image/webp';
      
      const converted = canvas.toDataURL(mimeType, quality / 100);
      setConvertedImage(converted);
    };
    img.src = originalImage;
  };

  const downloadImage = () => {
    if (!convertedImage) return;
    const link = document.createElement('a');
    link.download = `converted-image.${outputFormat}`;
    link.href = convertedImage;
    link.click();
  };

  const reset = () => {
    setOriginalImage('');
    setConvertedImage('');
    setOutputFormat('jpeg');
    setQuality(90);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4">
          <FileImage className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Format Converter</h1>
        <p className="text-gray-600">Convert images between JPEG, PNG, and WebP formats</p>
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
                  <Label>Output Format</Label>
                  <Select value={outputFormat} onValueChange={setOutputFormat}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jpeg">JPEG</SelectItem>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="webp">WebP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {outputFormat !== 'png' && (
                  <div>
                    <Label>Quality: {quality}%</Label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={quality}
                      onChange={(e) => setQuality(parseInt(e.target.value))}
                      className="w-full mt-1"
                    />
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button onClick={convertImage} className="flex-1">
                    Convert Image
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

            {convertedImage && (
              <div>
                <h4 className="font-medium mb-2">Converted ({outputFormat.toUpperCase()})</h4>
                <img
                  src={convertedImage}
                  alt="Converted"
                  className="max-w-full h-auto border border-gray-200 rounded"
                  style={{ maxHeight: '200px' }}
                />
                <Button onClick={downloadImage} className="w-full mt-2">
                  <Download className="w-4 h-4 mr-2" />
                  Download Converted Image
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

export default FormatConverter;
