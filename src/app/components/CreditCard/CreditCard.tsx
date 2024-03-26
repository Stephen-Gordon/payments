import useGetAddress from "@/app/hooks/useGetAddress";
import Balance from "../Balance/Balance";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import truncateEthAddress from "truncate-eth-address";
import { motion } from "framer-motion";
import { usePrivySmartAccount } from "@zerodev/privy";
import useGetBalance from "@/app/hooks/useGetBalance";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { setBalance } from "@/GlobalRedux/Features/balance/balanceSlice";

export default function CreditCard() {
    

    const [balanceToShow, setBalanceToShow] = useState<string>('')

    const address = useGetAddress();

    const {user } = usePrivySmartAccount()

    const reduxBalance = useSelector((state: any) => state.balance.value)


    
    const hookBalance = useGetBalance(address as string)

    const dispatch = useDispatch()


    useEffect(() => {
      console.log('redux balance', reduxBalance)
      setBalanceToShow(reduxBalance)
      if (hookBalance !== reduxBalance) {
        setBalanceToShow(hookBalance)
        dispatch(setBalance(hookBalance))
      }
    }, [hookBalance, reduxBalance])



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
          <HoverBorderGradient className='relative grid h-52 w-full rounded-xl shadow-lg'>
            <div className='absolute -z-50 h-full w-full rounded-xl bg-transparent bg-gradient-to-br from-slate-50/10 backdrop-blur-xl'>
              <></>
            </div>

            <div className='text-card-foreground absolute z-50 grid h-full w-full content-center items-center  justify-center p-2 text-center text-5xl mix-blend-exclusion '>
              {balanceToShow}
            </div>
            <div className='absolute z-50 mb-auto flex h-full w-full content-end justify-between p-4'>
              <div className='text-muted-foreground mb-auto grid h-full content-end justify-start text-base mix-blend-exclusion'>
                {user?.google?.name}
              </div>
              <div className='text-muted-foreground mb-auto grid h-full content-end justify-start text-right text-base mix-blend-exclusion'>
                {truncateEthAddress(address as string)}
              </div>
            </div>
          </HoverBorderGradient>
        </motion.div>
      </>
    );
}