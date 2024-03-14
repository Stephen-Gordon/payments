'use client';
// Viem
import { encodeFunctionData, parseUnits, erc20Abi } from 'viem';

// Redux
import { useDispatch } from 'react-redux';

// Next
import { useSearchParams } from 'next/navigation';

// React
import { useEffect, useState, useRef } from 'react';
import truncateEthAddress from 'truncate-eth-address';
import Success from '@/app/components/Success/Success';
import { useRouter } from 'next/navigation';

import { setSheet } from '@/GlobalRedux/Features/sheet/sheetSlice';

import { Input } from '../ui/input';
import { Button } from '../ui/button';

import { Send } from 'lucide-react';

// privy
import { usePrivySmartAccount } from '@zerodev/privy';
import KeyPad from '../KeyPad/KeyPad';
import Link from 'next/link';

export default function SendUsdc() {
  // privy
  const { zeroDevReady, user, sendTransaction } = usePrivySmartAccount();

  const [usdcAmount, setUsdcAmount] = useState<string>('1');

  const [transactionStatus, setTransactionStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // ref
  const inputRef: any = useRef(null);

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
    //inputRef.current.focus();
    console.log('USDC amount', usdcAmount);
    if (zeroDevReady) {
      console.log('ready to send');
    } else {
      console.log('not ready to send');
    }
  }, [usdcAmount]);

  // Send transaction function
  const sendTx = async () => {
    try {
      // Encode the data with Viem Function
      // Requires the abi of the contract, the function name, and the arguments address and amount
      // @ts-ignore
      if (!zeroDevReady) {
        console.log('not ready to send');
        return;
      }
      if (usdcAmount == '' || usdcAmount == '0') {
        console.log('amount is 0');
        return;
      }
      const encoded: any = encodeFunctionData({
        // @ts-ignore
        abi: erc20Abi,
        functionName: 'transfer',
        args: [payee as `0x${string}`, parseUnits(usdcAmount, 6)],
      });
      console.log('Sending USDC');
      setLoading(true);
      const txnHash = await sendTransaction({
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
          const balance = router.push('/home');
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='grid content-start justify-center p-4 text-white'>
        <KeyPad usdcAmount={usdcAmount} setUsdcAmount={setUsdcAmount} />
        <Link
          href={{
            pathname: '/confirm',
            query: { payee: payee, amount: usdcAmount },
          }}
        >
          <Button
            disabled={
              usdcAmount == '0' || usdcAmount == '' || usdcAmount == '.'
            }
            className={`mt-4 h-12 text-3xl font-bold`}
            /* onClick={() => sendTx()} */
          >
            <div className='flex grid-cols-3 content-center items-center'>
              <div className=''>
                <div>Send</div>
              </div>
              <div className='px-2'></div>
              <div>
                <Send size={20} />
              </div>
            </div>
          </Button>
        </Link>
      </div>

      {transactionStatus ||
        (loading && (
          <>
            <Success transactionStatus={transactionStatus} loading={loading} />
          </>
        ))}
    </>
  );
}
