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
    const data = await axios
      .get(
        `https://api-sepolia.basescan.org/api?module=account&action=tokentx&contractaddress=0x036CbD53842c5426634e7929541eC2318f3dCF7e&address=${address}&page=1&offset=100&sort=desc&apikey=6VRQH98BTKVZYXU68YJYWVX3EC2ZP6UEFV`
      )
      .then((res) => {
        console.log('axios transactions request ', res.data);
        return res.data.result;
      });

    console.log('axios ', data);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export default useGetRecentTransactions;
