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

export default function RecentTransaction({ transaction }: any) {
  const address = useGetAddress();

  return (
    <motion.div layoutId={transaction.hash}>
      <Link href={{ pathname: '/tx', query: { hash: transaction.hash } }}>
        <motion.div className='hover:bg-button-hover mb-4 flex content-center justify-between rounded-lg p-2 text-base transition-all duration-300'>
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
            <motion.div layoutId={`${transaction.hash}+title`} className='ml-2'>
              {transaction.from == address ? 'From' : ''}{' '}
              {truncateEthAddress(transaction.from)}
            </motion.div>
          </div>
          <div className='flex text-white'>
            {transaction.from == address ? '+$' : '-$'}

            {transaction.value}
          </div>

          {/*  {transaction.blockNum} */}
        </motion.div>
      </Link>
    </motion.div>
  );
}
