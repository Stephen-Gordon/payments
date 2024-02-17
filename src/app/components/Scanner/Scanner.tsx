'use client';
// react
import { useEffect, useRef, useState } from 'react';

// camera
import { QrScanner } from '@yudiel/react-qr-scanner';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setSheet } from '@/GlobalRedux/Features/sheet/sheetSlice';
// sheet
import Sheet, { SheetRef } from 'react-modal-sheet';
import { Undo2 } from 'lucide-react';
import Button from '@/components/buttons/Button';
import { setCode } from 'viem/actions';
import Qr from '@/app/components/Qr/Qr';

// framer motion
import { AnimatePresence, motion } from 'framer-motion';

export default function Scanner({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) {
  const router = useRouter();
  const [code, setCode] = useState(true);
  return (
    <>
      <Sheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Sheet.Container
          style={{
            backgroundColor: 'rgba(16, 16, 18, 9)',
            width: '100%',
            height: '100%',
          }}
          className=''
        >
          <Sheet.Content style={{ display: 'grid', alignContent: 'center' }}>
            <div className='absolute z-50 p-4'>
              <div
                onClick={() => {
                  setIsOpen(false);
                }}
                className='w-fit rounded-full p-4 hover:bg-slate-300'
              >
                <Undo2 size={20} color='#cbd5e1' />
              </div>
            </div>
            <div
              style={{
                height: '30vh',
                backgroundColor: 'rgba(16, 16, 18, 0.9)',
              }}
              className='blurios absolute w-screen '
            ></div>

            <div>
              <div>
                <QrScanner
                  onDecode={(result) => {
                    setIsOpen(false);
                    router.push(`/send?payee=${result}`);
                  }}
                  onError={(error) => console.log(error?.message)}
                />
              </div>
            </div>

            <div
              style={{
                height: '30vh',
                backgroundColor: 'rgba(16, 16, 18, 0.9)',
              }}
              className='blurios absolute bottom-0 z-30 w-screen '
            ></div>

            <AnimatePresence>
              {code && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.3, ease: 'easeInOut' },
                    }}
                    exit={{ opacity: 0 }}
                    key='qrcode'
                    style={{
                      backgroundColor: 'rgba(16, 16, 18, 0.9)',
                    }}
                    className='blurios absolute z-40 grid h-screen  w-screen content-center justify-center'
                  >
                    <div>
                      <Qr />
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            <div className='sticky bottom-4 z-50 flex justify-center'>
              <div>
                <button
                  className='rounded-lg bg-gray-900 p-4 text-white'
                  onClick={() => {
                    setCode(!code);
                  }}
                >
                  My Code
                </button>
              </div>
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
