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
import useCreateKernal from '@/app/utils/useCreateKernal';
import secureLocalStorage from 'react-secure-storage';

// Import restapi for function calls
import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';
// Ethers or Viem, both are supported
import { ethers } from 'ethers';
import { ENV } from '@pushprotocol/restapi/src/lib/constants';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
export default function SendUsdc() {
  const [usdcAmount, setUsdcAmount] = useState<string>('1');

  const [transactionStatus, setTransactionStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [kernal, setKernal] = useState<any>(null);

  /* const kernal = useSelector((state: RootState) => state.kernalClient.value); */

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
    const setUp = async () => {
      try {
        const getKernal = await useCreateKernal({
          name: 'local',
          value: secureLocalStorage.getItem('pk'),
        });

        setKernal(getKernal);
      } catch (error) {
        console.log(error);
      }
    };
    setUp();
  }, []);

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
            /* router.push(`/transaction?hash=${txnHash}`); */
            router.push('/home');
          }, 1000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='grid p-4 text-white'>
        <div className='w-full items-center'>
          <Input
            className='focus-visible:ring-ring w-full border-0 text-center text-5xl focus-visible:outline-none focus-visible:ring-0 '
            placeholder='$0'
            type='text'
            pattern='\d+((\.|,)\d+)?'
            onChange={(val) => {
              setUsdcAmount(
                val.target.value.replace(/[^0-9.,]/g, '').replace(/,/g, '.')
              );
            }}
          />
        </div>
        {/* <input
          value={usdcAmount}
          onChange={(e) => {
            setUsdcAmount(e.target.value);
          }}
          className='bg-paper-one mb-4 h-24 w-full rounded-xl text-center'
          placeholder='100'
        />
        <div className='bg-paper-one grid h-24 w-full content-center items-center rounded-xl  text-center'>
          <p>{payee && truncateEthAddress(payee)}</p>
        </div> */}
        {/* <button
          className='mt-5 rounded-xl bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
          onClick={() => sendTx()}
        >
          Send USDC
        </button> */}
        <Button onClick={() => sendTx()}>Send</Button>
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
