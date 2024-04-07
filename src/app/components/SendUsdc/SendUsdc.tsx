'use client';
// Viem
import { encodeFunctionData, parseUnits, erc20Abi, formatUnits } from 'viem';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/GlobalRedux/store';
// Next
import { useSearchParams } from 'next/navigation';

// React
import { useEffect, useState, useRef } from 'react';
import { Button } from '../ui/button';

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

  // redux
  const balanceState = useSelector((state: RootState) => state.balance.value);

  // get search params
  const searchParams = useSearchParams();
  let payee = searchParams.get('payee');

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
        <Button
          disabled={usdcAmount > formatUnits(balanceState, 6) ? true : false}
          className='text-xl'
          size={'lg'}
          variant={'default'}
        >
          <Link
            style={{
              pointerEvents:
                usdcAmount > formatUnits(balanceState, 6) ? 'none' : 'auto',
            }}
            href={{
              pathname: '/confirm',
              query: { payee: payee, amount: usdcAmount },
            }}
          >
            <div className='flex content-center items-center'>
              <div className='text-xl'>
                <div>Send</div>
              </div>
            </div>
          </Link>
        </Button>
      </DrawerFooter>
    </>
  );
}
