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
import { DrawerFooter } from '../ui/drawer';

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

  

  return (
    <>
      <div className='grid content-start justify-center p-4 text-white'>
        <KeyPad usdcAmount={usdcAmount} setUsdcAmount={setUsdcAmount} />
      </div>
      <DrawerFooter>
        <Link
          href={{
            pathname: '/confirm',
            query: { payee: payee, amount: usdcAmount },
          }}
        >
          <Button className='text-xl' size={'lg'} variant={'default'}>
            <div className='flex content-center items-center'>
              <div className='text-xl'>
                <div>Send</div>
              </div>
            </div>
          </Button>
        </Link>
      </DrawerFooter>
    </>
  );
}
