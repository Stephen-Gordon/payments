'use client';
// react
import { useState, useEffect } from 'react';
// motion
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';

import { RotatingLines } from 'react-loader-spinner';
import { Drawer, DrawerContent, DrawerOverlay } from '../ui/drawer';
import { useRouter } from 'next/navigation';

// redux
import { useDispatch } from 'react-redux';
import { setTransactions } from '@/GlobalRedux/Features/transactions/transactionsSlice';

// hooks
import useGetRecentTransactions from '@/app/hooks/useGetRecentTransactions';
import useGetAddress from '@/app/hooks/useGetAddress';

import { MultiStepLoader as Loader } from '../ui/multi-step-loader';
import { IconSquareRoundedX } from '@tabler/icons-react';
import { TextGenerateEffect } from '../ui/text-generate-effect';
import useGetBalance from '@/app/hooks/useGetBalance';
import { setSheet } from '@/GlobalRedux/Features/sheet/sheetSlice';
import { setBalance } from '@/GlobalRedux/Features/balance/balanceSlice';

// axios
import axios from 'axios';

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
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [balanceToShow, setBalanceToShow] = useState<string>('');

  useEffect(() => {
    if (transactionStatus || loading) {
      setDrawerOpen(true);
    }
  }, [transactionStatus, loading, transactionHash]);

  useEffect(() => {
    if (transactionStatus) {
      console.log('tx successful, getting data', transactionStatus);
      const getData = async () => {
        try {
          const recentTransactions = await useGetRecentTransactions(address);
          dispatch(setTransactions(recentTransactions));
          console.log('got data', recentTransactions);
        } catch (error) {
          console.error('Error while getting recent transactions:', error);
        }
      };

      getData();

      axios
        .get(
          `https://api-basescan.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x036CbD53842c5426634e7929541eC2318f3dCF7e&address=${address}&tag=latest&apikey=6VRQH98BTKVZYXU68YJYWVX3EC2ZP6UEFV`
        )
        .then((r) => {
          console.log('axios balance', r.data);
          setBalanceToShow(r.data.result);
          dispatch(setBalance(r.data.result));
        })
        .catch((e) => {
          console.log('axios balance error', e);
        });

      setTimeout(() => {
        setDrawerOpen(false);
        /* dispatch(setSheet(false)); */
        router.push(`/transactions`);
      }, 1000);
    }
  }, [transactionStatus]);

  return (
    <>
      <Drawer nested={true} dismissible={false} open={drawerOpen}>
        <DrawerContent
          dontShowDrag={true}
          className='duration-400 flex h-full w-full border-none bg-black/90 transition-all ease-in-out'
        >
          {/*    <motion.div
            className='ios'
            initial={{ opacity: 0 }}
            animate={{ opacity: loading ? 0.7 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              zIndex: '-50', // adjust the z-index as needed
            }}
          /> */}
          <motion.div
            key='success'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            exit={{ opacity: 0, y: 20 }}
            className='fixed bottom-2 mb-auto w-full px-2 pb-8 shadow-lg'
          >
            <div className=' text-card-foreground  h-full w-full rounded-2xl  border shadow'>
              <div
                style={{ paddingTop: '16px', paddingBottom: '16px' }}
                className='relative w-full items-center justify-center space-y-8 py-8'
              >
                {transactionStatus && (
                  <div
                    key={'check-circle'}
                    className='grid w-full justify-center '
                  >
                    <CheckCircle2 size='64' color='#4ade80' />
                  </div>
                )}
                {loading && (
                  <div key={'loader'} className='grid w-full justify-center '>
                    <div className='grid w-full justify-center '>
                      <Loader2
                        size='64'
                        className='stroke-muted-foreground animate-spin justify-self-center '
                      />
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className='w-full'
                    >
                      <TextGenerateEffect
                        className='text-muted-foreground mt-4 text-center text-sm'
                        words='Your transfer is on the way'
                      ></TextGenerateEffect>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
