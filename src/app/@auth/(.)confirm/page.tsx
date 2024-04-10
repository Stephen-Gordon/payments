'use client';

import BackButton from '@/app/components/Navigation/BackButton/BackButton';
// components
import SendUsdc from '@/app/components/SendUsdc/SendUsdc';

import { useRouter } from 'next/navigation';
import {
  Drawer,
  DrawerTitle,
  DrawerHeader,
  DrawerContent,
  DrawerFooter,
} from '@/app/components/ui/drawer';

// button
import { Button } from '@/app/components/ui/button';

// format address
import truncateEthAddress from 'truncate-eth-address';
// next
import { useSearchParams } from 'next/navigation';

// avatar
import { Avatar } from '@/app/components/ui/avatar';
// link
import Link from 'next/link';

// hooks
import useSendUsdc from '@/app/hooks/useSendUsdc';

// components
import Success from '@/app/components/Success/Success';
// redux
import { useDispatch } from 'react-redux';
import useFindPayeeName from '@/app/hooks/useFindPayeeName';
import { ArrowDown, SendHorizonal, Send } from 'lucide-react';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '@/GlobalRedux/store';
import { Contact } from '@/app/types/types';

// motion
import { motion } from 'framer-motion';

interface ConfirmProps {
  showConfirm: boolean;
}

export default function Page({ showConfirm }: ConfirmProps) {
  const router = useRouter();

  const dispatch = useDispatch();

  // get search params
  const searchParams = useSearchParams();
  let payee = searchParams.get('payee');
  let amount = searchParams.get('amount');
  
  const { sendUsdc, transactionStatus, loading, transactionHash } =
    useSendUsdc();


    const contactsState = useSelector((state: RootState) => state.contacts.value);

  const findPayeeName = (payeeAddress: string): string | null => {
    if (!contactsState || contactsState.length === 0) {
      return truncateEthAddress(payeeAddress);
    }

    // Ensure to lower case both sides to match
    const contact = contactsState.find(
      (element: Contact) => element.address?.toLocaleLowerCase() === payeeAddress.toLocaleLowerCase()
    );

    return contact ? contact.name : truncateEthAddress(payeeAddress);
  };



  const handleSend = () => {
    if (!payee || !amount) return;
    console.log('calling hook');
    sendUsdc(amount, payee);
    
  };

  return (
    <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
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
          <p className='text-center'>Review</p>
          <div className='ml-auto'>
            
          </div>
        </DrawerTitle>
      </DrawerHeader>

      <div className='space-y-6 p-4'>
        <div className='space-y-1'>
          <div className='text-card-foreground grid h-full w-full content-center items-center justify-center p-2 text-center text-5xl mix-blend-exclusion '>
              ${amount}
          </div>
          <p className='text-muted-foreground text-center text-lg'>You're sending</p>

        </div>
        
        <div className='grid justify-center'>
          <p className='text-muted-foreground bg-muted w-fit rounded-full px-4 py-2 text-lg  '>
          To
        </p>
        </div>
        
        
          
        <div className=' text-3xl  text-card-foreground text-center font-normal leading-none'>
          {payee && findPayeeName(payee) }
        </div>
      </div>
      { loading == true || transactionStatus == true ? (<>
      <Success transactionStatus={transactionStatus} loading={loading} transactionHash={transactionHash}/>
      </>) : (
        <></>
      )}
      
      <DrawerFooter>
       
      <button onClick={handleSend}
          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <div className='flex grid-cols-3 content-center items-center'>
            <div className='text-xl'>
              <div>Send</div>
            </div>
            <div className='px-2'></div>
            <div>
              <Send size={20} className='fill-muted-foreground' />
            </div>
          </div>
        </button>

      </DrawerFooter>
    </motion.div>
    </>
  );
}
