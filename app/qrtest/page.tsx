"use client"
import React, { useState, ChangeEvent } from 'react';
import { BrowserMultiFormatReader, Result } from '@zxing/library';

const QRCodeReader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [scanResult, setScanResult] = useState<string>('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleScan = async () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = async (event: ProgressEvent<FileReader>) => {
        if (event.target && event.target.result) {
          const imageSrc = event.target.result as string;
          const img = new Image();
          img.src = imageSrc;

          img.onload = async () => {
            const codeReader = new BrowserMultiFormatReader();
            try {
              const result: Result = await codeReader.decodeFromImageElement(img);
              setScanResult(result.getText());
            } catch (err) {
              console.error(err);
              setScanResult('Error scanning QR code');
            }
          };
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-slate-800">QR Code Reader</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleScan}
      >
        Scan QR Code
      </button>
      <h3 className="mt-4">Scan Result: {scanResult}</h3>
    </div>
  );
};

export default QRCodeReader;
