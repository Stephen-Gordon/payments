import { useState, useEffect } from 'react';
import { encodeFunctionData, parseUnits, erc20Abi } from 'viem';
import { usePrivySmartAccount } from '@zerodev/privy';

const useSendUsdc = () => {
  const { zeroDevReady, user, sendTransaction } = usePrivySmartAccount();
  const [transactionStatus, setTransactionStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string>('');

  const sendUsdc = async (amount: string, payee: string) => {
    try {
      if (!zeroDevReady || amount == '' || amount == '0') {
        return;
      }

      const encoded = encodeFunctionData({
        abi: erc20Abi,
        functionName: 'transfer',
        args: [payee as `0x${string}`, parseUnits(amount, 6)],
      });

      setLoading(true);
      const txnHash = await sendTransaction({
        to: '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8', // USDC contract address
        value: BigInt(0),
        data: encoded,
      });

      if (txnHash) {
        setLoading(false);
        setTransactionStatus(true);
        setTransactionHash(txnHash);
        console.log('Transaction Hash:', txnHash);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { sendUsdc, transactionStatus, loading, transactionHash };
};

export default useSendUsdc;
