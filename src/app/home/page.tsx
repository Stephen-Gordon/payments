'use client';

import Link from 'next/link';
//import { Account, Connect } from "../../components";
import Balance from '../components/Balance/Balance';
import Send from '../components/Send/Send';
import { useSelector } from 'react-redux';
import { RootState } from '@/GlobalRedux/store';
import { Tab } from '@headlessui/react'


import Activity from '@/app/components/activity/activity';

export default function Page() {
  const kernalReduxState = useSelector(
    (state: RootState) => state.kernalClient.value
  );
  console.log('kernalReduxState', kernalReduxState);

  return (
    <div className='pt-40 p-8'>
      <div className=' items-center text-center text-5xl'>
        <Balance />
      </div>

      <div className='mt-10 flex justify-between'>
        <Link
          href={{
            pathname: '/search',
            query: { address: '12345' },
          }}
        >
          <button className='rounded w-40 bg-purple px-4 py-2 text-white hover:bg-blue-700 text-lg'>
            Send
          </button>

        </Link>
        <Link
          href={{
            pathname: '/receive',
            query: { address: '12345' },
          }}
        >
          <button className='rounded w-40 bg-purple px-4 py-2 text-white hover:bg-blue-700 text-lg'>
            Receive
          </button>
        </Link>

      </div>
      <Tab.Group>
        <Tab.List >
          <div className=' flex justify-between'>
            <Tab>
              <div className='text-xl text-gray-300'>
                Account
              </div>
            </Tab>
            <Tab>
              <div className='text-xl text-gray-300'>
                Activity
              </div>
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

      {/* <Send /> */}
      {/* 		<Account />
			<Connect /> */}
    </div >
  );
}
