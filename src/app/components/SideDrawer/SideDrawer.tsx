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
export default function Page() {
  return (
    <>
      <Drawer>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <SendNotification />

          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
