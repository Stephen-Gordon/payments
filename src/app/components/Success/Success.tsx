'use client';
// react
import { useState, useEffect } from 'react';
// motion
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';

import { RotatingLines } from 'react-loader-spinner';
import { Drawer, DrawerContent } from '../ui/drawer';
import { useRouter } from 'next/navigation';

// redux
import { useDispatch } from 'react-redux';
import { setTransactions } from '@/GlobalRedux/Features/transactions/transactionsSlice';

// hooks
import useGetRecentTransactions from '@/app/hooks/useGetRecentTransactions';
import useGetAddress from '@/app/hooks/useGetAddress';

export default function Success({
  transactionStatus,
  loading,
  transactionHash,
}: {
  transactionStatus: boolean;
  loading: boolean;
  transactionHash: string;
}) {
  //next
  const router = useRouter();

  // redux
  const dispatch = useDispatch();

  //hooks
  const address = useGetAddress();

  useEffect(() => {
    if (transactionStatus) {
      const getData = async () => {
        try {
          const recentTransactions = await useGetRecentTransactions(address);
          dispatch(setTransactions(recentTransactions?.transfers));
        } catch (error) {
          console.error('Error while getting recent transactions:', error);
        }
      };

      getData();

      setTimeout(() => {
        router.push(`/transaction?hash=${transactionHash}`);
      }, 500);
    }
  }, [transactionStatus]);
  return (
    <Drawer nested={true} dismissible={false} open={true}>
      <DrawerContent
        style={{ borderRadius: '40px', padding: '16px' }}
        className='bg-background inset fixed z-50 grid h-fit space-y-8 overflow-hidden rounded-t-[40px] border-t bg-opacity-100 '
      >
        <div className='relative'>
          <AnimatePresence>
            {transactionStatus && (
              <div key={'check-circle'} className='grid w-full justify-center '>
                <CheckCircle2 size='64' color='#4ade80' />
              </div>
            )}
            {loading && (
              <div
                key={'loader'}
                className='grid w-full items-center justify-center '
              >
                <Loader2 size='64' className='animate-spin ' color='white' />
                <p className='text-muted-foreground text-center text-sm'>
                  Your payment is on the way
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
