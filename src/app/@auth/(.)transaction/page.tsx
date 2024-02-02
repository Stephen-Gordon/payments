'use client';

import { useRouter } from "next/router";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { Alchemy, Network } from 'alchemy-sdk';

export default function Page() {


  const config = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.MATIC_MUMBAI,
  };
  const alchemy = new Alchemy(config);

  const [transactions, setTransactions] = useState<any>({})

  const searchParams = useSearchParams();

  let hash = searchParams.get('hash');

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await alchemy.transact.getTransaction(hash);
        console.log('response', response);
        setTransactions(response);
      } catch (error) {

      }
    }
    getData();
  }, [])


  return (
    <>
      <div className='grid'>
        <div className='my-4'>
          <p className='my-4 text-center text-xl text-gray-300'>Tx</p>
          <p className='my-4 text-center text-xl text-gray-300'>{hash}</p>
        </div>
      </div>

    </>
  );
}
