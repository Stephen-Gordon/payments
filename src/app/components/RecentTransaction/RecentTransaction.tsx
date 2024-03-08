'use client';
// hooks
import useGetAddress from '@/app/hooks/useGetAddress';
// icons

import { ArrowLeft, ArrowRight } from 'lucide-react';
// next
import Link from 'next/link';
// redux
import { useDispatch } from 'react-redux';
import { setSheet } from '@/GlobalRedux/Features/sheet/sheetSlice';

// truncate-eth-address
import truncateEthAddress from 'truncate-eth-address';

// framer motion
import { motion } from 'framer-motion';


import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Card, CardContent } from '../ui/card';

export default function RecentTransaction({ transaction }: any) {
  const address = useGetAddress();

  return (
    <motion.div layoutId={transaction.hash}>
      <Link href={{ pathname: '/tx', query: { hash: transaction.hash } }}>
        {/* <motion.div className='bg-background mb-4 flex content-center justify-between rounded-md border p-2 text-base transition-all duration-300'>
          <div className='flex items-center'>
            <div className='relative grid items-center justify-center'>
              <Avatar className='bg-slate-700'></Avatar>
              <div className='absolute left-6 top-5'>
                <div className='bg-background flex h-7 w-7 content-center items-center justify-center rounded-full border '>
                  {transaction.from == address ? (
                    <ArrowLeft className='h-6 w-6' />
                  ) : (
                    <ArrowRight className='h-6 w-6' />
                  )}
                </div>
              </div>
            </div>
            <motion.div layoutId={`${transaction.hash}+title`} className='ml-2'>
              {transaction.from == address ? 'From' : ''}{' '}
              {truncateEthAddress(transaction.from)}
            </motion.div>
            <div></div>
          </div>
          <div className='flex text-white'>
            {transaction.from == address ? '+$' : '-$'}

            {transaction.value}
          </div>
        </motion.div> */}
        <div className='space-y-8'>
          <div className='flex w-full items-center '>
            <Avatar className='h-9 w-9 bg-white'></Avatar>
            <div className='ml-4 space-y-1'>
              <motion.div
                layoutId={`${transaction.hash}+title`}
                className='text-sm font-medium leading-none'
              >
                {transaction.from == address ? 'From' : ''}{' '}
                {truncateEthAddress(transaction.from)}
              </motion.div>
              <p className='text-muted-foreground text-sm'>
                {transaction?.metadata?.blockTimestamp.slice(0, 10)}
              </p>
            </div>
            <div className='ml-auto font-medium'>
              {transaction.from == address ? '+$' : '-$'}

              {transaction.value}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
