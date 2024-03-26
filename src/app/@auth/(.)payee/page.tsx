'use client';

// Next
import { useRouter, useSearchParams } from 'next/navigation';
// drawer
import {
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/app/components/ui/drawer';
//avatar
import { Avatar } from '@/app/components/ui/avatar';
// truc address
import truncateEthAddress from 'truncate-eth-address';
// backbutton
import BackButton from '@/app/components/Navigation/BackButton/BackButton';
// react
import { useEffect, useRef, useState } from 'react';
// hooks
import useGetRecentTransactions from '@/app/hooks/useGetRecentTransactions';
import useGetAddress from '@/app/hooks/useGetAddress';

// motion
import { motion } from 'framer-motion';
// redux
import { useDispatch } from 'react-redux';
import { setSheet } from '@/GlobalRedux/Features/sheet/sheetSlice';
// components
import { Button } from '@/app/components/ui/button';
// lucide
import { Send, QrCode } from 'lucide-react';
// link
import Link from 'next/link';

//hooks
import useFindPayeeName from '@/app/hooks/useFindPayeeName';

import { format, parseISO, set } from 'date-fns';

// format date
import TimeAgo from 'react-timeago';

interface Transaction {
  to: string;
  from: string;
  value: string;
  metadata: {
    blockTimestamp: string;
  };
}

export default function Page() {
  // get search params
  const searchParams = useSearchParams();
  let payeeAddress = searchParams.get('payeeAddress');

  // hooks
  const dispatch = useDispatch();
  const address = useGetAddress();
  const router = useRouter();

  // state
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [groupedTransactions, setGroupedTransactions] = useState<any[]>([]);

  // refs
  const end = useRef<any>(null);

  // effect
  useEffect(() => {
    end.current.scrollIntoView({});
    const fetchRecentTransactions = async () => {
      const recentTransactions = await useGetRecentTransactions(address as string);
      console.log('recentTransactions', recentTransactions);
      if (recentTransactions) {
        // Filter transactions where either to or from address matches payeeAddress
        console.log('filtering with payeeAddress', payeeAddress);
        const filteredTransactions: Transaction[] =
          recentTransactions.transfers.filter(
            (transaction) => transaction.to || transaction.from == payeeAddress
          );
        console.log('filteredTransactions', filteredTransactions);
        setTransactions(filteredTransactions);

        // Group transactions by month
        // Group transactions by month
        const groupedTransactionsByMonth: { [key: string]: Transaction[] } =
          filteredTransactions.reduce((groups, transaction) => {
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
      }
    };

    fetchRecentTransactions();
  }, [payeeAddress]);

  return (
    <>
      <DrawerHeader>
        <DrawerTitle className='grid grid-cols-3 items-center'>
          <div
            onClick={() => {
              router.back();
            }}
          >
            <BackButton />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className='font-inherit text-center leading-snug tracking-wide text-inherit mix-blend-exclusion'
          >
            {payeeAddress && useFindPayeeName(payeeAddress)}
          </motion.p>
          <div className='ml-auto'>
            <Avatar className='h-9 w-9 bg-white'></Avatar>
          </div>
        </DrawerTitle>
      </DrawerHeader>

      {!groupedTransactions && (
        <div className='grid content-center justify-center'>
          <div className='text-center text-white'>
            <p>
              You've got no transfers with{' '}
              {payeeAddress && useFindPayeeName(payeeAddress)}
            </p>
          </div>
        </div>
      )}

      {groupedTransactions && (
        <>
          <div className='p-4'>
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
                <div className='grid grid-flow-row auto-rows-max  grid-cols-1 gap-2 text-xl text-white'>
                  {month.transactions.map((transaction, j) => (
                    <div key={j}>
                      {transaction.to !== payeeAddress ? (
                        <div
                          style={{ marginBottom: '32px' }}
                          className='bg-muted mr-auto grid w-fit justify-self-start rounded-2xl rounded-bl-none p-4'
                        >
                          <div className='pb-4'>${transaction.value}</div>

                          <p className='text-muted-foreground text-xs'>
                            You Received
                          </p>
                          <p className='text-muted-foreground text-xs'>
                            <TimeAgo
                              date={transaction.metadata.blockTimestamp}
                            />
                          </p>
                        </div>
                      ) : (
                        <div
                          style={{ marginBottom: '32px' }}
                          className='bg-muted ml-auto grid w-fit justify-self-end rounded-2xl rounded-br-none p-4'
                        >
                          <div className='pb-4'>${transaction.value}</div>

                          <p className='text-muted-foreground text-xs'>
                            You Sent
                          </p>

                          <p className='text-muted-foreground text-xs'>
                            <TimeAgo
                              date={transaction.metadata.blockTimestamp}
                            />
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className=' p-4'>
            <div ref={end}></div>
          </div>
        </>
      )}
      <DrawerFooter
        style={{ zIndex: 3000 }}
        className='fixed bottom-0 w-full  bg-white/10 backdrop-blur-xl '
      >
        <div className='w-full ' style={{ paddingBottom: '16px' }}>
          <Link
            href={{
              pathname: '/send',
              query: { payee: payeeAddress },
            }}
          >
            <Button className='text-xl' size={'lg'} variant={'default'}>
              <div className='flex grid-cols-3 content-center items-center'>
                <div className='text-xl'>
                  <div>Send</div>
                </div>
                <div className='px-2'></div>
                <div>
                  <Send size={20} />
                </div>
              </div>
            </Button>
          </Link>
        </div>
      </DrawerFooter>
    </>
  );
}
