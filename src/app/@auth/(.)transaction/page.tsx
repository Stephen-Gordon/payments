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
export default function Page() {
  console.log('Tx Modal Page');
  const dispatch = useDispatch();

  const [transaction, setTransaction] = useState<any>({});

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();

  let hash = searchParams.get('hash');

  const txState = useSelector((state: any) => state.transactions.value);

  const address = useSelector((state: any) => state.address.value);

  useEffect(() => {
    console.log('txState', txState);
    const filteredTransaction = txState.filter((tx: any) => tx.hash == hash);

    setTransaction(filteredTransaction[0]);
    console.log('filteredTransaction', filteredTransaction);
    setIsLoading(false);
  }, [txState]);

  return (
    <>
      {!isLoading && (
        <motion.div
          key={hash}
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
              <div className='flex text-xl font-bold text-white'>
                <Avatar className='bg-black'></Avatar>
                {transaction.from == address ? '+$' : '-$'}

                {transaction.value}
              </div>
              <div className='text-blue-400'>
                {transaction.from == address ? 'From' : 'To'}{' '}
                {truncateEthAddress(transaction.from)}
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
  );
}
