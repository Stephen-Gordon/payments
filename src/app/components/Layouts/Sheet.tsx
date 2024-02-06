'use client';

// components/SheetModal.js
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Sheet = ({ children }) => {
  const isOpen = useSelector((state) => state.sheet.value);

  useEffect(() => {
    // Add your logic here to handle the sheet open state
    console.log('Sheet is open:', isOpen);
  }, [isOpen]);

  return (
    <div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              zIndex: 100,
            }}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              style={{
                width: '100%',

                minHeight: '90%',
                backgroundColor: '',
                borderTopLeftRadius: '32px',
                borderTopRightRadius: '32px',
              }}
              className='bg-paper-one'
            >
              <div className='text-slate-300'>{children}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sheet;
