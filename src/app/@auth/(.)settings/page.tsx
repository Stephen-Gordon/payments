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

  return (
    <>
      <SendNotification />
    </>
  );
}
