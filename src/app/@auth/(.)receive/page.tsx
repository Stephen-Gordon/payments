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

import { motion } from 'framer-motion';
import truncateEthAddress from 'truncate-eth-address';

// Icons
import { Copy } from 'lucide-react';

export default function Page() {
  const address = useSelector((state: string) => state.address.value);

  return (
    <>
      <motion.div key='qr-page' className='grid'>
        <DrawerHeader>
          <DrawerTitle>Receive</DrawerTitle>
        </DrawerHeader>

        <div className='grid w-full justify-center justify-items-center'>
          <div className='mt-4 w-full'>
            <Qr />
          </div>
          <motion.button
            className='text flex w-fit justify-center justify-items-center rounded-full border p-4 text-center text-xl'
            onClick={() => navigator.clipboard.writeText(address as string)}
            whileTap={{
              scale: 0.95,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            {truncateEthAddress(address as string)}{' '}
            <span className='ml-2'>
              <Copy className='' />
            </span>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
