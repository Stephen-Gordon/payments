'use client';
import { Alchemy, Network } from 'alchemy-sdk';

const useGetTokenBalance = async (ownerAddress: string) => {
  try {
    const config = {
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
      network: Network.BASE_SEPOLIA,
    };
    const alchemy = new Alchemy(config);

    const tokenContractAddresses = [
      '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
    ];
    console.log(
      'ownerAddress',
      ownerAddress,
      'tokenContractAddresses',
      tokenContractAddresses
    );

    const data = await alchemy.core.getTokenBalances(
      ownerAddress,
      tokenContractAddresses
    );

    /* console.log('Token balance for Address');
    console.log(data); */

    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export default useGetTokenBalance;
