'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';
//redux
import { useSelector } from 'react-redux';

import truncateEthAddress from 'truncate-eth-address';

export default function Page() {
  const router = useRouter();

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
      <Link href={{ pathname: '/home' }}>Back Home</Link>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <div className='grid p-4'>
          <div className='my-4'>
            <div className='flex text-xl font-bold text-white'>
              {transaction.from == address ? '+$' : '-$'}

              {transaction.value}
            </div>
            <div className='text-blue-400'>
              {transaction.from == address ? 'From' : 'To'}{' '}
              {truncateEthAddress(transaction.from)}
            </div>
            <div className='mt-10 flex justify-between'>
              <Link
                href={{
                  pathname: '/search',
                  query: { address: transaction.to },
                }}
              >
                <button className='bg-purple w-40 rounded px-4 py-2 text-lg text-white hover:bg-blue-700'>
                  Send
                </button>
              </Link>
              <Link
                href={{
                  pathname: '/receive',
                  query: { address: transaction.to },
                }}
              >
                <button className='bg-purple w-40 rounded px-4 py-2 text-lg text-white hover:bg-blue-700'>
                  Receive
                </button>
              </Link>
            </div>
            <div className='bg-muted mt-4 rounded-xl p-4'>
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
      )}
    </>
  );
}
