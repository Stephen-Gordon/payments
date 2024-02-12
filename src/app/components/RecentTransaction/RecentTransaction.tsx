'use client';
import useGetAddress from '@/app/hooks/useGetAddress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import truncateEthAddress from 'truncate-eth-address';

export default function RecentTransaction({ transaction }: any) {
  const address = useGetAddress();

  return (
    <Link
      href={{ pathname: '/transaction', query: { hash: transaction.hash } }}
    >
      <div className='mb-4 flex content-center justify-between text-base'>
        <div className='flex items-center'>
          <div className='relative grid items-center justify-center'>
            <div className='h-12 w-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 '>
              {/* Circle */}
            </div>
            <div className='absolute left-6 top-5'>
              <div className='bg-purple flex h-7 w-7 content-center items-center justify-center rounded-full '>
                {transaction.from == address ? (
                  <ArrowLeft className='h-6 w-6' />
                ) : (
                  <ArrowRight className='h-6 w-6' />
                )}
              </div>
            </div>
          </div>
          <div className='ml-2'>
            {transaction.from == address ? 'From' : ''}{' '}
            {truncateEthAddress(transaction.from)}
          </div>
        </div>
        <div className='flex text-white'>
          {transaction.from == address ? '+$' : '-$'}

          {transaction.value}
        </div>

        {/*  {transaction.blockNum} */}
      </div>
    </Link>
  );
}
