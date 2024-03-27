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

// next
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();

  let isNavOpen = searchParams.get('isNavOpen');
  const router = useRouter();

  return (
    <>
      <Drawer shouldScaleBackground={true} open={isNavOpen}>
        <DrawerContent className='ios'>
          <SendNotification />
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose
              onClick={() => {
                router.back();
              }}
            >
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
