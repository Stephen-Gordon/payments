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
import AuthPage from '../components/AuthPage/AuthPage';

// hooks
import useFindPayeeName from '../hooks/useFindPayeeName';

// types
import { Contact } from '@/app/types/types';

export default function Page() {
  

  const [transaction, setTransaction] = useState<any>({});

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();

  let hash = searchParams.get('hash');

  const txState = useSelector((state: any) => state.transactions.value);

  const address = useSelector((state: any) => state.address.value);

  const [payeeName, setPayeeName] = useState<string | null>('');


  const contactsState = useSelector((state: RootState) => state.contacts.value);

  const findPayeeName = (payeeAddress: string): string | null => {
    if (!contactsState || contactsState.length === 0) {
      return truncateEthAddress(payeeAddress);
    }

    // Ensure to lower case both sides to match
    const contact = contactsState.find(
      (element: Contact) =>
        element.address?.toLocaleLowerCase() ===
        payeeAddress.toLocaleLowerCase()
    );

    return contact ? contact.name : truncateEthAddress(payeeAddress);
  };
  
  useEffect(() => {
    

    const filteredTransaction = txState.filter((tx: any) => tx.hash == hash);

    setTransaction(filteredTransaction[0]);
    
    setPayeeName(filteredTransaction[0].to);
    console.log('filteredTransaction', filteredTransaction);
    setIsLoading(false);
  }, [txState]);

  return (
    <AuthPage>
      <>
        {!isLoading && (
          <motion.div
            key={hash}
            layoutId={hash}
            animate={{
              transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
            }}
            style={{
              width: '100vw',
              height: '100vh',
            }}
            className='bg-background'
          >
            <div className='grid p-4'>
              <div className='my-4'>
                <div className='flex text-xl font-bold'>
                  <div className='text-card-foreground grid h-full w-full content-center items-center justify-center p-2 text-center text-5xl mix-blend-exclusion '>
                    {transaction.from == address ? '+$' : '-$'}

                    {transaction.value}
                  </div>
                </div>
                <div className='text-blue-400'>
                   {payeeName && findPayeeName(payeeName)}
                </div>
                <div className='mt-10 grid grid-cols-2 gap-4 text-white'>
                  <div>
                    <Link
                      onClick={() => {}}
                      href={{
                        pathname: '/send',
                        query: { address: transaction.from },
                      }}
                    >
                      <button className='bg-dark border-button-border hover:bg-button-hover flex w-full content-center items-center justify-between rounded border px-4 py-2 text-lg text-white transition-all duration-300'>
                        <div className='text-white'>Send</div>{' '}
                        <Send size={20} color='#cbd5e1' />
                      </button>
                    </Link>
                  </div>
                  <div>
                    <Link
                      href={{
                        pathname: '/receive',
                      }}
                    >
                      <button className='bg-dark border-button-border hover:bg-button-hover flex w-full content-center items-center justify-between rounded border px-4 py-2 text-lg text-white transition-all duration-300'>
                        <div className='text-white'>Receive</div>{' '}
                        <QrCode size={20} color='#cbd5e1' />
                      </button>
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
                      {truncateEthAddress(transaction.hash)}
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
