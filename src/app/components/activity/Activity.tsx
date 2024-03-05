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
import { Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle, } from '@/app/components/ui/card';
import { Button } from '../ui/button';

export default function Activity() {
  const [transactions, setTxs] = useState<any>([]);
  const [allTransactions, setAllTransactions] = useState<any>([]);

  const dispatch = useDispatch();

  const transactionState = useSelector(
    (state: any) => state.transactions.value
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const recentTransactions = await useGetRecentTransactions();
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
    console.log('transactionState', transactionState);
    setTxs(transactionState?.slice(0, 3));
  }, [transactionState]); // Add transactions as a dependency

  return (
    <>
      {transactions?.length > 0 ? (
        <motion.div layoutId='activity' className='w-full bg-background rounded-full text-xl '>
          <Card className=''>
            <CardContent className='grid gap-2 p-2 bg-background rounded-lg'>
              <div className='mt-4'>
                {transactions &&
                  transactions.map((transaction: any, i: any) => (
                    <motion.div
                      layoutId={`activity-${transaction.hash}`}
                      key={i}
                    >
                      <RecentTransaction transaction={transaction} />
                    </motion.div>
                  ))}
                <div className='text-center'>
                  <Link
                    className='w-fit'
                    href={{
                      pathname: '/transactions',
                    }}
                  >
                    <Button variant='ghost'>See All</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
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
