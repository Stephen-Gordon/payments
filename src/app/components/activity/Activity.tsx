'use client'
import RecentTransaction from "@/app/components/RecentTransaction/RecentTransaction";
import useGetAddress from "@/app/hooks/useGetAddress";
import useGetRecentTransactions from "@/app/hooks/useGetRecentTransactions";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTransactions } from "@/GlobalRedux/Features/transactions/transactionsSlice";

export default function Activity() {
  const [transactions, setTxs] = useState<any>([])
  const address = "0xc8C26Ab40fe4723519fE66B8dBb625FC070A982c"

  const dispatch = useDispatch();

  useEffect(() => {

    const getData = async () => {
      try {
        const recentTransactions = await useGetRecentTransactions();

        setTxs(recentTransactions?.transfers.slice(0, 3));
      } catch (error) {
        console.error("Error while getting recent transactions:", error);
      }
    };

    getData();
  }, []); // Add address as a dependency if it's used inside useGetRecentTransactions

  useEffect(() => {
    if (transactions) {
      console.log("transactions console", transactions[0]);
    }
    dispatch(setTransactions(transactions));
  }, [transactions]); // Add transactions as a dependency

  return (
    <>
      <div className='bg-paper-one rounded-xl w-full text-xl p-4'>
        <div>
          Recent
        </div>

        <div className="mt-4">
          {transactions && transactions.map((transaction: any, i: any) => (
            <div key={i}>
              <RecentTransaction transaction={transaction} />
            </div>
          ))}
          <div className="text-purple text-center">
            <Link href={{
              pathname: '/transactions',
            }}>
              See all
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
