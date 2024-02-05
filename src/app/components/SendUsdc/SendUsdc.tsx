'use client';
// Viem
import { encodeFunctionData, parseUnits, erc20Abi } from 'viem';

// Redux
import { useSelector } from 'react-redux';

// Next
import { useSearchParams } from 'next/navigation';

// React
import { useState } from 'react';
import truncateEthAddress from 'truncate-eth-address';

export default function SendUsdc() {
  const [usdcAmount, setUsdcAmount] = useState('10');

  const kernal = useSelector((state: RootState) => state.kernalClient.value);

  // get search params
  const searchParams = useSearchParams();
  let payee = searchParams.get('payee');

  // USDC contract address
  //const usdc = '0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97';
  const usdc = '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8';

  // Encode the data with Viem Function
  // Requires the abi of the contract, the function name, and the arguments address and amount
  const encoded = encodeFunctionData({
    abi: erc20Abi,
    functionName: 'transfer',
    args: [payee as `0x${string}`, parseUnits(usdcAmount, 6)],
  });

  // Send transaction function
  const sendTx = async () => {
    try {
      const txnHash = await kernal.sendTransaction({
        to: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",  // use any address
        value: BigInt(0), // default to 0
        data: "0x",       // default to 0x
      })

      console.log("Txn hash:", txnHash)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='grid p-4 text-white'>
        <input
          value={usdcAmount}
          onChange={(e) => {
            setUsdcAmount(e.target.value);
          }}
          className='mb-4 h-24 w-full rounded-xl bg-black text-center'
          placeholder='100'
        />
        <div className='grid h-24 w-full content-center items-center rounded-xl bg-black  text-center'>
          <p>{truncateEthAddress(payee)}</p>
        </div>
        <button
          className='mt-5 rounded-xl bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
          onClick={() => sendTx()}
        >
          Send USDC
        </button>
      </div>
    </>
  );
}
