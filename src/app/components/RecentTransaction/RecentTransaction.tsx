'use client';
// hooks
import useGetAddress from '@/app/hooks/useGetAddress';
// icons

import { ArrowLeft, ArrowRight } from 'lucide-react';
// next
import Link from 'next/link';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { setSheet } from '@/GlobalRedux/Features/sheet/sheetSlice';

// truncate-eth-address
import truncateEthAddress from 'truncate-eth-address';

// framer motion
import { motion } from 'framer-motion';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/components/ui/avatar';
import { Card, CardContent } from '../ui/card';
import useFindPayeeName from '@/app/hooks/useFindPayeeName';

import TimeAgo from 'react-timeago';
import { formatUnits } from 'viem';
import { fromUnixTime } from 'date-fns';
import { RootState } from '@/GlobalRedux/store';



export default function RecentTransaction({ transaction }: any) {
  const address = useGetAddress();

  const contactsState = useSelector((state: RootState) => state.contacts.value);

  const payeeName = useFindPayeeName(transaction.to, contactsState);


  return (
    <div className=''>
      <Link href={{ pathname: '/tx', query: { hash: transaction.blockHash } }}>
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
              <div
                /* layoutId={`${transaction.hash}+title`} */
                className='text-sm font-medium leading-none'
              >
                {transaction.from.toLocaleLowerCase() !==
                address.toLocaleLowerCase()
                  ? 'From '
                  : 'To '}

                {payeeName}
              </div>
              <p className='text-muted-foreground text-sm'>
                <TimeAgo date={fromUnixTime(transaction.timeStamp)} />
              </p>
            </div>
            <div className='ml-auto font-medium'>
              {transaction.from.toLocaleLowerCase() !==
              address.toLocaleLowerCase()
                ? '+$'
                : '-$'}
              {formatUnits(transaction.value, 6)}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
