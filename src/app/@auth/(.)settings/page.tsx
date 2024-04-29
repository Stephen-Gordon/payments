'use client';

import { Button } from '@/app/components/ui/button';

import SendNotification from '@/app/components/SendNotification/SendNotification';

import { useLogout } from '@privy-io/react-auth';

// next
import { useRouter } from 'next/navigation';

import {motion }from 'framer-motion';
import { usePrivySmartAccount } from '@zerodev/privy';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';

export default function Page() {

 // const { logout } = usePrivySmartAccount()
   const { user } = usePrivySmartAccount();


 const router = useRouter();


  const { logout } = useLogout({
    onSuccess: () => {
      router.push('/login');
      localStorage.clear();
    },
  });

  return (
    <>
      <motion.div className='grid space-y-6 p-4'>
        <p className='text-xl'> {user?.google?.name}</p>
{/*         <p className='text-base text-wrap'> {user?.wallet?.address}</p>
 */}
        <SendNotification />
        <Card className='grid'>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              <p>Control your account settings </p>
            </CardDescription>
          </CardHeader>
          <CardContent className=' space-y-6'>

            <Button
              className='bg-red-500'
              onClick={() => {
                localStorage.clear();
              }}
            >
              Clear Local Storage
            </Button>

            <Button
              className='bg-red-500'
              onClick={() => {
                logout();
              }}
            >
              Log out
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
