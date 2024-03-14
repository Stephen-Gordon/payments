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
import useGetAddress from '@/app/hooks/useGetAddress';
import { Card, CardContent, CardHeader } from '../ui/card';

export default function RecentPayee(): JSX.Element {
  const [payees, setPayees] = useState<string[]>([]);
  const address: string | undefined = useGetAddress();
  useEffect(() => {
    console.log('hi from recent payee');
    const fetchRecentTransactions = async () => {
      try {
        const recentTransactions = await useGetRecentTransactions(address);
        console.log('recentTransactions in payee', recentTransactions);
        if (recentTransactions) {
          const uniquePayees = Array.from(
            new Set(
              recentTransactions.transfers.map(
                (transaction) => transaction.to || transaction.from
              )
            )
          );
          setPayees(uniquePayees);
        }
      } catch (error) {
        console.error('Error fetching recent transactions:', error);
      }
    };

    fetchRecentTransactions();
  }, []);

  return (
    <>
      {payees.length > 0 ? (
        <>
          <div className='text-sm font-medium leading-none'>
            Recent Transfers
          </div>
          {payees.map((payee) => (
            <div key={payee}>
              <motion.div>
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
      ) : (
        <>
          <Card>
            <CardHeader className='text-sm font-medium leading-none'>
              Recent Transfers
            </CardHeader>
            <CardContent>
              <div className='text-muted-foreground text-sm'>
                No recent transfers
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
}
