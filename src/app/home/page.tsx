'use client';
// next
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// components
import Balance from '../components/Balance/Balance';
import Activity from '@/app/components/activity/Activity';

import { Button } from '@/app/components/ui/button';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/GlobalRedux/store';
import { setSheet } from '@/GlobalRedux/Features/sheet/sheetSlice';


// react
import { useEffect, useRef, useState } from 'react';

// icon
import { Send, QrCode } from 'lucide-react';

// privy
import { usePrivySmartAccount } from '@zerodev/privy';


// lucide
import { Menu } from 'lucide-react';

//privy
import { usePrivy } from '@privy-io/react-auth';
//components
import Notifications from '@/app/components/Notifications/Notifications';
import SendNotification from '@/app/components/SendNotification/SendNotification';
import { BackgroundGradientAnimation } from '../components/ui/background-gradient-animation';


export default function Page() {



  const { user, zeroDevReady, sendTransaction } = usePrivySmartAccount();



  const kernalReduxState = useSelector(
    (state: RootState) => state.kernalClient.value
  );

  console.log('kernalReduxState', kernalReduxState);

  useEffect(() => {
    console.log("hi")
    console.log('user', user)
    console.log('zeroDevReady', zeroDevReady)

  }, [zeroDevReady]);
  const router = useRouter();
  // redux
  const dispatch = useDispatch();

  let decodedText =
    '0x819a46d27ddeb3ac2bde6edea1b31f452ab4517ebeace7df2aee4399641ab4ed';
  return (

    <div id='render' className=''>

      <div className='absolute right-4 top-4'>
        <Link
          /* onClick={() => {
            dispatch(setSheet(true));
          }} */
          href={{
            pathname: '/menu',
            query: { isNavOpen: true },
          }}
        >
          <Menu />
        </Link>
        <Link
          /* onClick={() => {
            dispatch(setSheet(true));
          }} */
          href={{
            pathname: '/embedded-wallet',
          }}
        >
          go
        </Link>
      </div>
      <div className='blurios'>
        <div className='absolute -z-50 '>
          <BackgroundGradientAnimation />
        </div>
        <div className='items-center p-2  pt-40 text-center text-5xl mix-blend-exclusion'>
          <Balance />
        </div>

        <div className='mt-10 grid grid-cols-2 gap-2 p-2'>
          <div>
            <Link
              onClick={() => {
                dispatch(setSheet(true));
              }}
              href={{
                pathname: '/search',
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
          </div>

          <div>
            <Link
              onClick={() => {
                dispatch(setSheet(true));
              }}
              href={{
                pathname: '/receive',
              }}
            >
              <Button className='text-xl' size={'lg'} variant={'default'}>
                <div className='flex grid-cols-3 content-center items-center'>
                  <div className='text-xl'>
                    <div>Receive</div>
                  </div>
                  <div className='px-2'></div>
                  <div>
                    <QrCode size={22} />
                  </div>
                </div>
              </Button>
            </Link>
          </div>
        </div>
        <div className='bg-accent mt-4 w-full rounded-t-xl p-4 min-h-[900px]'>
          {/*  <Tab.Group>
            <Tab.List>
              <div className='mb-4 flex justify-between'>
                <Tab>
                  <div className='text-lg text-gray-300'>Account</div>
                </Tab>
                <Tab>
                  <div className='text-lg text-gray-300'>Activity</div>
                </Tab>
              </div>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <Activity />
              </Tab.Panel>
              <Tab.Panel>Content 2</Tab.Panel>
            </Tab.Panels>
          </Tab.Group> */}

          {/*   <div className='mb-4 flex justify-between'>
                
                  <div className='text-lg'>Activity</div>
               
              </div>  */}


          <Activity />


        </div>
      </div>
    </div>
  );
}
