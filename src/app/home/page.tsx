'use client';
// next
import Link from 'next/link';
// components
import Balance from '../components/Balance/Balance';
import Send from '../components/Send/Send';
import Activity from '@/app/components/activity/Activity';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/GlobalRedux/store';
import { setSheet } from '@/GlobalRedux/Features/sheet/sheetSlice';

//headless UI
import { Tab } from '@headlessui/react';

// react
import { useEffect, useRef, useState } from 'react';

// camera
import { Camera } from 'react-camera-pro';
import { QrReader } from 'react-qr-reader';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useRouter } from 'next/navigation';

export default function Page() {
  const kernalReduxState = useSelector(
    (state: RootState) => state.kernalClient.value
  );

  console.log('kernalReduxState', kernalReduxState);

  useEffect(() => {}, []);

  // redux
  const dispatch = useDispatch();

  return (
    <div id='render'>
      <div className='blurios p-4 pt-40'>
        <div className='items-center text-center text-5xl'>
          <Balance />
        </div>

        <div className='mt-10 flex justify-between'>
          <Link
            onClick={() => {
              dispatch(setSheet(true));
            }}
            href={{
              pathname: '/search',
            }}
          >
            <button className='bg-purple w-40 rounded px-4 py-2 text-lg text-white hover:bg-blue-700'>
              Send
            </button>
          </Link>
          <Link
            onClick={() => {
              dispatch(setSheet(true));
            }}
            href={{
              pathname: '/receive',
            }}
          >
            <button className='bg-purple w-40 rounded px-4 py-2 text-lg text-white hover:bg-blue-700'>
              Receive
            </button>
          </Link>
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
        <div className='mt-20'>
          <Link
            href={{
              pathname: '/transaction',
            }}
          >
            <button className='bg-purple w-40 rounded px-4 py-2 text-lg text-white hover:bg-blue-700'>
              Scanner
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
