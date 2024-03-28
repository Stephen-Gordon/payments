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
import Qr from '@/app/components/Qr/Qr';
import { DrawerHeader, DrawerTitle } from '@/app/components/ui/drawer';

export default function Page() {
  const address = useSelector((state: string) => state.address.value);

  return (
    <>
      <div className='grid'>
        <DrawerHeader>
          <DrawerTitle>Receive</DrawerTitle>
        </DrawerHeader>
       
        <div className='grid justify-center'>
          <div className='mt-4 '>
            <Qr />
          </div>
        </div>
      </div>
    </>
  );
}
