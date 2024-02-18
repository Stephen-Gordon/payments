'use client';

import BackButton from '@/app/components/Navigation/BackButton/BackButton';
// components
import SendUsdc from '@/app/components/SendUsdc/SendUsdc';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  return (
    <>
      <div className='grid'>
        <div className='flex p-4'>
          <div
            onClick={() => {
              router.back();
            }}
          >
            <BackButton />
          </div>
          <div className='my-4'>
            <p className='my-4 text-center text-xl text-gray-300'>Send</p>
          </div>
        </div>
      </div>

      <div className='mt-10'>
        <SendUsdc />
      </div>
    </>
  );
}
