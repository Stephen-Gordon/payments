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

  const payeeName =
    transaction.from.toLocaleLowerCase() !== address?.toLocaleLowerCase()
      ? useFindPayeeName(transaction.from, contactsState)
      : useFindPayeeName(transaction.to, contactsState);

  const dispatch = useDispatch();

  return (
    transaction && (
      <div onClick={() => dispatch(setSheet(true))}>
        <Link
          href={{
            pathname: '/transaction',
            query: { hash: transaction.blockHash },
          }}
        >
          <div className='space-y-8'>
            <div className='flex w-full items-center '>
              <Avatar className='h-9 w-9 bg-white'></Avatar>
              <div className='ml-4 space-y-1'>
                <div
                  /* layoutId={`${transaction.hash}+title`} */
                  className='text-sm font-medium leading-none'
                >
                  {transaction.from.toLocaleLowerCase() !==
                  address?.toLocaleLowerCase()
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
                address?.toLocaleLowerCase()
                  ? '+$'
                  : '-$'}
                {formatUnits(transaction.value, 6)}
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  );
}
