'use client';
import RecentTransaction from '@/app/components/RecentTransaction/RecentTransaction';
// hooks
import useGetAddress from '@/app/hooks/useGetAddress';
import useGetRecentTransactions from '@/app/hooks/useGetRecentTransactions';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTransactions } from '@/GlobalRedux/Features/transactions/transactionsSlice';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Button } from '../ui/button';
import { usePrivySmartAccount } from '@zerodev/privy';



export default function Activity() {
  const [transactions, setTxs] = useState<any>([]);
  const [allTransactions, setAllTransactions] = useState<any>([]);

  const dispatch = useDispatch();

  // address
  const address = useGetAddress(); 

  const transactionState = useSelector(
    (state: any) => state.transactions.value
  );
   
  const {zeroDevReady} = usePrivySmartAccount();

  useEffect(() => {
    const getData = async () => {
      try {
        // get all
        const recentTransactions = await useGetRecentTransactions(address);
        // Check if data is an array, if not throw an error
        if (Array.isArray(recentTransactions)) {
          console.log("dispatching transactions", recentTransactions);
          dispatch(setTransactions(recentTransactions));

          // set state
          setTxs(recentTransactions);
          console.log('transState', transactionState);
        }
        

      } catch (error) {
        console.error('Error while getting recent transactions:', error);
      }
    };

    getData();
  }, [address, zeroDevReady]);

  


  
  return (
    <>
      <motion.div
        layout
        initial={{ height: 0 }}
        animate={{ height: 'auto' }}
        exit={{ height: 0 }}
        transition={{ duration: 0.4 }}
        className='from-background to bg-accent/80 w-full rounded-2xl bg-gradient-to-br  backdrop-blur-xl '
      >
        <Card className='bg-transparent '>
          <CardHeader>
            <motion.div>
              <CardTitle>Recent Transactions</CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent className=''>
            <AnimatePresence initial={false}>
              {transactionState?.length > 0 ? (
                <div className='mt-4 space-y-8'>
                  {Array.isArray(transactionState) &&
                    transactionState
                      .slice(0, 5)
                      .map((transaction: any, i: any) => (
                        <motion.div
                          layout
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.2 }}
                          className='h-fit w-full'
                          key={i}
                        >
                          <RecentTransaction transaction={transaction} />
                        </motion.div>
                      ))}
                </div>
              ) : (
                <></>
              )}
            </AnimatePresence>
          </CardContent>
          <CardFooter className='justify-center space-x-2'>
            <Link
              className='w-fit'
              href={{
                pathname: '/transactions',
              }}
            >
              <Button className='w-auto' variant='ghost'>
                See All
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </>
  );
}
