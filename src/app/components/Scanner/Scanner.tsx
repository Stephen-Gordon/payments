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

export default function Scanner({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) {
  const router = useRouter();

  return (
    <>
      <Sheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Sheet.Container
          style={{ backgroundColor: '#2C2D33', width: '100%', height: '100%' }}
          className='bg-paper-one'
        >
          <Sheet.Content
            style={{
              width: '100%',
              height: '100%',
            }}
          >
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
            <div className='flex h-full w-full justify-center'>
              <QrScanner
                containerStyle={{ width: '100%', height: '100%' }}
                onDecode={(result) => {
                  setIsOpen(false);
                  router.push(`/send?payee=${result}`);
                }}
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
