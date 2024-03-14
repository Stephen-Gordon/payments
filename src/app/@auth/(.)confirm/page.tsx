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
import useSendUsdc from '@/app/hooks/useSendUsdc';
interface ConfirmProps {
  showConfirm: boolean;
}

export default function Page({ showConfirm }: ConfirmProps) {
  const router = useRouter();

  // get search params
  const searchParams = useSearchParams();
  let payee = searchParams.get('payee');
  let amount = searchParams.get('amount');
  const { sendUsdc, transactionStatus, loading, transactionHash } =
    useSendUsdc();

  const handleSend = () => {
    if (!payee || !amount) return;
    console.log('calling hook');
    sendUsdc(amount, payee);
  };

  return (
    <>
      <DrawerHeader>
        <DrawerTitle className='grid grid-cols-3 items-center'>
          <div
            onClick={() => {
              router.back();
            }}
          >
            <BackButton />
          </div>
          <p className='text-center'>Sending</p>
          <div className='ml-auto'>
            <Link
              className='h-auto w-auto'
              href={{ pathname: `/send`, query: { payee: payee } }}
            >
              <Link
                className='h-auto w-auto'
                href={{
                  pathname: `/payee`,
                  query: { payeeAddress: payee },
                }}
              >
                <Avatar className='h-9 w-9 bg-white'></Avatar>
              </Link>
            </Link>
          </div>
        </DrawerTitle>
      </DrawerHeader>

      <div className='space-y-6 p-4'>
        <div className='space-y-1'>
          <p className='text-muted-foreground text-lg'>You're sending</p>
          <div className='pb-4 text-3xl font-bold leading-none'>${amount}</div>
        </div>
        <p className='text-muted-foreground bg-muted w-fit rounded-full px-4 py-2 text-lg  '>
          To
        </p>
        <div className='text-3xl font-bold leading-none'>
          {truncateEthAddress(payee)}
        </div>
      </div>
      <DrawerFooter>
        <Button
          onClick={handleSend}
          className='text-xl'
          size={'lg'}
          variant={'default'}
        >
          <div className='flex content-center items-center'>
            <div className='text-xl'>
              <div>Send</div>
            </div>
          </div>
        </Button>
      </DrawerFooter>
    </>
  );
}
