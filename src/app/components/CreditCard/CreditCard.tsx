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
import axios from "axios";
import { formatUnits } from "viem";



export default function CreditCard() {
    

    const [balanceToShow, setBalanceToShow] = useState<string>('')

    const address = useGetAddress();

    const {user } = usePrivySmartAccount()

    const reduxBalance = useSelector((state: any) => state.balance.value)


    
    //const hookBalance = useGetBalance(address as string)

    const dispatch = useDispatch()

/* 
    useEffect(() => {
      console.log('redux balance', reduxBalance)
      console.log('hook balance', hookBalance)
      
      if (hookBalance !== reduxBalance) {
        setBalanceToShow(hookBalance as string)
        dispatch(setBalance(hookBalance as string))
      }
      
    }, [hookBalance, reduxBalance])
 */

    useEffect(() => {
      axios.get(
        `https://api-sepolia.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8&address=${address}&tag=latest&apikey=F7A22CIQFVT5UDPBHKFN8GXYN9EXTS4G65`
      ).then((r) => {
        console.log('axios balance', r.data)
        setBalanceToShow(r.data.result)
                
        dispatch(setBalance(r.data.result));
        console.log('balance to show', balanceToShow);
      }).catch((e) => {
        console.log('axios balance error', e)
      })
    }, [])

    useEffect(() => {
            

    }, [balanceToShow])

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
          <HoverBorderGradient className='relative grid h-52 w-full rounded-xl shadow-lg overflow'>
            <div className='via-background absolute -z-10 h-full  w-full rounded-xl bg-gradient-to-br  from-slate-50/10 to-[#E45368]/40  backdrop-blur-2xl'>
              <></>
            </div>

            <div className='text-card-foreground absolute z-10 grid h-full w-full content-center items-center  justify-center p-2 text-center text-5xl '>
              {reduxBalance && formatUnits(reduxBalance, 6)}
            </div>
            <div className='sticky z-10 mb-auto flex h-full w-full content-end justify-between p-4'>
              <div className='text-muted-foreground mb-auto grid h-full content-end justify-start text-base'>
                {user?.google?.name}
              </div>
              <div className='text-muted-foreground mb-auto grid h-full content-end justify-start text-right text-base'>
                {truncateEthAddress(address as string)}
              </div>
            </div>
          </HoverBorderGradient>
        </motion.div>
      </>
    );
}