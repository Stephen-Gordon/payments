'use client';

// Next
import { useRouter, useSearchParams } from 'next/navigation';
// drawer
import { DrawerHeader, DrawerTitle } from '@/app/components/ui/drawer';
//avatar
import { Avatar } from '@/app/components/ui/avatar';
// truc address
import truncateEthAddress from 'truncate-eth-address';
// backbutton
import BackButton from '@/app/components/Navigation/BackButton/BackButton';
// react
import { useEffect, useState } from "react";
// hooks
import useGetRecentTransactions from '@/app/hooks/useGetRecentTransactions';
import useGetAddress from '@/app/hooks/useGetAddress';



export default function Page() {
  const searchParams = useSearchParams();
  let payeeAddress = searchParams.get('payeeAddress');
  console.log("payeeAddress", payeeAddress  )
  const address = useGetAddress();
  const router = useRouter();
  const [ transactions, setTransactions ] = useState([]);

  useEffect(() => {
    const fetchRecentTransactions = async () => {
      const recentTransactions = await useGetRecentTransactions();
      console.log('all recent transactions ', recentTransactions);

      if (recentTransactions) {
        // Filter transactions where either to or from address matches payeeAddress or address
        const filteredTransactions = recentTransactions.transfers.filter(
          (transaction) =>
            transaction.to === payeeAddress ||
            transaction.from === payeeAddress ||
            transaction.to === address ||
            transaction.from === address
        );

        console.log('filteredTransactions gpt', filteredTransactions);
        setTransactions(filteredTransactions);
      }


      /* if (recentTransactions) {
        // get all txs with the payee
        const allPayeeTransactions = recentTransactions.transfers.filter(
          (transaction) => transaction.to || transaction.from === payeeAddress 
        );
        const filterTwo = allPayeeTransactions.filter(
          (transaction) => transaction.to || transaction.from === address
        );
        console.log('filterTwo', filterTwo);

        const filteredTransactions = recentTransactions.transfers.filter(
          (transaction) =>
            transaction.to && transaction.from === payeeAddress || address
        );


        setTransactions(filteredTransactions);
        console.log("my address", address)
      console.log('filteredTransactions from payee', filteredTransactions);   
      } */
    };

    fetchRecentTransactions();
  }, [payeeAddress]);


  return (
    <>
      <DrawerHeader>
        <DrawerTitle className='grid grid-cols-3 items-center'>
          <div
            onClick={() => {
              router.back();
            }}
          >
            <BackButton />
          </div>
          <p className='text-center'>
            {payeeAddress && truncateEthAddress(payeeAddress)}
          </p>
          <div className='ml-auto'>
            <Avatar className='h-9 w-9 bg-white'></Avatar>
          </div>
        </DrawerTitle>
      </DrawerHeader>
      <div className='p-4'>
        {transactions.map((transaction, i) => (
          <div key={i} className='grid grid-cols-2 text-xl text-white'>
            <>
              {transaction.to == payeeAddress ? (
                <div>
                  `id: {i}` You Sent {transaction.value} to{' '}
                  {truncateEthAddress(payeeAddress)}
                </div>
              ) : (
                <>
                  <div></div>
                </>
              )}

              {transaction.to !== payeeAddress ? (
                <div>
                  `id: {i}` You Recieved {transaction.value} from{' '}
                  {truncateEthAddress(payeeAddress)}
                </div>
              ) : (
                <>
                  <div> </div>
                </>
              )}
            </>
          </div>
        ))}
      </div>
    </>
  );
}
