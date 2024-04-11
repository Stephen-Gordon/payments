'use client';

import axios from 'axios';

const useGetRecentTransactions = async (address: string) => {
  try {
    const data = await axios
      .get(
        `https://api-sepolia.basescan.org/api?module=account&action=tokentx&contractaddress=0x036CbD53842c5426634e7929541eC2318f3dCF7e&address=${address}&page=1&offset=100&sort=desc&apikey=${process.env.NEXT_PUBLIC_BASESCAN_API_KEY}`
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
