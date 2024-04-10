'use client';

import BackButton from '@/app/components/Navigation/BackButton/BackButton';
// components
import SendUsdc from '@/app/components/SendUsdc/SendUsdc';

import { useRouter } from 'next/navigation';
import { DrawerTitle, DrawerHeader } from '@/app/components/ui/drawer';
// format address
import truncateEthAddress from 'truncate-eth-address';
// next
import { useSearchParams } from 'next/navigation';

// avatar
import { Avatar } from '@/app/components/ui/avatar';
// link
import Link from 'next/link';
import useFindPayeeName from '@/app/hooks/useFindPayeeName';
import { useSelector } from 'react-redux';
import { RootState } from '@/GlobalRedux/store';

// motion
import { motion } from 'framer-motion';


export default function Page() {
  const router = useRouter();

  // get search params
  const searchParams = useSearchParams();
  let payee = searchParams.get('payee');
  const contactsState = useSelector((state: RootState) => state.contacts.value);

  return (
    <>
      <DrawerHeader>
        <DrawerTitle className='grid grid-cols-3 items-center'>
          <motion.div
            key={'back'}
            layoutId='back'
            onClick={() => {
              router.back();
            }}
          >
            <BackButton />
          </motion.div>
          <motion.p
            key={'payee-name'}
            layoutId='payee-name'
            className='text-center'
          >
            {payee && useFindPayeeName(payee, contactsState)}
          </motion.p>
          <div className='ml-auto'>
            <Link
              className='h-auto w-auto'
              href={{ pathname: `/send`, query: { payee: payee } }}
            >
              <Link
                className='h-auto w-auto'
                href={{ pathname: `/payee`, query: { payeeAddress: payee } }}
              >
                <Avatar className='h-9 w-9 bg-white'></Avatar>
              </Link>
            </Link>
          </div>
        </DrawerTitle>
      </DrawerHeader>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className='grid'
      >
        <SendUsdc />
      </motion.div>
    </>
  );
}
