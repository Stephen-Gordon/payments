'use client';
import { QRCode } from 'react-qrcode-logo';
// Redux
import { useSelector } from 'react-redux';

export default function Qr() {
  const address: string = useSelector((state: string) => state.address.value);

  return (
    <>
      <QRCode
        ecLevel='H'
        size={200}
        quietZone={40}
        bgColor='#0c0e1800'
        fgColor='#33fb8f'
        value={`${address}`}
      />
    </>
  );
}
