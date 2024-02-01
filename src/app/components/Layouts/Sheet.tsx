'use client';

// components/SheetModal.js
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Sheet = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

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
              className='bg-paper'
            >
              <div>{children}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sheet;
