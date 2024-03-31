'use client';
// next
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// components
import Balance from '../components/Balance/Balance';
import Activity from '@/app/components/activity/Activity';

import { Button } from '@/app/components/ui/button';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { setSheet } from '@/GlobalRedux/Features/sheet/sheetSlice';

// react
import { useEffect } from 'react';

// icon
import { Send, QrCode } from 'lucide-react';

// privy
import { usePrivySmartAccount } from '@zerodev/privy';

// lucide
import { Menu } from 'lucide-react';

import { usePathname } from 'next/navigation';
//components

import { BackgroundGradientAnimation } from '../components/ui/background-gradient-animation';
import useGetAddress from '../hooks/useGetAddress';

import { motion, useScroll, useTransform } from 'framer-motion';

import useGetTokenBalance from '../hooks/useGetTokenBalance';
import AuthPage from '../components/AuthPage/AuthPage';
import CreditCard from '../components/CreditCard/CreditCard';
import PullToRefresh from 'pulltorefreshjs';


export default function Page() {
  
  
  

  // privy
  const { user, zeroDevReady, sendTransaction } = usePrivySmartAccount();

  // next
  const router = useRouter();

  let { scrollYProgress } = useScroll();
  let y = useTransform(scrollYProgress, [0, 1], ['0', '-10%']);
  let opacity = useTransform(scrollYProgress, [0.5, 1], [1, 0.5]);
  let scale = useTransform(scrollYProgress, [0, 1], ['100%', '90%']);

  useEffect(() => {
    console.log('user', user);
    console.log('zeroDevReady', zeroDevReady);
    
    if(zeroDevReady) {
      PullToRefresh.init({
        mainElement: '#card',
        triggerElement: '#card',
        instructionsReleaseToRefresh : ' ',

        onRefresh() {
          window.location.reload();
        },
      });
    }
  }, [zeroDevReady]);

  // next
  const pathname = usePathname();

  

  // pathname use effect
  /* useEffect(() => {
    if (pathname == '/home') {
      dispatch(setSheet(false));
    }
    console.log(`Route changed to: ${pathname}`);
    console.log("MY ADDRESS IS", address)
  }, [pathname]);
 */



 /*  useEffect(() => {
    dispatch(
      setContacts([
        {
          name: 'John Doe',
          address: '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8',
        },
        {
          name: 'Jim Harris',
          address: '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C9',
        },
        {
          name: 'Ben Frank',
          address: '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C7',
        },
      ])
    );
  },[]) */

  // redux
  const dispatch = useDispatch();

  // hooks
  const address = useGetAddress();
  const usdcBalance = useGetTokenBalance(address as string) 
  console.log('usdcBalance', usdcBalance);
  return (
    <AuthPage>
      <main className='relative bg-background  overflow-y-auto h-full'>
       
        <div>
         {/*  <div className='absolute -z-50 '>
            <BackgroundGradientAnimation />
          </div>   */}
          <motion.div
           /*  style={{ y, scale, opacity }} */
            className='items-center p-2 text-center text-5xl'
          >
            {/*  <Balance />  */}
            {/*   {address} */}
            <CreditCard />
          </motion.div>

          <motion.div
           /*  style={{ y, scale, opacity }} */
            className='mt-4 grid grid-cols-2 gap-2 p-2'
          >
            <div>
              <Link
                onClick={() => {
                  dispatch(setSheet(true));
                }}
                href={{
                  pathname: '/search',
                }}
              >
                <Button className='text-xl' size={'lg'} variant={'default'}>
                  <div className='flex grid-cols-3 content-center items-center'>
                    <div className='text-xl'>
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
            

            <div>
              <Link
                onClick={() => {
                  dispatch(setSheet(true));
                }}
                href={{
                  pathname: '/receive',
                }}
              >
                <Button className='text-xl' size={'lg'} variant={'default'}>
                  <div className='flex grid-cols-3 content-center items-center'>
                    <div className='text-xl'>
                      <div>Receive</div>
                    </div>
                    <div className='px-2'></div>
                    <div>
                      <QrCode size={22} />
                    </div>
                  </div>
                </Button>
              </Link>
            </div>
          </motion.div>
          <div className='mt-4 p-2 pb-32 '>
            
         

            <Activity />
          </div>
        </div>
      </main>
    </AuthPage>
  );
}
