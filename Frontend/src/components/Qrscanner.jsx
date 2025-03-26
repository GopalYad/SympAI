import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';

const QrScanner = () => {
  const [scannedUrl, setScannedUrl] = useState('');
  const qrRef = useRef(null);

  useEffect(() => {
    if (!qrRef.current) return;

    const qrScanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 250,
      },
      /* verbose= */ false
    );

    qrScanner.render(
      (decodedText) => {
        setScannedUrl(decodedText);
        qrScanner.clear();
        window.location.href = decodedText; // auto redirect
      },
      (errorMessage) => {
        console.warn('QR Code no match:', errorMessage);
      }
    );

    return () => qrScanner.clear().catch(console.error);
  }, []);

  // Upload from image
  const handleFileScan = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const html5QrCode = new Html5Qrcode("qr-reader-file");
    const result = await html5QrCode.scanFile(file, true);
    setScannedUrl(result);
    window.location.href = result;
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">📷 QR Code Scanner</h2>

      {/* Camera Scanner */}
      <div id="qr-reader" className="w-full border p-2 rounded-md shadow-md mb-4" ref={qrRef}></div>

      {/* File Upload Scanner */}
      <div className="text-center">
        <label className="block text-sm mb-2 font-medium">📤 Or Upload a QR Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileScan}
          className="block mx-auto"
        />
      </div>

      {scannedUrl && (
        <div className="mt-4 text-green-600 text-center font-semibold">
          ✅ Scanned URL: <a href={scannedUrl} className="underline">{scannedUrl}</a>
        </div>
      )}

      {/* Needed for html5-qrcode file scan */}
      <div id="qr-reader-file" style={{ display: 'none' }}></div>
    </div>
  );
};

export default QrScanner;
