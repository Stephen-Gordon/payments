'use client';
import Qr from '@/app/components/Qr/Qr';
// QR Code
import QRCode from 'react-qr-code';

// Redux
import { useSelector } from 'react-redux';

export default function Page() {
  const address = useSelector((state: string) => state.address.value);

  return (
    <>
      <h1>Backup Receive Page</h1>
      <div className='bg-white p-4'>
        <div className='mt-4'>
          <Qr />
        </div>
      </div>
    </>
  );
}
