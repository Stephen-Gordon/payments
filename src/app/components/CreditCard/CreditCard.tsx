import useGetAddress from '@/app/hooks/useGetAddress';
import Balance from '../Balance/Balance';
import { HoverBorderGradient } from '../ui/hover-border-gradient';
import { TextGenerateEffect } from '../ui/text-generate-effect';
import truncateEthAddress from 'truncate-eth-address';
import { motion } from 'framer-motion';
import { usePrivySmartAccount } from '@zerodev/privy';
import useGetBalance from '@/app/hooks/useGetBalance';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';
import { setBalance } from '@/GlobalRedux/Features/balance/balanceSlice';
import axios from 'axios';
import { formatUnits } from 'viem';
import { Copy } from 'lucide-react';

export default function CreditCard() {
  const [balanceToShow, setBalanceToShow] = useState<string>('');

  const address = useGetAddress();

  const { user } = usePrivySmartAccount();

  const reduxBalance = useSelector((state: any) => state.balance.value);


  const dispatch = useDispatch();



  useEffect(() => {
    axios
      .get(
        `https://api-sepolia.basescan.org/api?module=account&action=tokenbalance&contractaddress=0x036CbD53842c5426634e7929541eC2318f3dCF7e&address=${address}&tag=latest&apikey=${process.env.NEXT_PUBLIC_BASESCAN_API_KEY}`
      )
      .then((r) => {
        console.log('axios balance', r.data);
        setBalanceToShow(r.data.result);

        dispatch(setBalance(r.data.result));
        console.log('balance to show', balanceToShow);
      })
      .catch((e) => {
        console.log('axios balance error', e);
      });
  }, []);

  useEffect(() => {}, [balanceToShow]);

  return (
    <>
      <motion.div
        whileTap={{
          scale: 0.95,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        <HoverBorderGradient
          id='card'
          className='overflow relative grid h-52 w-full rounded-xl shadow-lg'
        >
          <div className='via-background absolute -z-10 h-full  w-full rounded-xl bg-gradient-to-br  from-slate-50/10 to-[#E45368]/40  backdrop-blur-2xl'>
            <></>
          </div>
          <div className='text-card-foreground absolute z-10 grid h-full w-full content-center items-center  justify-center p-2 text-center text-5xl '>
            ${reduxBalance && formatUnits(reduxBalance, 6)}
          </div>
          <div className='sticky z-10 mb-auto flex h-full w-full content-end justify-between p-4'>
            <div className='text-muted-foreground mb-auto grid h-full content-end justify-start text-base'>
              {user?.google?.name}
            </div>
            <div
              onClick={() => navigator.clipboard.writeText(address as string)}
              className='text-muted-foreground mb-auto grid h-full content-end justify-start text-right text-base'
            >
              <div className='flex content-center justify-center'>
                <span>{truncateEthAddress(address as string)}</span>
                <span className='flex content-end'>
                  <Copy className='ml-2 mt-1' width={16} height={16} />
                </span>
              </div>
            </div>
          </div>
        </HoverBorderGradient>
      </motion.div>
    </>
  );
}
