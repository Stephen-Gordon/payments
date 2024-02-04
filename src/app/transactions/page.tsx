'use client';
// react
import { useEffect, useState } from "react"
// hooks
import useGetRecentTransactions from "@/app/hooks/useGetRecentTransactions";
import RecentTransaction from "@/app/components/RecentTransaction/RecentTransaction";


export default function Page() {

  const [transactions, setTransactions] = useState<any>([])


  useEffect(() => {

    const getData = async () => {
      try {
        const recentTransactions = await useGetRecentTransactions();

        setTransactions(recentTransactions?.transfers);
      } catch (error) {
        console.error("Error while getting recent transactions:", error);
      }
    };

    getData();
  }, []);

  return (
    <div className="p-4">
      <h1>Transactions</h1>
      <div className="mt-4">
        {transactions && transactions.map((transaction: any, i: any) => (
          <div key={i}>
            <RecentTransaction transaction={transaction} />
          </div>


        ))}
      </div>
    </div>
  )
}