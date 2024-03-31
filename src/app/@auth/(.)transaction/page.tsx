'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { setSheet } from '@/GlobalRedux/Features/sheet/sheetSlice';
// truncate-eth-address
import truncateEthAddress from 'truncate-eth-address';

// next
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

// icons
import { Send, QrCode } from 'lucide-react';

import { Avatar } from '@/app/components/ui/avatar';
import { RootState } from '@/GlobalRedux/store';
import AuthPage from '@/app/components/AuthPage/AuthPage';
// hooks
import useFindPayeeName from '@/app/hooks/useFindPayeeName';
// types
import { Contact } from '@/app/types/types';

// components
import { Button } from '@/app/components/ui/button';

import TimeAgo from 'react-timeago';

import { fromUnixTime } from 'date-fns';

import BackButton from '@/app/components/Navigation/BackButton/BackButton';
import { formatUnits } from 'viem';

export default function Page() {
  const [transaction, setTransaction] = useState<any>({});

  const searchParams = useSearchParams();

  let hash = searchParams.get('hash');

  const transactionState = useSelector((state: any) => state.transactions.value);

  const address = useSelector((state: any) => state.address.value);

  const [payeeName, setPayeeName] = useState<string | null>('');

  const dispatch = useDispatch();

  const contactsState = useSelector((state: RootState) => state.contacts.value);

  const findPayeeName = (payeeAddress: string): string | null => {
    if (!contactsState || contactsState.length === 0) {
      return truncateEthAddress(payeeAddress);
    }

    // Ensure to lower case both sides to match
    const contact = contactsState.find(
      (element: Contact) =>
        element.address?.toLocaleLowerCase() ==
        payeeAddress.toLocaleLowerCase()
    );

    return contact ? contact.name : truncateEthAddress(payeeAddress);
  };


  

  useEffect(() => {

    const filteredTransaction = transactionState.filter(
      (tx: any) =>
        tx.blockHash.toLocaleLowerCase() == hash
    );

    setTransaction(filteredTransaction[0]);

    setPayeeName(filteredTransaction.to);
  
  }, [transactionState, hash]);

  return (
    <AuthPage>
      <>
         {transaction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className='grid p-4 '>
              <div className='absolute z-50'>
                <Link href={'/home'}>
                  <BackButton />
                </Link>
              </div>
              <div className='my-4'>
                <div className='flex text-xl font-bold'>
                  <div className='text-card-foreground grid h-full w-full content-center items-center justify-center p-2 text-center text-5xl mix-blend-exclusion '>
                    {transaction?.from == address ? '+$' : '-$'}

                    {transaction?.value && formatUnits(transaction?.value, 6)}
                  </div>
                </div>
                <div className='text-muted-foreground text-center'>
                  {payeeName && findPayeeName(payeeName)}
                </div>
                <div className='text-muted-foreground text-center'>
                  <TimeAgo date={fromUnixTime(transaction?.timeStamp)} />{' '}
                </div>
                <div className='mt-10 grid grid-cols-1 gap-2 p-2'>
                  <div>
                    <Link
                      onClick={() => {
                        dispatch(setSheet(true));
                      }}
                      href={{
                        pathname: '/search',
                      }}
                    >
                      <Button
                        className='text-xl'
                        size={'lg'}
                        variant={'default'}
                      >
                        <div className='flex grid-cols-3 content-center items-center'>
                          <div className='text-xl'>
                            <div>Send Again</div>
                          </div>
                          <div className='px-2'></div>
                          <div>
                            <Send size={20} />
                          </div>
                        </div>
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className='bg-muted mt-4 rounded-xl p-4 text-slate-300'>
                  <div className='mb-4 flex justify-between'>
                    <p>Status</p>
                    <p>Completed</p>
                  </div>
                  <div className='flex justify-between'>
                    <p>Tx Hash</p>
                    <p className='text-blue-400'>
                      <a
                        href={`https://sepolia.etherscan.io/tx/${transaction?.hash}`}
                      >
                        {' '}
                        {transaction?.blockHash &&
                          truncateEthAddress(transaction?.blockHash)}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )} 
      </>
    </AuthPage>
  );
}
