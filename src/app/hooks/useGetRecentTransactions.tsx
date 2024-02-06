'use client';
import useGetAddress from '@/app/hooks/useGetAddress';
import { Alchemy, Network } from 'alchemy-sdk';

const useGetRecentTransactions = async () => {
  try {
    const config = {
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
      network: Network.ETH_SEPOLIA,
    };
    const alchemy = new Alchemy(config);

    console.log('alchemy key', process.env.NEXT_PUBLIC_ALCHEMY_API_KEY);

    const data = await alchemy.core.getAssetTransfers({
      fromBlock: '0x0',
      fromAddress: '0x6b3C5DeBB67505dfD66F3b3b80D1d24DF8DA886D',
      category: ['erc20'],
    });

    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export default useGetRecentTransactions;
