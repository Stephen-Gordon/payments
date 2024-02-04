'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { useEffect, useState } from "react";
//redux
import { useSelector } from "react-redux";

import truncateEthAddress from 'truncate-eth-address';

export default function Page() {



  const [transaction, setTransaction] = useState<any>({})

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const searchParams = useSearchParams();

  let hash = searchParams.get('hash');

  const txState = useSelector((state: any) => state.transactions.value);

  const address = useSelector((state: any) => state.address.value);

  useEffect(() => {
    console.log('txState', txState)
    const filteredTransaction = txState.filter((tx: any) => tx.hash == hash);


    setTransaction(filteredTransaction[0]);
    console.log('filteredTransaction', filteredTransaction)
    setIsLoading(false)

  }, [txState])



  return (
    <>
      {
        isLoading && <div>Loading...</div>
      }
      {
        !isLoading && (
          <div className='grid p-4'>
            <div className='my-4'>
              <div className="flex text-white font-bold text-xl">
                {transaction.from == address ? "+$" : "-$"}

                {transaction.value}
              </div>
              <div className="text-blue-400">
                {transaction.from == address ? "From" : "To"} {truncateEthAddress(transaction.from)}
              </div>
              <div className='mt-10 flex justify-between'>
                <Link
                  href={{
                    pathname: '/search',
                    query: { address: transaction.to },
                  }}
                >
                  <button className='rounded w-40 bg-purple px-4 py-2 text-white hover:bg-blue-700 text-lg'>
                    Send
                  </button>

                </Link>
                <Link
                  href={{
                    pathname: '/receive',
                    query: { address: transaction.to },
                  }}
                >
                  <button className='rounded w-40 bg-purple px-4 py-2 text-white hover:bg-blue-700 text-lg'>
                    Receive
                  </button>
                </Link>
              </div>
              <div className='bg-paper-two p-4 rounded-xl mt-4'>
                <div className='flex justify-between mb-4'>
                  <p>Status</p>
                  <p>Completed</p>
                </div>
                <div className='flex justify-between'>
                  <p>Tx Hash</p>
                  <p className='text-blue-400'>{truncateEthAddress(transaction.hash)}</p>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}
