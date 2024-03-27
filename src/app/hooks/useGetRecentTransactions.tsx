/* 'use client';
import useGetAddress from '@/app/hooks/useGetAddress';
import { Alchemy, Network } from 'alchemy-sdk';

import Moralis from 'moralis';


const useGetRecentTransactions = async (address: string) => {
  try {
    await Moralis.start({
      apiKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjY4NTRjOTU5LTk5NGEtNGYwZC04MjA0LTA4YWM2MmE3Y2EwOSIsIm9yZ0lkIjoiMzc2ODcxIiwidXNlcklkIjoiMzg3Mjg5IiwidHlwZUlkIjoiMTQxNjQyOTUtNzg4MS00Yzk2LTkxM2ItNTQ5YjBiZjU2M2FkIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDc3NDAwOTgsImV4cCI6NDg2MzUwMDA5OH0.GrOEC01ujomn_3cVNZKKxCkd5QVP52i5I3HsFxSp23Q',
    });

    const response = await Moralis.EvmApi.token.getWalletTokenTransfers({
      chain: '0xaa36a7',
      order: 'DESC',
      address: address,
    });

    console.log('moralis data in hook', response.raw);
    return response.raw.result;
  } catch (e) {
    console.error(e);
  }
};

export default useGetRecentTransactions;
 */

'use client';

import axios from 'axios';


const useGetRecentTransactions = async (address: string) => {
  try {
    
    
    const data = await axios.get(
      `https://api-sepolia.etherscan.io/api?module=account&action=tokentx&contractaddress=0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8&address=${address}&page=1&offset=100&sort=desc&apikey=F7A22CIQFVT5UDPBHKFN8GXYN9EXTS4G65`
    ).then((res) => {
      console.log('axios res', res.data);
      return res.data.result;
    });
    
    console.log('axios ', data);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export default useGetRecentTransactions;
