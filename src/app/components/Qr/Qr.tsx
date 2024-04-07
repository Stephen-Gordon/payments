'use client';
// Qr code generator
import { QRCode } from 'react-qrcode-logo';
// Redux
import { useSelector } from 'react-redux';
// react
import { useState, useEffect, useRef } from 'react';
import { RootState } from '@/GlobalRedux/store';

export default function Qr() {
  const address: string = useSelector(
    (state: RootState) => state.address.value
  );

  const [windowWidth, setWindowWidth] = useState(0);

  const widthRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (widthRef.current) {
      const width = widthRef.current.offsetWidth;
      console.log('width', width);
      setWindowWidth(width);
    }
  }, []);

  return (
    <div ref={widthRef}>
      <QRCode
        ecLevel='H'
        quietZone={20}
        size={windowWidth > 500 ? 300 : windowWidth}
        bgColor='#0c0e1800'
        fgColor='#a7a3f5'
        qrStyle='dots'
        eyeRadius={8}
        //pink, purple, yellow
        eyeColor={['#ec91d8', '#ec91d8b3', '#ec91d866 ']}
        value={`${address}`}
      />
    </div>
  );
}
