
import React, { useState, useRef } from 'react';
import { Image, Upload, Download, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const FormatConverter = () => {
  const [originalImage, setOriginalImage] = useState<string>('');
  const [convertedImage, setConvertedImage] = useState<string>('');
  const [selectedFormat, setSelectedFormat] = useState<string>('webp');
  const [originalFormat, setOriginalFormat] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formats = [
    { value: 'webp', label: 'WebP', mimeType: 'image/webp' },
    { value: 'jpeg', label: 'JPEG', mimeType: 'image/jpeg' },
    { value: 'png', label: 'PNG', mimeType: 'image/png' },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const format = file.type.split('/')[1];
      setOriginalFormat(format);
      
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
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const format = formats.find(f => f.value === selectedFormat);
      const quality = selectedFormat === 'jpeg' ? 0.9 : 1.0;
      const converted = canvas.toDataURL(format?.mimeType || 'image/webp', quality);
      setConvertedImage(converted);
    };
    img.src = originalImage;
  };

  const downloadImage = () => {
    if (!convertedImage) return;
    const link = document.createElement('a');
    link.download = `converted-image.${selectedFormat}`;
    link.href = convertedImage;
    link.click();
  };

  const reset = () => {
    setOriginalImage('');
    setConvertedImage('');
    setOriginalFormat('');
    setSelectedFormat('webp');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
          <Image className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Format Converter</h1>
        <p className="text-gray-600">Convert images between WebP, JPEG, and PNG formats</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Upload & Convert</h3>
          
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
                  <Label>Convert to Format</Label>
                  <select
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  >
                    {formats.map(format => (
                      <option key={format.value} value={format.value}>
                        {format.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Conversion Info</h4>
                  <div className="text-sm space-y-1">
                    <div>From: {originalFormat.toUpperCase()}</div>
                    <div>To: {selectedFormat.toUpperCase()}</div>
                  </div>
                </div>

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
                <h4 className="font-medium mb-2">Original ({originalFormat.toUpperCase()})</h4>
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
                <h4 className="font-medium mb-2">Converted ({selectedFormat.toUpperCase()})</h4>
                <img
                  src={convertedImage}
                  alt="Converted"
                  className="max-w-full h-auto border border-gray-200 rounded"
                  style={{ maxHeight: '200px' }}
                />
                <Button onClick={downloadImage} className="w-full mt-2">
                  <Download className="w-4 h-4 mr-2" />
                  Download {selectedFormat.toUpperCase()}
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
