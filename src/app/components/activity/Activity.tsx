'use client'
import useGetAddress from "@/app/hooks/useGetAddress";
import useGetRecentTransactions from "@/app/hooks/useGetRecentTransactions";
import { useEffect, useState } from "react";

export default function Activity() {
  const [transactions, setTransactions] = useState(null);
  const address = useGetAddress();

  useEffect(() => {

    const getData = async () => {
      try {
        const recentTransactions = await useGetRecentTransactions();

        setTransactions(recentTransactions);
      } catch (error) {
        console.error("Error while getting recent transactions:", error);
      }
    };

    getData();
  }, [address]); // Add address as a dependency if it's used inside useGetRecentTransactions

  useEffect(() => {
    if (transactions) {
      console.log("transactions", transactions);
    }
  }, [transactions]); // Add transactions as a dependency

  return (
    <>
      <div className='h-96 bg-paper rounded-xl w-full text-xl p-4'>
        <div>
          Recent
        </div>
        {/* Uncomment this section to render transactions when available */}
        <div className="mt-4">
          {/*    {transactions && transactions.map((t, i) => (
            <div key={i}>
              {i} hello
            </div>
          ))} */}
        </div>
      </div>
    </>
  );
}
