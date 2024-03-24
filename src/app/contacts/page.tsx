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
// react
import { useEffect, useState } from 'react';
// framer motion
import { motion } from 'framer-motion';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/GlobalRedux/store';
// hooks
import useGetAddress from '@/app/hooks/useGetAddress';
import {
  CardTitle,
  CardHeader,
  Card,
  CardContent,
} from '@/app/components/ui/card';
import { Avatar } from '../components/ui/avatar';

// next
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { Contact } from '@/app/types/types';

export default function Page() {
  //next
  const searchParams = useSearchParams();
  let isNavOpen = searchParams.get('isNavOpen');

  const dispatch = useDispatch();

  // address
  const address = useGetAddress();

  const contactsState = useSelector((state: RootState) => state.contacts.value);



  return (
    <>
      <Drawer  shouldScaleBackground={true} open={isNavOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Contacts</DrawerTitle>
          </DrawerHeader>
          <Card style={{ border: '0px' }}>
            
            <CardContent className='border-0 border-none'>
              
              {contactsState.map((contact, index) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                    <Link
                      href={{
                        pathname: `/payee`,
                        query: { payeeAddress: contact.address },
                      }}
                    >
                      <div className='space-y-8'>
                        <div className='flex w-full items-center '>
                          <Avatar className='h-9 w-9 bg-white'></Avatar>
                          <div className='ml-4 space-y-1'>
                            <div className='text-sm font-medium leading-none'>
                              {contact.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </DrawerContent>
      </Drawer>
    </>
  );
}
