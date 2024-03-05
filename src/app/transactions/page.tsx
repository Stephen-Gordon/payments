'use client';
// react
import { useEffect, useState } from 'react';
// hooks
import useGetRecentTransactions from '@/app/hooks/useGetRecentTransactions';
import RecentTransaction from '@/app/components/RecentTransaction/RecentTransaction';
// framer motion
import { motion } from 'framer-motion';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { setTransactions } from '@/GlobalRedux/Features/transactions/transactionsSlice';
export default function Page() {
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
    setTxs(transactionState);
  }, [transactionState]); // Add transactions as a dependency

  return (
    <motion.div
      layoutId='activity'
      className='w-full text-xl p-4'
    >
      <div className='text-xl'>Transactions</div>
      <div className='mt-4'>
        {transactions &&
          transactions.map((transaction: any, i: any) => (
            <motion.div layoutId={`activity-${transaction.hash}`} key={i}>
              <RecentTransaction transaction={transaction} />
            </motion.div>
          ))}
      </div>
    </motion.div>
  );
}
