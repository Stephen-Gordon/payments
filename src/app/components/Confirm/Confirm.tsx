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
} from '@/app/components/ui/drawer';
// format address
import truncateEthAddress from 'truncate-eth-address';
// next
import { useSearchParams } from 'next/navigation';

// avatar
import { Avatar } from '@/app/components/ui/avatar';
// link
import Link from 'next/link';

interface ConfirmProps {
  showConfirm: boolean;
  payee: string;
  amount: string;
}

export default function Confirm({ showConfirm, payee, amount }: ConfirmProps) {
  const router = useRouter();

  // get search params
  const searchParams = useSearchParams();

  return (
    <>
      <Drawer nested={true} open={showConfirm}>
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

        <DrawerContent className='ios'>
          <div className='p-4'>
            <div className='ml-4 space-y-1'>
              <p className='text-muted-foreground text-sm'>You're sending</p>
              <div className='text-3xl font-bold leading-none'>{amount}</div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
