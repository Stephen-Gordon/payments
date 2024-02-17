'use client';
// React
import { useState, useEffect } from 'react';

import useGetAddress from '@/app/hooks/useGetAddress';

// Next
import Link from 'next/link';
import BackButton from '@/app/components/Navigation/BackButton/BackButton';
import { useDispatch } from 'react-redux';
import { setSheet } from '@/GlobalRedux/Features/sheet/sheetSlice';
import Scanner from '@/app/components/Scanner/Scanner';

export default function Page() {
  const [payee, setPayee] = useState<string>(
    '0xc8C26Ab40fe4723519fE66B8dBb625FC070A982c'
  );
  const [scanner, setScanner] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const address = useGetAddress();

  const dispatch = useDispatch();

  useEffect(() => {
    // Add logic here to listen to the input value
    console.log('Input value:', payee);
  }, [payee]);

  return (
    <>
      <div className='grid'>
        {scanner && <Scanner isOpen={isOpen} setIsOpen={setIsOpen} />}
        <div className='flex'>
          <div className='p-4 '>
            <div
              className='w-fit'
              onClick={() => {
                dispatch(setSheet(false));
              }}
            >
              <BackButton />
            </div>
          </div>

          <div className='my-4'>
            <p className='my-4 text-center text-xl text-gray-300'>Search</p>
          </div>
        </div>
        <div className='flex px-4'>
          <input
            value={payee}
            onChange={(e) => setPayee(e.target.value)}
            className=' w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='Search an Address'
            required
          />
          <div
            onClick={() => {
              setIsOpen(true);
              setScanner(true);
            }}
            className='rounded-lg border border-gray-600 bg-gray-700 p-4 text-white '
          >
            Scan
          </div>
        </div>

        <div className='w-full p-4'>
          <Link
            href={{
              pathname: '/send',
              query: { payee: payee },
            }}
          >
            <button className='bg-purple w-full rounded p-4'>Go</button>
          </Link>
        </div>

        <div className='p-4'>
          <div className='text-lg text-gray-300'>Favorites</div>
          <div className='mb-4 flex content-center justify-between text-base'>
            <div className='flex items-center'>
              <div className='relative grid items-center justify-center'>
                <div className='h-12 w-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 '>
                  {/* Circle */}
                </div>
              </div>
              <div className='ml-2 text-gray-300'>John</div>
            </div>

            {/*  {transaction.blockNum} */}
          </div>
          <div className='mb-4 flex content-center justify-between text-base'>
            <div className='flex items-center'>
              <div className='relative grid items-center justify-center'>
                <div className='h-12 w-12 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 '>
                  {/* Circle */}
                </div>
              </div>
              <div className='ml-2 text-gray-300'>Joe</div>
            </div>

            {/*  {transaction.blockNum} */}
          </div>
        </div>
      </div>
    </>
  );
}

// Add address check
//https://viem.sh/docs/utilities/isAddress
