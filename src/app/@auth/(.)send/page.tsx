'use client';

// Next
import { useSearchParams } from 'next/navigation';

import { Alchemy, Network } from 'alchemy-sdk';

import { useAccount } from 'wagmi';

import { useState } from 'react';
import useGetAddress from '@/app/hooks/useGetAddress';
import Sheet from '@/app/components/Layouts/Sheet';

// address
import truncateEthAddress from 'truncate-eth-address';

// components
import SendUsdc from '@/app/components/SendUsdc/SendUsdc';

const config = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.MATIC_MUMBAI,
};
const alchemy = new Alchemy(config);

export default function Page() {
  const address = useGetAddress();

  /* 
	const getData = async () => {
		const data = await alchemy.core.getAssetTransfers({
			fromBlock: "0x0",
			fromAddress: address,
			category: ["erc20", "erc721"],
		});
		console.log(data);
	}

 */

  const searchParams = useSearchParams();

  let payee = searchParams.get('payee');
  payee = truncateEthAddress(payee);

  return (
    <>
      <div className='grid'>
        <div className='my-4'>
          <p className='my-4 text-center text-xl text-gray-300'>Send</p>
        </div>
      </div>

      <div className='mt-20'>
        <SendUsdc />
      </div>
    </>
  );
}
