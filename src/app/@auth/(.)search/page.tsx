'use client';
// React
import { useState, useEffect } from 'react';
import useGetAddress from '@/app/hooks/useGetAddress';
// Next
import Link from 'next/link';

// Layout

export default function Page() {
  const [payee, setPayee] = useState(
    '0xc8C26Ab40fe4723519fE66B8dBb625FC070A982c'
  );

  const address = useGetAddress();

  useEffect(() => {
    // Add your logic here to listen to the input value
    console.log('Input value:', payee);
  }, [payee]);

  return (
    <>
      <div className='grid'>
        <div className='my-4'>
          <p className='my-4 text-center text-xl text-gray-300'>Search</p>
        </div>
        <div className='px-4'>
          <input
            value={payee}
            onChange={(e) => setPayee(e.target.value)}
            className=' w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='Search an Address'
            required
          />
        </div>

        <div className='w-full p-4'>
          <Link
            href={{
              pathname: '/send',
              query: { payee: payee },
            }}
          >
            <button className='w-full rounded bg-slate-400 p-4'>Go</button>
          </Link>
        </div>
      </div>
    </>
  );
}

// Add address check
//https://viem.sh/docs/utilities/isAddress
