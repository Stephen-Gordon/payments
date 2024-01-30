'use client';

import Link from 'next/link';
//import { Account, Connect } from "../../components";
import Balance from '../components/Balance/Balance';
import Send from '../components/Send/Send';
import { useSelector } from 'react-redux';
import { RootState } from '@/GlobalRedux/store';

export default function Page() {
  const kernalReduxState = useSelector(
    (state: RootState) => state.kernalClient.value
  );
  console.log('kernalReduxState', kernalReduxState);

  return (
    <div>
      <div className='mt-60 items-center text-center text-5xl'>
        <Balance />
      </div>

      <Link
        href={{
          pathname: '/send',
          query: { address: '12345' },
        }}
      >
        <button className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'>
          Go to send Usdc
        </button>
      </Link>
      <Link
        href={{
          pathname: '/search',
        }}
      >
        <button className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'>
          Search Address
        </button>
      </Link>
      {/* <Send /> */}
      {/* 		<Account />
			<Connect /> */}
    </div>
  );
}
