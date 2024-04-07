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
// alchemy
import { AssetTransfersResponse } from 'alchemy-sdk';
// hooks
import useGetAddress from '@/app/hooks/useGetAddress';
// card
import { Card, CardContent, CardHeader } from '../ui/card';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/GlobalRedux/store';
import { Contact } from '@/app/types/types';
import useFindPayeeName from '@/app/hooks/useFindPayeeName';
import { setTransactions } from '@/GlobalRedux/Features/transactions/transactionsSlice';

function Payee({
  payee,
  contactsState,
}: {
  payee: string;
  payees: any;
  contactsState: Contact[];
}) {
  // Find the contact in contactsState array with matching address
  const matchedContact = contactsState.find(
    (contact: Contact) => contact.address === payee
  );

  // If a matching contact is found, use its name, otherwise use truncated payee address
  const payeeName = matchedContact
    ? matchedContact.name
    : truncateEthAddress(payee);

  return (
    <>
      <div key={payee}>
        <Link href={{ pathname: `/payee`, query: { payeeAddress: payee } }}>
          <div className='space-y-8'>
            <div className='flex w-full items-center '>
              <Avatar className='h-9 w-9 bg-white'></Avatar>
              <div className='ml-4 space-y-1'>
                <div className='text-sm font-medium leading-none'>
                  {useFindPayeeName(payee, contactsState)}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default function RecentPayee(): JSX.Element {
  // payees
  const [payees, setPayees] = useState<string[]>([]);
  // users address
  const address: string | undefined = useGetAddress();

  const contactsState = useSelector((state: RootState) => state.contacts.value);

  const transactionstate = useSelector(
    (state: RootState) => state.transactions.value
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const recentTransactions = await useGetRecentTransactions(address);
        dispatch(setTransactions(recentTransactions));
        console.log(
          'axios transactions request in payee page',
          recentTransactions
        );
      } catch (error) {
        console.error('Error while getting recent transactions:', error);
      }
    };

    getData();
  }, []);

  // get recent transactions
  useEffect(() => {
    const uniquePayees = Array.from(
      new Set(
        transactionstate
          .map((transaction) => transaction.to || transaction.from)
          .filter(
            (payee) => payee.toLocaleLowerCase() !== address.toLocaleLowerCase()
          )
      )
    );
    console.log('uniquePayees', uniquePayees);
    console.log('address', address);
    /*   uniquePayees.filter((payee) => payee == address); */
    setPayees(uniquePayees);
    /* const fetchRecentTransactions = async () => {
      try {
        const recentTransactions = await useGetRecentTransactions(address);
        console.log('recentTransactions in payee', recentTransactions);
        if (recentTransactions) {
          const uniquePayees = Array.from(
            new Set(
              recentTransactions.map(
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

    fetchRecentTransactions(); */
  }, [transactionstate, address, contactsState]);

  return (
    <>
      {payees.length > 0 ? (
        <>
          <div className='text-sm font-medium leading-none'>
            Recent Transfers
          </div>
          {payees.map((payee, i) => (
            <Payee key={i} payee={payee} contactsState={contactsState} />
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
