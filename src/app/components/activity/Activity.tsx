'use client';
import RecentTransaction from '@/app/components/RecentTransaction/RecentTransaction';
// hooks
import useGetAddress from '@/app/hooks/useGetAddress';
import useGetRecentTransactions from '@/app/hooks/useGetRecentTransactions';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTransactions } from '@/GlobalRedux/Features/transactions/transactionsSlice';

import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Button } from '../ui/button';
import { setSheet } from '@/GlobalRedux/Features/sheet/sheetSlice';

export default function Activity() {
  const [transactions, setTxs] = useState<any>([]);
  const [allTransactions, setAllTransactions] = useState<any>([]);

  const dispatch = useDispatch();

  // address
  const address = useGetAddress();

  const transactionState = useSelector(
    (state: any) => state.transactions.value
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const recentTransactions = await useGetRecentTransactions(address);
        setAllTransactions(recentTransactions?.transfers);
        dispatch(setTransactions(recentTransactions?.transfers));
      } catch (error) {
        console.error('Error while getting recent transactions:', error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    /*  dispatch(setTransactions(transactions)); */
    setTxs(transactionState?.slice(0, 3));
  }, [transactionState]); // Add transactions as a dependency

  return (
    <>
      {transactions?.length > 0 ? (
        <motion.div
          key='activity-key'
          layoutId='activity'
          transition={{ duration: 0.3 }}
          className='bg-muted w-full rounded-full text-xl '
        >
          <Card className=''>
            <CardHeader>
              <motion.div>
                <CardTitle>Recent Transactions</CardTitle>
              </motion.div>
            </CardHeader>
            <CardContent className=''>
              <div className='mt-4 space-y-8'>
                {transactions &&
                  transactions.map((transaction: any, i: any) => (
                    <motion.div
                      className='h-fit w-full'
                      layoutId={transaction.hash}
                      key={i}
                    >
                      <RecentTransaction transaction={transaction} />
                    </motion.div>
                  ))}
              </div>
            </CardContent>
            <CardFooter className='justify-center space-x-2'>
              <Link
                className='w-fit'
                href={{
                  pathname: '/transactions',
                  query: { isSheetOpen: true },
                }}
              >
                <Button
                  /* onClick={() => {
                    dispatch(setSheet(true));
                  }} */
                  className='w-auto'
                  variant='ghost'
                >
                  See All
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      ) : (
        <div className=' w-full rounded-xl p-2 text-xl'>
          <div className='mt-4 flex content-center justify-center'>
            <div>You've got no transactions</div>
          </div>
        </div>
      )}
    </>
  );
}
