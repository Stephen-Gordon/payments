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
import useGetAddress from '../hooks/useGetAddress';
import {
  CardTitle,
  CardHeader,
  Card,
  CardContent,
} from '../components/ui/card';
export default function Page() {
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
    console.log('transactionState', transactionState);
    setTxs(transactionState);
  }, [transactionState]); // Add transactions as a dependency

  return (
    <motion.div layoutId='activity' className=' z-50 w-full text-xl'>
      <Card style={{ border: '0px' }}>
        <CardHeader>
          <motion.div>
            <CardTitle>Recent Transactions</CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent className='border-0 border-none'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className=' space-y-6'
          >
            {transactions &&
              transactions.map((transaction: any, i: any) => (
                <motion.div
                  className='h-fit w-full'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.2 }}
                  /*  layoutId={`activity-${transaction.hash}`} */
                  key={i}
                >
                  <RecentTransaction transaction={transaction} />
                </motion.div>
              ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
