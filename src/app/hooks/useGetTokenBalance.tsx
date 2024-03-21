'use client';
import { Alchemy, Network } from 'alchemy-sdk';

const useGetTokenBalance = async (ownerAddress: string) => {
  try {
    const config = {
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
      network: Network.ETH_SEPOLIA,
    };
    const alchemy = new Alchemy(config);

    const tokenContractAddresses = ['0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8'];
    console.log('ownerAddress', ownerAddress, "tokenContractAddresses", tokenContractAddresses);

        
    const data = await alchemy.core.getTokenBalances(
      ownerAddress,
      tokenContractAddresses
    );
            
    console.log('Token balance for Address');
    console.log(data);
        
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export default useGetTokenBalance;
