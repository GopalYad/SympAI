import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';

const QrScanner = () => {
  const [scannedUrl, setScannedUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('qr-reader', {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(
      (decodedText) => {
        setScannedUrl(decodedText);
        scanner.clear();
        window.location.href = decodedText; // Optional redirect
      },
      (err) => {
        // do nothing on scan failure
      }
    );

    return () => {
      scanner.clear().catch(console.error);
    };
  }, []);

  const handleFileScan = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const imageDataUrl = reader.result;
      const html5QrCode = new Html5Qrcode("qr-reader-file");

      try {
        const result = await html5QrCode.scanFile(file, true);
        setScannedUrl(result);
        window.location.href = result;
      } catch (err) {
        console.error("Error scanning file: ", err);
        setError("❌ QR code could not be detected. Try uploading a cleaner image.");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">📷 QR Code Scanner</h2>

      {/* Live Camera Scanner */}
      <div id="qr-reader" className="w-full border p-2 rounded-md shadow-md mb-4"></div>

      {/* File Upload */}
      <div className="text-center mt-6">
        <label className="block text-sm mb-2 font-medium">📤 Upload QR Code Image:</label>
        <input type="file" accept="image/*" onChange={handleFileScan} />
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>

      {scannedUrl && (
        <div className="mt-4 text-green-600 text-center font-semibold">
          ✅ Scanned URL: <a href={scannedUrl}>{scannedUrl}</a>
        </div>
      )}

      <div id="qr-reader-file" style={{ display: 'none' }}></div>
    </div>
  );
};

export default QrScanner;
