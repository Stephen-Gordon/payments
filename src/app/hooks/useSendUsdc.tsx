// react
import { useState} from 'react';
// viem
import { encodeFunctionData, parseUnits, erc20Abi } from 'viem';
// privy
import { usePrivySmartAccount } from '@zerodev/privy';

const useSendUsdc = () => {
  const { zeroDevReady, sendTransaction } = usePrivySmartAccount();
  const [transactionStatus, setTransactionStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string>('');

  const sendUsdc = async (amount: string, payee: string) => {
    try {
      if (!zeroDevReady || amount == '' || amount == '0') {
        return;
      }
      console.log('ready to send');
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
        console.log('txnHash in hook', txnHash);
        setLoading(false);
        setTransactionStatus(true);
        setTransactionHash(txnHash);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { sendUsdc, transactionStatus, loading, transactionHash };
};

export default useSendUsdc;
