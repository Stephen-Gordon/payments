'use client';

import Link from 'next/link';
//import { Account, Connect } from "../../components";
import Balance from '../components/Balance/Balance';
import Send from '../components/Send/Send';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/GlobalRedux/store';
import { Tab } from '@headlessui/react';

import Activity from '@/app/components/activity/Activity';
import { setSheet } from '@/GlobalRedux/Features/sheet/sheetSlice';
export default function Page() {
  const kernalReduxState = useSelector(
    (state: RootState) => state.kernalClient.value
  );
  console.log('kernalReduxState', kernalReduxState);
  const dispatch = useDispatch();
  return (
    <div id='render'>
      <div className='p-4 pt-40'>
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
                  <div className='text-xl text-gray-300'>Account</div>
                </Tab>
                <Tab>
                  <div className='text-xl text-gray-300'>Activity</div>
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
