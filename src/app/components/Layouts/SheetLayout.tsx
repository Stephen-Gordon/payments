'use client';

// components/SheetModal.js
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sheet, { SheetRef } from 'react-modal-sheet';
import { setSheet } from '@/GlobalRedux/Features/sheet/sheetSlice';
const SheetLayout = ({ children }) => {
  const isOpen = useSelector((state) => state.sheet.value);

  useEffect(() => {
    // Add your logic here to handle the sheet open state
    console.log('Sheet is open:', isOpen);
  }, [isOpen]);

  const dispatch = useDispatch();

  return (
    <>
      <Sheet isOpen={isOpen} onClose={() => dispatch(setSheet(false))}>
        <Sheet.Container
          className='blurios'
          style={{
            backgroundColor: 'rgba(16, 16, 18, 0.9)',
            backdropFilter: 'blur(10px) saturate(1000%)',
          }}
        >
          {/*  <Sheet.Header></Sheet.Header> */}
          <Sheet.Content>{children}</Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={() => dispatch(setSheet(false))} />
      </Sheet>
    </>
  );
};

export default SheetLayout;