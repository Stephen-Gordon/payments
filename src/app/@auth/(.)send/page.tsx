'use client';

// Next
import { useSearchParams } from 'next/navigation';

import { Alchemy, Network } from 'alchemy-sdk';

import { useAccount } from 'wagmi';

import { useState } from 'react';
import useGetAddress from '@/app/hooks/useGetAddress';
import Sheet from '@/app/components/Layouts/Sheet';

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

  const payee = searchParams.get('payee');

  /*  const { payee } = router.query; */

  return (
    <>
      <h1>Send Page</h1>
      <p>Route address: {address}</p>
      <p>Payee: {payee}</p>
      {/* <button onClick={getData} >get data</button> */}

      <div className='mt-20'>{/* <SendUsdc payee={payee} /> */}</div>
    </>
  );
}
