'use client';
import useGetAddress from '@/app/hooks/useGetAddress';
import { Alchemy, Network } from 'alchemy-sdk';

const useGetRecentTransactions = async (address: string) => {
  try {
    const config = {
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
      network: Network.ETH_SEPOLIA,
    };
    const alchemy = new Alchemy(config);
    console.log('about to get txs for address', address);
    const data = await alchemy.core.getAssetTransfers({
      fromBlock: '0x0',
      fromAddress: address,
      category: ['erc20'],
      withMetadata: true,
    });
    data.transfers.reverse();
    console.log('data in hook', data);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export default useGetRecentTransactions;
