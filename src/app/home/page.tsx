'use client';
// next
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// components
import Balance from '../components/Balance/Balance';
import Activity from '@/app/components/activity/Activity';

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

// framer motion
import { motion } from 'framer-motion';

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
      <div className='blurios p-4 pt-40'>
        <SendNotification />
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
              <button className='bg-dark border-button-border hover:bg-button-hover flex w-full content-center items-center justify-between rounded border px-4 py-2 text-lg text-white transition-all duration-300'>
                <div>Send</div> <Send size={20} color='#cbd5e1' />
              </button>
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
              <button className='bg-dark border-button-border hover:bg-button-hover flex w-full content-center items-center justify-between rounded border px-4 py-2 text-lg text-white transition-all duration-300'>
                <div>Receive</div> <QrCode size={20} color='#cbd5e1' />
              </button>
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
