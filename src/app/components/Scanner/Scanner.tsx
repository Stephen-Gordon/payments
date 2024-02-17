'use client';
// react
import { useEffect, useRef, useState } from 'react';

// camera
import { Camera } from 'react-camera-pro';
import { QrReader } from 'react-qr-reader';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Html5Qrcode } from 'html5-qrcode';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setSheet } from '@/GlobalRedux/Features/sheet/sheetSlice';
// sheet
import Sheet, { SheetRef } from 'react-modal-sheet';

import { QrScanner } from '@yudiel/react-qr-scanner';

export default function Scanner({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) {
  const [scanResult, setScanResult] = useState(null);
  const [scan, setScan] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      setScan(true);
      /*  handleScan(); */
    }
  }, []);

  const handleScan = () => {
    setTimeout(() => {
      let scanner = new Html5QrcodeScanner(
        'reader',
        { fps: 10, qrbox: 250 },
        /* verbose= */ false
      );

      scanner.render(onSuccess, onScanFailure);
      function onSuccess(decodedText: any, decodedResult: any) {
        // handle the scanned code as you like, for example:

        setScanResult(decodedText);
        scanner.clear();
        dispatch(setSheet(true));

        router.push(`/send?payee=${decodedText}`);
      }

      function onScanFailure(error: any) {
        // handle scan failure, usually better to ignore and keep scanning.
        // for example:
        console.warn(`Code scan error = ${error}`);
      }
    }, 100);
  };

  const handleCustom = () => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
        if (devices && devices.length) {
          var cameraId = devices[0].id;
          // .. use this to start scanning.
          const html5QrCode = new Html5Qrcode(/* element id */ 'reader');
          html5QrCode
            .start(
              cameraId,
              { fps: 10 },
              (decodedText, decodedResult) => {
                // do something when code is read
              },
              (errorMessage) => {
                // parse error, ignore it.
              }
            )
            .catch((err) => {
              // Start failed, handle it.
            });
        }
      })
      .catch((err) => {
        // handle err
      });
  };
  return (
    <>
      <Sheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Sheet.Container
          style={{ backgroundColor: '#2C2D33' }}
          className='bg-paper-one'
        >
          {/*  <Sheet.Header></Sheet.Header> */}
          <Sheet.Content>
            <div className='flex justify-center'>
              {/* {scan && (
                <div>
                  {scanResult ? (
                    <p>success</p>
                  ) : (
                    <div id='reader' style={{ width: '100%' }}></div>
                  )}
                </div>
              )} */}
              {/*  <button onClick={handleCustom} className='text-5xl text-white'>
                Custom
              </button> */}
              {/* 
              <div id='reader' width='600px' height='600px'></div> */}
              <QrScanner
                onDecode={(result) => console.log(result)}
                onError={(error) => console.log(error?.message)}
              />
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop
          onTap={() => {
            setIsOpen(false);
          }}
        />
      </Sheet>
    </>
  );
}
