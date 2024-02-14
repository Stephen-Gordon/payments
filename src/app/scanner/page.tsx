// react
import { useEffect, useRef, useState } from 'react';

// camera
import { Camera } from 'react-camera-pro';
import { QrReader } from 'react-qr-reader';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [scanResult, setScanResult] = useState(null);
  const [scan, setScan] = useState(false);
  const router = useRouter();

  const handleScan = () => {
    let scanner = new Html5QrcodeScanner(
      'reader',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );
    scanner.render(onSuccess, onScanFailure);
    function onSuccess(decodedText: any, decodedResult: any) {
      // handle the scanned code as you like, for example:

      setScanResult(decodedText);

      scanner.clear();
      router.push(`/send?payee=${decodedText}`);
    }

    function onScanFailure(error: any) {
      // handle scan failure, usually better to ignore and keep scanning.
      // for example:
      console.warn(`Code scan error = ${error}`);
    }
  };
  return (
    <>
      <div className='mt-10'>
        <button
          onClick={() => {
            setScan(true);
            handleScan();
          }}
        >
          Scan
        </button>
      </div>
      {scan && (
        <div>
          {scanResult ? (
            <p>success</p>
          ) : (
            <div id='reader' style={{ width: '300px' }}></div>
          )}
        </div>
      )}
    </>
  );
}
