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
import { AnimatePresence, motion } from 'framer-motion';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { setSheet } from '@/GlobalRedux/Features/sheet/sheetSlice';
// components
import { Button } from '@/app/components/ui/button';
// lucide
import { Send, QrCode, UserPlus } from 'lucide-react';
// link
import Link from 'next/link';

//hooks
import useFindPayeeName from '@/app/hooks/useFindPayeeName';

import { format, parseISO, set, fromUnixTime } from 'date-fns';


// format date
import TimeAgo from 'react-timeago';
import { formatUnits } from 'viem';
import AddAContact from '@/app/components/addAContact/addAContact';

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
  //const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [groupedTransactions, setGroupedTransactions] = useState<any[]>([]);
  const [showAddContact, setShowAddContact] = useState<boolean>(false);



  const contactsState = useSelector((state: any) => state.contacts.value);

  const transactionsState = useSelector((state: any) => state.transactions.value);
      console.log('transactionsState in payee', transactionsState);

  const isInContacts = contactsState.some(
    (contact: any) => contact.address == payeeAddress
  );

  // refs
  const end = useRef<any>(null);

 

  // effect
  useEffect(() => {
    const fetchRecentTransactions = async () => {

      console.log('transactionsState in payee', transactionsState);
     
      if (transactionsState && Array.isArray(transactionsState)) {
        // Filter transactions where either to or from address matches payeeAddress
        console.log('filtering with payeeAddress', payeeAddress);

        const filteredTransactions: any = transactionsState.filter(
          (t) =>
            t.to?.toLocaleLowerCase() === payeeAddress?.toLocaleLowerCase() ||
            t.from?.toLocaleLowerCase() === payeeAddress?.toLocaleLowerCase()
        );
        console.log('filteredTransactionssssss', filteredTransactions);
        //setTransactions(filteredTransactions);

        // Group transactions by month
        const groupedTransactionsByMonth: { [key: string]: Transaction[] } =
          filteredTransactions.reduce((groups, transaction) => {
            if (!transaction.timeStamp) return groups; // Skip transactions with no timestamp

            const monthKey = format(
              fromUnixTime(transaction.timeStamp),
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
  }, [payeeAddress, transactionsState]);

   const handleAddUser = () => {
     setShowAddContact(true);
   };


  return (
    <>
      <AnimatePresence>
        <DrawerHeader>
          <DrawerTitle className='grid grid-cols-3 items-center'>
            <motion.div
              key={'back'}
              layoutId='back'
              onClick={() => {
                router.back();
              }}
            >
              <BackButton />
            </motion.div>
            <motion.p
              key={'payee-name'}
              layoutId='payee-name'
              className='font-inherit text-center leading-snug tracking-wide text-inherit mix-blend-exclusion'
            >
              {payeeAddress && useFindPayeeName(payeeAddress, contactsState)}
            </motion.p>
            {!isInContacts && (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='ml-auto'
              >
                <div
                  onClick={handleAddUser}
                  className='text-muted-foreground flex space-x-2 text-base font-light'
                >
                  <UserPlus
                    strokeWidth={2}
                    className='fill-muted-foreground stroke-muted-foreground'
                  />
                  <p>Save</p>
                </div>{' '}
              </motion.div>
            )}
          </DrawerTitle>
        </DrawerHeader>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {!groupedTransactions && (
            <motion.div
              layout
              key='no-tx-with'
              className='grid content-center justify-center'
            >
              <div className='text-center text-white'>
                <p>
                  You've got no transfers with{' '}
                  {payeeAddress &&
                    useFindPayeeName(payeeAddress, contactsState)}
                </p>
              </div>
            </motion.div>
          )}

          {groupedTransactions && (
            <>
              <motion.div key='groupedTransactions' className='p-4'>
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
                    <motion.div className='pb-30 grid grid-flow-row auto-rows-max grid-cols-1 gap-2 text-xl text-white'>
                      {month.transactions.map((transaction, j) => (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          layout
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: 'easeInOut',
                            delay: j * 0.25,
                          }}
                          key={j}
                        >
                          {transaction.from == payeeAddress ? (
                            
                              <div
                                style={{ marginBottom: '32px' }}
                                className='bg-muted mr-auto grid w-fit justify-self-start rounded-2xl rounded-bl-none p-4'
                              >
                                <Link
                              href={{
                                pathname: '/transaction',
                                query: {
                                  transaction: transaction.blockHash,
                                  closeSheet: false,
                                },
                              }}
                            >
                                <div className='pb-4'>
                                  ${formatUnits(transaction.value, 6)}
                                </div>

                                <p className='text-muted-foreground text-xs'>
                                  You Received
                                </p>
                                <p className='text-muted-foreground text-xs'>
                                  <TimeAgo
                                    date={fromUnixTime(transaction.timeStamp)}
                                  />
                                </p>
                                </Link>

                              </div>
                          ) : (
                            <div
                              style={{ marginBottom: '32px' }}
                              className='bg-muted ml-auto grid w-fit justify-self-end rounded-2xl rounded-br-none p-4'
                            >
                              <Link
                                href={{
                                  pathname: '/transaction',
                                  query: {
                                    hash: transaction.blockHash,
                                    closeSheet: false,
                                  },
                                }}
                              >
                                <div className='pb-4'>
                                  ${formatUnits(transaction.value, 6)}
                                </div>

                                <p className='text-muted-foreground text-xs'>
                                  You Sent
                                </p>

                                <p className='text-muted-foreground text-xs'>
                                  <TimeAgo
                                    date={fromUnixTime(transaction.timeStamp)}
                                  />
                                </p>
                              </Link>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                ))}
              </motion.div>

              <div className=' p-4'>
                <div ref={end}></div>
              </div>
            </>
          )}
          <DrawerFooter
            style={{ zIndex: 3000 }}
            className='fixed bottom-0 w-full  bg-white/10 backdrop-blur-xl '
          >
            <motion.div
              key='payee-send-button'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.4 }}
              className='w-full '
              style={{ paddingBottom: '16px' }}
            >
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
            </motion.div>
          </DrawerFooter>
          {!isInContacts && (
            <AddAContact
              open={showAddContact}
              setShowAddContact={setShowAddContact}
              contactsState={contactsState}
              payee={payeeAddress}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
