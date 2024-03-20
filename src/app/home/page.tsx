'use client';
// next
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// components
import Balance from '../components/Balance/Balance';
import Activity from '@/app/components/activity/Activity';

import { Button } from '@/app/components/ui/button';

// redux
import { useDispatch } from 'react-redux';
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
    console.log('hi');
    console.log('user', user);
    console.log('zeroDevReady', zeroDevReady);
  }, [zeroDevReady]);

  // next
  const pathname = usePathname();

  // pathname use effect
  useEffect(() => {
    if (pathname === '/home') {
      dispatch(setSheet(false));
    }
    console.log(`Route changed to: ${pathname}`);
  }, [pathname]);

  // redux
  const dispatch = useDispatch();

  // hooks
  const address = useGetAddress();

  return (
    <div id='render' className='min-h-[150vh]'>
      <div className='absolute right-4 top-4'>
        <Link
          /*   onClick={() => {
            dispatch(setSheet(true));
          }}  */ href={{
            pathname: '/menu',
            query: { isNavOpen: true },
          }}
        >
          <Menu onClick={() => router.push(`/menu?isNavOpen=true`)} />
        </Link>
      </div>
      <div className='blurios'>
        <div className='absolute -z-50 '>
          <BackgroundGradientAnimation />
        </div>
        <motion.div
          style={{ y, scale, opacity }}
          className='items-center p-2  pt-40 text-center text-5xl mix-blend-exclusion'
        >
         {/*  <Balance /> */}
          {/*   {address} */}
        </motion.div>

        <motion.div
          style={{ y, scale, opacity }}
          className='mt-10 grid grid-cols-2 gap-2 p-2'
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
        <div className='bg-accent/90 relative mt-4 w-full rounded-t-3xl bg-opacity-10 bg-clip-padding p-4 backdrop-blur-sm backdrop-filter'>
          {/*  <Tab.Group>
            <Tab.List>
              <div className='mb-4 flex justify-between'>
                <Tab>
                  <div className='text-lg text-gray-300'>Account</div>
                </Tab>
                <Tab>
                  <div className='text-lg text-gray-300'>Activity</div>
                </Tab>
              </div>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <Activity />
              </Tab.Panel>
              <Tab.Panel>Content 2</Tab.Panel>
            </Tab.Panels>
          </Tab.Group> */}

          {/*   <div className='mb-4 flex justify-between'>
                
                  <div className='text-lg'>Activity</div>
               
              </div>  */}

          <Activity />
        </div>
      </div>
    </div>
  );
}
