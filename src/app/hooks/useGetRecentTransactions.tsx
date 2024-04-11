'use client';

import axios from 'axios';

const useGetRecentTransactions = async (address: string) => {
  if(address) {
    try {
      const response = await axios.get(
        `https://api-sepolia.basescan.org/api?module=account&action=tokentx&contractaddress=0x036CbD53842c5426634e7929541eC2318f3dCF7e&address=${address}&page=1&offset=100&sort=desc&apikey=${process.env.NEXT_PUBLIC_BASESCAN_API_KEY}`
      );

      const data = response.data.result;

      

      console.log('axios transactions request ', data);
      return data;
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error to handle it elsewhere if needed
    }
  }
};

export default useGetRecentTransactions;
