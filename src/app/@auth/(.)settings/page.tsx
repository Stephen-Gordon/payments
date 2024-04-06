'use client';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/app/components/ui/drawer';
import { Button } from '@/app/components/ui/button';

import SendNotification from '@/app/components/SendNotification/SendNotification';

import { useLogout } from '@privy-io/react-auth';

// next
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { usePrivySmartAccount } from '@zerodev/privy';

export default function Page() {

 // const { logout } = usePrivySmartAccount()

 const router = useRouter();


  const { logout } = useLogout({
    onSuccess: () => {
      console.log('User logged out');
      router.push('/login');
      localStorage.clear();
      // Any logic you'd like to execute after a user successfully logs out
    },
  });

  return (
    <>
      <div className='grid space-y-6 p-4'>
        <SendNotification />
        <Button
          variant={'destructive'}
          onClick={() => {
            logout();
          }}
        >
          Log out
        </Button>
        <Button
          variant={'destructive'}
          onClick={() => {
            localStorage.clear();
          }}
        >
          Clear Local Storage
        </Button>
      </div>
    </>
  );
}
