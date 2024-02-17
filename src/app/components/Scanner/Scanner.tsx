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
          className=''
        >
          <Sheet.Content style={{ display: 'grid', alignContent: 'center' }}>
            {/*  <div className='absolute z-50 p-4'>
              <div
                onClick={() => {
                  setIsOpen(false);
                }}
                className='w-fit rounded-full p-4 hover:bg-slate-300'
              >
                <Undo2 size={20} color='#cbd5e1' />
              </div>
            </div> */}
            <div
              style={{ height: '50vh' }}
              className='transparent-gradient absolute w-screen '
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
              style={{ height: '50vh' }}
              className='transparent-gradient-r absolute bottom-0 z-50 w-screen '
            ></div>
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
