'use client';
import useGetAddress from '@/app/hooks/useGetAddress';
import { Alchemy, Network } from 'alchemy-sdk';

const useGetRecentTransactions = async () => {
  const address = useGetAddress();
  try {
    const config = {
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
      network: Network.ETH_SEPOLIA,
    };
    const alchemy = new Alchemy(config);

    const data = await alchemy.core.getAssetTransfers({
      fromBlock: '0x0',
      fromAddress: address,
      category: ['erc20'],
      withMetadata: true,
    });
    data.transfers.reverse();

    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export default useGetRecentTransactions;
