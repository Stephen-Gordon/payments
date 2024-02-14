'use client';
// React
import { useState, useEffect } from 'react';
import useGetAddress from '@/app/hooks/useGetAddress';
// Next
import Link from 'next/link';

// QR Code
import QRCode from 'react-qr-code';

// Redux
import { useSelector } from 'react-redux';

export default function Page() {
  const address = useSelector((state: string) => state.address.value);

  return (
    <>
      <div className='grid'>
        <div className='my-4 '>
          <p className='my-4 text-center text-xl text-gray-300'>Receive</p>
        </div>
        <div className='grid justify-center bg-white p-4'>
          <div className='mt-4'>
            <QRCode bgColor='#fff' fgColor='#000' value={address} />
          </div>
        </div>
      </div>
    </>
  );
}
