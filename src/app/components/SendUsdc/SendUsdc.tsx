'use client';
// Viem
import { encodeFunctionData, parseUnits, erc20Abi, parseEther } from 'viem';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Next
import { useSearchParams } from 'next/navigation';

// Loading
import { RotatingLines } from 'react-loader-spinner';

// React
import { useEffect, useState } from 'react';
import truncateEthAddress from 'truncate-eth-address';
import Success from '@/app/components/Success/Success';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { setSheet } from '@/GlobalRedux/Features/sheet/sheetSlice';

export default function SendUsdc() {
  const [usdcAmount, setUsdcAmount] = useState<string>('1');

  const [transactionStatus, setTransactionStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const kernal = useSelector((state: RootState) => state.kernalClient.value);

  // next router
  const router = useRouter();

  // redux
  const dispatch = useDispatch();

  // get search params
  const searchParams = useSearchParams();
  let payee = searchParams.get('payee');

  // USDC contract address
  //const usdc = '0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97';
  const usdc = '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8';

  useEffect(() => {
    console.log('Kernal', kernal);
  }, [kernal]);

  // Send transaction function
  const sendTx = async () => {
    try {
      // Encode the data with Viem Function
      // Requires the abi of the contract, the function name, and the arguments address and amount
      // @ts-ignore
      const encoded: any = encodeFunctionData({
        // @ts-ignore
        abi: erc20Abi,
        functionName: 'transfer',
        args: [payee as `0x${string}`, parseUnits(usdcAmount, 6)],
      });
      console.log('Sending USDC');
      setLoading(true);
      if (kernal) {
        const txnHash = await kernal.sendTransaction({
          to: usdc, // ERC20 address
          value: BigInt(0), // default to 0
          data: encoded,
        });

        console.log('Txn hash:', txnHash);

        if (txnHash) {
          setLoading(false);
          setTransactionStatus(true);
          setTimeout(() => {
            dispatch(setSheet(false));
            router.push(`/transaction?hash=${txnHash}`);
          }, 3000);
        }
      }
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
          <p>{payee && truncateEthAddress(payee)}</p>
        </div>
        <button
          className='mt-5 rounded-xl bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
          onClick={() => sendTx()}
        >
          Send USDC
        </button>
      </div>
      {transactionStatus ||
        (loading && (
          <>
            <Success transactionStatus={transactionStatus} loading={loading} />
          </>
        ))}
      <button
        onClick={() => {
          dispatch(setSheet(false));
          router.push('/home');
        }}
      >
        close
      </button>
    </>
  );
}
