'use client'
import useGetAddress from '@/app/hooks/useGetAddress';
import { Alchemy, Network } from 'alchemy-sdk';

const useGetRecentTransactions = async () => {
  try {

    const config = {
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
      network: Network.MATIC_MUMBAI,
    };
    const alchemy = new Alchemy(config);

    const data = await alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      fromAddress: "0xc8C26Ab40fe4723519fE66B8dBb625FC070A982c",
      category: ["erc20"],
    });


    return data;
  } catch (error) {
    console.log("error", error);
  }

}

export default useGetRecentTransactions;
