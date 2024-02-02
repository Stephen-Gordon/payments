'use client'
import useGetAddress from "@/app/hooks/useGetAddress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import truncateEthAddress from "truncate-eth-address";

export default function RecentTransaction({ transaction }: any) {


  const address = useGetAddress();



  return (
    <Link href={{ pathname: '/transaction', query: { hash: transaction.hash } }}>
      <div className="flex mb-4 content-center justify-between">
        <div className="flex items-center">
          <div className="relative grid items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full ">
              {/* Circle */}
            </div>
            <div className="absolute top-5 left-6">
              <div className="w-7 h-7 bg-purple rounded-full flex items-center content-center justify-center ">

                {transaction.from == address ? <ArrowLeft className="w-6 h-6" /> : <ArrowRight className="w-6 h-6" />}
              </div>
            </div>
          </div>
          <div className="ml-2">
            {transaction.from == address ? "From" : ""} {truncateEthAddress(transaction.from)}
          </div>
        </div>
        <div className="flex">
          {transaction.from == address ? "+$" : "-$"}

          {transaction.value}
        </div>

        {/*  {transaction.blockNum} */}


      </div>
    </Link>
  )
}