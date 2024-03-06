'use client';
// React
import { useState, useEffect } from 'react';

// hooks
import useGetAddress from '@/app/hooks/useGetAddress';

// Next
import Link from 'next/link';

// redux
import { useDispatch } from 'react-redux';
import { setSheet } from '@/GlobalRedux/Features/sheet/sheetSlice';
// scanner
import Scanner from '@/app/components/Scanner/Scanner';
// next
import { useRouter } from 'next/navigation';
// components
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import BackButton from '@/app/components/Navigation/BackButton/BackButton';

// drawer
import { DrawerHeader, DrawerTitle } from '@/app/components/ui/drawer';


// icons 
import { QrCode } from 'lucide-react';
import RecentPayee from '@/app/components/RecentPayee.tsx/RecentPayee';
export default function Page() {
  const [payee, setPayee] = useState<string>(
    ''
  );
  const [scanner, setScanner] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const address = useGetAddress();

  // router
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    // Add logic here to listen to the input value
    console.log('Input value:', payee);
  }, [payee]);

  return (
    <>
      <div className='grid'>
        {scanner && <Scanner isOpen={isOpen} setIsOpen={setIsOpen} />}

        <DrawerHeader>
          <DrawerTitle className='grid grid-cols-3 items-center'>
            <div
              onClick={() => {
                router.back();
                dispatch(setSheet(false));

              }}
            >
              <BackButton />
            </div>
            <p className='text-center'>Send</p>
            <div className='ml-auto'>
              <div></div>
            </div>
          </DrawerTitle>
        </DrawerHeader>
       
        <div className='flex px-4'>
          {/*   <input
          
            value={payee}
            onChange={(e) => setPayee(e.target.value)}
            className=' w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='Search an Address'
            required
          /> */}
          <div className='flex w-full content-center'>
            <input
              type='text'
              onChange={(e) => setPayee(e.target.value)}
              className='border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-s-lg border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50'
              placeholder='Search an Address'
            />
            <span className='rounded-s-0 inline-flex items-center rounded-e-md border bg-transparent px-3  py-1 text-sm '>
              <Button size={'sm'} variant={'secondary'}>
                Paste
              </Button>
            </span>
          </div>

          {/*  <div className='flex w-full max-w-sm items-center space-x-2'>
            <Input
              value={payee}
              onChange={(e) => setPayee(e.target.value)}
              type='email'
              placeholder='Email'
            />

            <Button type='submit'>Subscribe</Button>
          </div> */}
          {/*  <div
            
            className='rounded-lg border border-gray-600 bg-gray-700 p-4 text-white '
          >
            Scan
          </div> */}
        </div>
        {/* Scan a Qr code */}
        <div
          onClick={() => {
            setIsOpen(true);
            setScanner(true);
          }}
          className='mt-4 space-y-8 px-4'
        >
          <div className='flex w-full items-center '>
            <QrCode className='h-7' />
            <div className='ml-4 space-y-1'>
              <div className='text-sm font-medium leading-none'>
                Scan a Qr Code
              </div>
              <p className='text-muted-foreground text-sm'>
                Tap to scan an address
              </p>
            </div>
          </div>
        </div>
        <div className='w-full p-4'>
          <Link
            href={{
              pathname: '/send',
              query: { payee: payee },
            }}
          >
            <button className='bg-purple w-full rounded p-4'>Go</button>
          </Link>
        </div>
        <RecentPayee/>

        <div className='p-4'>
          <div className='text-lg text-gray-300'>Favorites</div>
          <div className='mb-4 flex content-center justify-between text-base'>
            <div className='flex items-center'>
              <div className='relative grid items-center justify-center'>
                <div className='h-12 w-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 '>
                  {/* Circle */}
                </div>
              </div>
              <div className='ml-2 text-gray-300'>John</div>
            </div>

            {/*  {transaction.blockNum} */}
          </div>
          <div className='mb-4 flex content-center justify-between text-base'>
            <div className='flex items-center'>
              <div className='relative grid items-center justify-center'>
                <div className='h-12 w-12 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 '>
                  {/* Circle */}
                </div>
              </div>
              <div className='ml-2 text-gray-300'>Joe</div>
            </div>

            {/*  {transaction.blockNum} */}
          </div>
        </div>
      </div>
    </>
  );
}

// Add address check
//https://viem.sh/docs/utilities/isAddress
