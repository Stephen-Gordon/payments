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
import { Avatar } from '@/app/components/ui/avatar';

// next
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { Contact } from '@/app/types/types';
import { User2 } from 'lucide-react';

import { Button } from '@/app/components/ui/button';
import AddAContact from '@/app/components/addAContact/addAContact';
import { TextGenerateEffect } from '@/app/components/ui/text-generate-effect';

export default function Page() {

  // state
  const [showAddContact, setShowAddContact] = useState<boolean>(false);
  const [payee, setPayee] = useState<Contact | null>(null);


  //next
  const searchParams = useSearchParams();
  let isNavOpen = searchParams.get('isNavOpen');

  const dispatch = useDispatch();

  // address
  const address = useGetAddress();

  const contactsState = useSelector((state: RootState) => state.contacts.value);

  const handleContactsClick = () => {
    setShowAddContact(true);
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <DrawerHeader>
          <DrawerTitle>
            <TextGenerateEffect words='Contacts'></TextGenerateEffect>
          </DrawerTitle>
        </DrawerHeader>
        <Card className='bg-transparent' style={{ border: '0px' }}>
          <CardContent className='border-0 border-none bg-transparent'>
            <div className='space-y-6'>
              {contactsState.length > 0 ? (
                <>
                  {contactsState.map((contact, index) => (
                    <motion.div
                      key={contact.address}
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
                        <div className='flex w-full items-center '>
                          <div className='flex items-center justify-center'>
                            <Avatar className='flex h-9 w-9 items-center justify-center bg-white'>
                              <span className='text-black'>{contact.name.charAt(0)}</span>
                            </Avatar>
                          </div>

                          <div className='ml-4 space-y-1'>
                            <div className='text-sm font-medium leading-none'>
                              {contact.name}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </>
              ) : (
                <>
                  <div className=' w-full rounded-xl p-2 text-xl'>
                    <div className='mt-4 flex content-center justify-center'>
                      <div>You've got no Contacts</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
        <DrawerFooter
          style={{ zIndex: 3000 }}
          className='fixed bottom-4 w-full  '
        >
          <div className='w-full'>
            <Button
              onClick={handleContactsClick}
              className='text-xl'
              size={'lg'}
              variant={'default'}
            >
              <div className='flex grid-cols-3 content-center items-center'>
                <div className='text-xl'>
                  <div>New Contact</div>
                </div>
                <div className='px-2'></div>
                <div>
                  <User2
                    strokeWidth={1}
                    className='stroke-background'
                    size={20}
                  />
                </div>
              </div>
            </Button>
          </div>
        </DrawerFooter>
        <AddAContact
          open={showAddContact}
          setShowAddContact={setShowAddContact}
          contactsState={contactsState}
          payee={''}
        />
      </motion.div>
    </>
  );
}


