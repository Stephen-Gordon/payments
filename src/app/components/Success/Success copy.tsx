'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

import { RotatingLines } from 'react-loader-spinner';

export default function Success({
  transactionStatus,
  loading,
}: {
  transactionStatus: boolean;
  loading: boolean;
}) {
  return (
    <div>
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
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(10px)',
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
            minHeight: '40%',
            backgroundColor: '',
            borderTopLeftRadius: '32px',
            borderTopRightRadius: '32px',
          }}
          className='bg-paper-two grid content-center items-center justify-center'
        >
          {transactionStatus && <CheckCircle2 size='64' color='#4ade80' />}

          {loading && (
            <div className='grid w-full justify-center'>
              <RotatingLines
                visible={true}
                height='96'
                width='96'
                color='grey'
                strokeWidth='5'
                animationDuration='0.75'
                ariaLabel='rotating-lines-loading'
                wrapperStyle={{}}
                wrapperClass=''
              />
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
