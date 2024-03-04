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

//headless UI
import { Tab } from '@headlessui/react';

// react
import { useEffect, useRef, useState } from 'react';

// icon
import { Send, QrCode } from 'lucide-react';


// lucide
import { Menu } from 'lucide-react';

import Notifications from '@/app/components/Notifications/Notifications';
import SendNotification from '@/app/components/SendNotification/SendNotification';

export default function Page() {
  const kernalReduxState = useSelector(
    (state: RootState) => state.kernalClient.value
  );

  console.log('kernalReduxState', kernalReduxState);

  useEffect(() => {}, []);
  const router = useRouter();
  // redux
  const dispatch = useDispatch();
  let decodedText =
    '0x819a46d27ddeb3ac2bde6edea1b31f452ab4517ebeace7df2aee4399641ab4ed';
  return (
    <div id='render'>
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
      </div>
      <div className='blurios p-4 pt-40'>
        <div className='items-center text-center text-5xl'>
          <Balance />
        </div>

        <div className='mt-10 grid grid-cols-2 gap-4'>
          <div>
            <Link
              onClick={() => {
                dispatch(setSheet(true));
              }}
              href={{
                pathname: '/search',
              }}
            >
              <Button size={'lg'} variant={'outline'}>
                <div>Send</div> <Send size={20} color='#cbd5e1' />
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
              <Button size={'lg'} variant={'outline'}>
                <div className='flex justify-between'>
                  <div className=''>Receive</div>
                  <QrCode size={20} color='#cbd5e1' />
                </div>
              </Button>
            </Link>
          </div>
        </div>
        <div className='mt-4'>
          <Tab.Group>
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
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}
