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

//viem
import { isAddress } from 'viem';

// icons
import { QrCode, X, Send } from 'lucide-react';

import RecentPayee from '@/app/components/RecentPayee.tsx/RecentPayee';
// motion
import { AnimatePresence, motion } from 'framer-motion';
//
export default function Page() {
  const [payee, setPayee] = useState<string>('');
  const [scanner, setScanner] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const address = useGetAddress();

  // router
  const router = useRouter();

  const isTrue = isAddress(payee);

  const dispatch = useDispatch();

  useEffect(() => {
    // Add logic here to listen to the input value
    console.log('Input value:', payee);
    console.log('isTrue:', isTrue);
  }, [payee, isTrue]);

  return (
    <>
      <div className='grid'>
        {scanner && <Scanner isOpen={isOpen} setIsOpen={setIsOpen} />}

        <DrawerHeader>
          <DrawerTitle className='grid grid-cols-3 items-center'>
            <div>
              <BackButton
                onClick={() => {
                  router.back();
                  dispatch(setSheet(false));
                }}
              />
            </div>
            <p className='text-center'>Send</p>
            <div className='ml-auto'></div>
          </DrawerTitle>
        </DrawerHeader>

        <div className='flex px-4'>
          <form className='w-full'>
            <div className='relative grid w-full content-center'>
              <Input
                onChange={(e) => setPayee(e.target.value)}
                value={payee}
                id='search-input relative'
                className='h-10 w-full text-lg'
                placeholder='Search an Address'
                type='text'
              />
              <div className=' absolute right-0 z-50 flex w-auto justify-end '>
                <AnimatePresence>
                  {payee !== '' && (
                    <motion.div
                      key='clear'
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.4, ease: 'easeInOut' },
                      }}
                      exit={{ opacity: 0 }}
                      className='pr-4 '
                    >
                      <X
                        className='pointer-events-auto grid h-8 w-8 content-center items-center'
                        onClick={() => setPayee('')}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </form>
        </div>

        <div className='mt-4 space-y-8 px-4'>
          {isTrue ? (
            <>
              <AnimatePresence>
                <motion.div
                  key='send-button'
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.4, ease: 'easeInOut' },
                  }}
                  exit={{ opacity: 0 }}
                  className='w-full'
                >
                  <Link
                    href={{
                      pathname: '/send',
                      query: { payee: payee },
                    }}
                  >
                    <Button className='text-xl' size={'lg'} variant={'default'}>
                      <div className='flex grid-cols-3 content-center items-center'>
                        <div className='text-xl'>
                          <div>Send</div>
                        </div>
                        <div className='px-2'></div>
                        <div>
                          <Send size={20} />
                        </div>
                      </div>
                    </Button>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            <>
              <AnimatePresence>
                <motion.div
                  key='vaild-address'
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.4, ease: 'easeInOut' },
                  }}
                  exit={{ opacity: 0 }}
                  className='w-full'
                >
                  {payee != '' && (
                    <div
                      key='valid-address'
                      className='text-muted-foreground text-sm'
                    >
                      Please enter a valid address
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </div>

        <AnimatePresence>
          {payee == '' && (
            <>
              <motion.div
                key='search-page'
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.4, ease: 'easeInOut' },
                }}
                exit={{ opacity: 0 }}
                className='w-full'
              >
                {/* <div className='w-full p-4'>
                  <Link
                    href={{
                      pathname: '/send',
                      query: { payee: payee },
                    }}
                  >
                    <button className='bg-purple w-full rounded p-4'>Go</button>
                  </Link>
                </div> */}
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
                <div id='#recent-activity' className='space-y-8 p-4'>
                  <RecentPayee />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* <div className='p-4'>
          <div className='text-lg text-gray-300'>Favorites</div>
          <div className='mb-4 flex content-center justify-between text-base'>
            <div className='flex items-center'>
              <div className='relative grid items-center justify-center'>
                <div className='h-12 w-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 '>
              
                </div>
              </div>
              <div className='ml-2 text-gray-300'>John</div>
            </div>

          
          </div>
          <div className='mb-4 flex content-center justify-between text-base'>
            <div className='flex items-center'>
              <div className='relative grid items-center justify-center'>
                <div className='h-12 w-12 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 '>
             
                </div>
              </div>
              <div className='ml-2 text-gray-300'>Joe</div>
            </div>

         
          </div>
        </div> */}
      </div>
    </>
  );
}

// Add address check
//https://viem.sh/docs/utilities/isAddress
