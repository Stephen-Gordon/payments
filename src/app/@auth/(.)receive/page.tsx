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
      <motion.div
        className='grid'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <DrawerHeader>
          <DrawerTitle>Receive</DrawerTitle>
        </DrawerHeader>

        <div className='grid justify-center'>
          <div className='mt-4 '>
            <Qr />
          </div>
          <motion.button
            className='text- flex justify-center rounded-full border p-4 text-center text-xl'
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
