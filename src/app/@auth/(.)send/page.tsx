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
export default function Page() {
  const router = useRouter();

  // get search params
  const searchParams = useSearchParams();
  let payee = searchParams.get('payee');

  return (
    <>
      <div className='grid'>
        <DrawerHeader>
          <DrawerTitle className='grid grid-cols-3 items-center'>
            <div
              onClick={() => {
                router.back();
              }}
            >
              <BackButton />
            </div>
            <p className='text-center'>{payee && useFindPayeeName(payee)}</p>
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
      </div>

      <div className=''>
        <SendUsdc />
      </div>
    </>
  );
}
