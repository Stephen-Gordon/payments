'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSheet } from '@/GlobalRedux/Features/sheet/sheetSlice';

// next
import { useRouter, useSearchParams } from 'next/navigation';

export default function Page() {
  console.log('Tx Modal Page');
  const isOpen = useSelector((state) => state.sheet.value);
  const dispatch = useDispatch();

  const searchParams = useSearchParams();

  let hash = searchParams.get('hash');

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={hash}
            layoutId={hash}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              zIndex: 100,
              width: '100vw',
              height: '100vh',
              backgroundColor: '#1d1f27',
            }}
          >
            <div className=''>{hash}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
