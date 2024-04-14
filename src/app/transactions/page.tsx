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
import useGetAddress from '@/app/hooks/useGetAddress';
import {
  CardTitle,
  CardHeader,
  Card,
  CardContent,
} from '@/app/components/ui/card';

import BackButton from '@/app/components/Navigation/BackButton/BackButton';

// next
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

//import { format, parseISO } from 'date-fns';
import { format, parseISO, set, fromUnixTime } from 'date-fns';
import { setSheet } from '@/GlobalRedux/Features/sheet/sheetSlice';

export default function Page() {
  //next
  const searchParams = useSearchParams();
  let isSheetOpen = searchParams.get('isSheetOpen');

  // state
  const [transactions, setTxs] = useState<any[]>([]);
  const [allTransactions, setAllTransactions] = useState<any>([]);

  const [groupedTransactions, setGroupedTransactions] = useState<any[]>([]);

  // animate
  const [showMoreTx, setShowMoreTx] = useState<boolean>(true);

  const isOpen = useSelector((state: any) => state.sheet.value);

  // animate
  const [showTxs, setShowTxs] = useState<boolean>(true);

  const dispatch = useDispatch();

  // address
  const address = useGetAddress();

  // router
  const router = useRouter();

  const transactionState = useSelector(
    (state: any) => state.transactions.value
  );

  interface Transaction {
    to: string;
    from: string;
    value: string;
    timeStamp: string;
  }

  useEffect(() => {
    dispatch(setSheet(false))
    const getData = async () => {
      try {
        const recentTransactions = await useGetRecentTransactions(address);
        setAllTransactions(recentTransactions);
        /* dispatch(setTransactions(recentTransactions)); */
      } catch (error) {
        console.error('Error while getting recent transactions:', error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    console.log('transState in page', transactionState);
    setTxs(transactionState);

    const groupedTransactionsByMonth: { [key: string]: any[] } =
      transactionState.reduce((groups, transaction) => {
        const monthKey = format(fromUnixTime(transaction.timeStamp), 'yyyy-MM');
        if (!groups[monthKey]) {
          groups[monthKey] = [];
        }
        groups[monthKey].push(transaction);
        return groups;
      }, {});

    // Convert grouped transactions object into an array of arrays with month names
    const arrayOfMonthArrays: {
      monthName: string;
      transactions: Transaction[];
    }[] = Object.entries(groupedTransactionsByMonth).map(
      ([monthKey, transactions]) => ({
        monthName: format(parseISO(monthKey), 'MMMM yyyy'), // Format month name along with the year
        transactions,
      })
    );
    setGroupedTransactions(arrayOfMonthArrays);
    console.log('groupedTransactionsByMonth', arrayOfMonthArrays);
  }, [transactionState]); // Add transactions as a dependency

  return (
    <>
      <motion.div
        key='activity-key'
        transition={{
          duration: 0.4,
          ease: 'easeInOut'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='w-full h-full'
      >
        <Card style={{ border: '0px' }} className=' h-full'>
          <CardHeader>
            <CardTitle className='grid grid-cols-3 items-center'>
              <div
                onClick={() => {
                  router.push('/home');
                }}
              >
                <BackButton />
              </div>
              <p className='text-center'>Recent Transactions</p>
              <div className='ml-auto'></div>
            </CardTitle>
          </CardHeader>
          <CardContent className='border-0 border-none overflow-scroll h-full'>
            <motion.div>
              {showTxs && (
                <>
                  {groupedTransactions && (
                    <>
                      <div className=''>
                        {groupedTransactions.map((month, i) => (
                          <div key={i} className='grid'>
                            <div
                              style={{ marginBottom: '32px', }}
                              className='flex w-full justify-center'
                            >
                              <p className='bg-card text-card-foreground h-9 w-fit  rounded-xl border px-4 py-2 text-sm shadow'>
                                {month.monthName}
                              </p>
                            </div>
                            {month.transactions.map((transaction, j) => (
                              <motion.div
                                className='grid h-fit w-full space-y-6'
                                layout
                                initial={{ opacity: 0, height: 0}}
                                animate={{ opacity: 1, height: 'auto'}}
                                transition={{
                                  duration: 0.4,
                                  delay: j * 0.2,
                                  ease: 'easeInOut', // Using a custom easing function
                                }}
                                exit={{ opacity: 0, height: 0}}
                                key={j}
                              >
                                <motion.div
                                  className='mb-6 grid h-fit w-full '
                                >
                                  <RecentTransaction
                                    transaction={month.transactions[j]}
                                  />
                                </motion.div>
                              </motion.div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
