// Wagmi
import { erc20ABI, useWaitForTransaction } from 'wagmi';

// ZeroDev
import {
  usePrepareSendUserOperation,
  useSendUserOperation,
} from '@zerodev/wagmi';

// Viem
import { encodeFunctionData, parseUnits } from 'viem';
import { useRouter } from 'next/router';

export default async async function SendUsdc() {
  const router = useRouter();

  const { payee } = router.query;

  // USDC contract address
  const usdc = '0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97';

  // Encode the data with Viem Function
  // Requires the abi of the contract, the function name, and the arguments address and amount
  const encoded = encodeFunctionData({
    abi: erc20ABI,
    functionName: 'transfer',
    args: [payee as `0x${string}`, parseUnits('1', 6)],
  });

  const userOpHash = kernelClient.sendUserOperation({
    userOperation: {
      callData: await kernelClient.account.encodeCallData({
        to: contractAddress,
        value: BigInt(0),
        data: encodeFunctionData({
          abi: contractABI,
          functionName: 'mint',
          args: [accountAddress],
        }),
      }),
    },
  });

  // Send transaction function
  const sendTx = async () => {
    try {
      // check if the operation exists
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
      onClick={() => sendTx()}
    >
      Send USDC to {payee}
    </button>
  );
}
