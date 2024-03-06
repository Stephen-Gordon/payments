import useGetRecentTransactions from '@/app/hooks/useGetRecentTransactions';

// react
import { useEffect, useState } from 'react';
// framer motion
import { motion } from 'framer-motion';

// next
import Link from 'next/link';

// eth address
import truncateEthAddress from 'truncate-eth-address';
// components
import { Avatar } from '@/app/components/ui/avatar';
import { AssetTransfersResponse } from 'alchemy-sdk';

export default function RecentPayee(): JSX.Element {
  const [payees, setPayees] = useState<string[]>([]);

  useEffect(() => {
    const fetchRecentTransactions = async () => {
      const recentTransactions = await useGetRecentTransactions();
      console.log('recentTransactions', recentTransactions);

      

      if (recentTransactions) {
        const uniquePayees = recentTransactions.transfers
          .map((transaction) => transaction.to || transaction.from)
          .filter((value, index, self) => self.indexOf(value) === index);

        setPayees(uniquePayees);
        console.log("uniquePayees", uniquePayees)
      }
      
    };

    fetchRecentTransactions();
  }, []);

  return (
    <>
      {payees.map((payee) => (
        <div key={payee}>
          <motion.div layoutId={payee}>
            <Link
              href={{ pathname: `/payee`, query: { payeeAddress: payee } }}
            >
              <div className='space-y-8'>
                <div className='flex w-full items-center '>
                  <Avatar className='h-9 w-9 bg-white'></Avatar>
                  <div className='ml-4 space-y-1'>
                    <motion.div
                      layoutId={`${payee}`}
                      className='text-sm font-medium leading-none'
                    >
                      {truncateEthAddress(payee)}
                    </motion.div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      ))}
    </>
  );
}
