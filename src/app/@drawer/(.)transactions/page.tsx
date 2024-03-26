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
import { format, parseISO, set } from 'date-fns';

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
    metadata: {
      blockTimestamp: string;
    };
  }

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
    setTxs(transactionState);

    const groupedTransactionsByMonth: { [key: string]: any[] } =
      transactions.reduce((groups, transaction) => {
        const monthKey = format(
          parseISO(transaction.metadata.blockTimestamp),
          'yyyy-MM'
        );
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
      {isSheetOpen && (
        <motion.div
          key='activity-key'
          layoutId='activity'
          transition={{
            duration: 0.3,
          }} /*  onAnimationComplete={(definition) => {
        setShowTxs(true);
      }} */
          className='from-accent to bg-accent/80 absolute z-50 min-h-screen w-full overflow-hidden bg-gradient-to-tr  text-xl backdrop-blur-xl'
        >
          <Card style={{ border: '0px' }} className='bg-transparent'>
            <CardHeader>
              <CardTitle className='grid grid-cols-3 items-center'>
                <div
                  onClick={() => {
                    router.back();
                  }}
                >
                  <BackButton />
                </div>
                <p className='text-center'>Recent Transactions</p>
                <div className='ml-auto'></div>
              </CardTitle>
            </CardHeader>
            <CardContent className='border-0 border-none'>
              <motion.div>
                {showTxs && (
                  <>
                    {groupedTransactions && (
                      <>
                        <div className=''>
                          {groupedTransactions.map((month, i) => (
                            <div key={i} className='grid'>
                              <div
                                style={{ marginBottom: '32px' }}
                                className='flex w-full justify-center'
                              >
                                <p className='bg-card text-card-foreground h-9 w-fit  rounded-xl border px-4 py-2 text-sm shadow'>
                                  {month.monthName}
                                </p>
                              </div>
                              {month.transactions
                                .slice(0, 5)
                                .map((transaction, j) => (
                                  <motion.div
                                    className='grid h-fit w-full space-y-6'
                                    transition={{
                                      /*   duration: 0.4, */
                                      /* delay: j * 0.2, */
                                      ease: 'easeInOut', // Using a custom easing function
                                    }}
                                    key={j}
                                  >
                                    <motion.div
                                      layoutId={transaction.hash}
                                      className='mb-6 grid h-fit w-full '
                                    >
                                      <RecentTransaction
                                        transaction={month.transactions[j]}
                                      />
                                    </motion.div>
                                  </motion.div>
                                ))}
                              {showMoreTx && (
                                <motion.div
                                  key={'transactions-dealyed'}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.4, delay: 0.4 }}
                                >
                                  {month.transactions
                                    .slice(4, -1)
                                    .map((transaction, j) => (
                                      <motion.div
                                        className='grid h-fit w-full space-y-6'
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                          duration: 0.4,
                                          delay: j * 0.2,
                                          ease: 'easeInOut', // Using a custom easing function
                                        }}
                                        key={j}
                                      >
                                        <motion.div
                                          layoutId={transaction.hash}
                                          className='mb-6 grid h-fit w-full '
                                        >
                                          <RecentTransaction
                                            transaction={month.transactions[j]}
                                          />
                                        </motion.div>
                                      </motion.div>
                                    ))}
                                </motion.div>
                              )}
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
      )}
    </>
  );
}
