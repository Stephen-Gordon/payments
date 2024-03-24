import {
  Credenza,
  CredenzaBody,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaContent,
  CredenzaClose,
} from '@/app/components/ui/credenza';
import { Input } from '../ui/input';
import { Avatar } from '../ui/avatar';
import { Button } from '../ui/button';

// redux
import { setContacts } from '@/GlobalRedux/Features/contacts/contactsSlice';
import { useDispatch } from 'react-redux';

// react
import { useEffect, useState } from 'react';

// types
import { Contact } from '@/app/types/types';

// framer
import { motion } from 'framer-motion';
import { isAddress } from 'viem';
import { TextGenerateEffect } from '../ui/text-generate-effect';



interface AddAContactProps {
  open: boolean;
  setShowAddContact: (value: boolean) => void;
  contactsState: Contact[];
  payee: string;
}

export default function AddAContact({
  open,
  setShowAddContact,
  contactsState,
  payee,
}: AddAContactProps) {


  // state
  const [newContactName, setNewContactName] = useState<string>('');
  const [newContactAddress, setNewContactAddress] = useState<string>('');

  const [showAddButton, setShowAddButton] = useState<boolean>(true);

  // error
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  useEffect(() => {
    if (newContactName === '' || newContactAddress === '' || showErrorMessage ) {
      setShowAddButton(false);
    } else {
      setShowAddButton(true);
    }
  }, [newContactName, newContactAddress])

  const isContactAvailable = (name: string): boolean => {
    return contactsState.some(
      (contact: Contact) => contact.name === name || contact.address === payee
    );
  };

  const handleAddAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isAddressValid = isAddress(e.target.value);
    setNewContactAddress(e.target.value);
    !isAddressValid && setShowErrorMessage(true);
  };

  const dispatch = useDispatch();

  const handleAddContact = () => {
    if (!isContactAvailable(newContactName)) {
      dispatch(
        setContacts([
          ...contactsState,
          { name: newContactName, address: payee },
        ])
      );
      setShowAddContact(false);
      setNewContactName('');
    } else {
      alert('Contact already exists!');
    }
  };

  return (
    <Credenza open={open}>
      <CredenzaContent className='w-full h-fit'>
        <CredenzaHeader className='w-full'>
          <CredenzaTitle><TextGenerateEffect words='Add a Contact'></TextGenerateEffect></CredenzaTitle>
        </CredenzaHeader>

        <div className='grid p-4 space-y-6' >
          <div className='w-full' style={{ width: '100%' }}>
            <Input
              onChange={(e) => setNewContactName(e.target.value)}
              type='text'
              id='name'
              name='name'
              style={{ width: '100%' }}
              value={newContactName}
              placeholder='Name'
              className='w-full'
            />
          </div>
          {payee == '' && (
            <div className='w-full'>
              <div className='w-full'>
                <Input
                  onChange={handleAddAddress}
                  type='text'
                  id='address'
                  name='address'
                  value={newContactAddress}
                  placeholder='Address'
                  className='w-full'
                />
              </div>

              <motion.div
                key='vaild-address-contacts'
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.4, ease: 'easeInOut' },
                }}
                exit={{ opacity: 0 }}
                className='w-full'
              >
                {showErrorMessage && (
                  <div
                    key='valid-address'
                    className='text-muted-foreground text-sm mt-2'
                  >
                    Please enter a valid address
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </div>

        <CredenzaFooter>
          {showAddButton && (
            <motion.div
              key='add-contact-button'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Button
                className='w-full'
                variant={'default'}
                onClick={handleAddContact}
              >
                Add To Contacts
              </Button>
            </motion.div>
          )}
          <Button
            className='w-full'
            variant={'destructive'}
            onClick={() => setShowAddContact(false)}
          >
            Cancel
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
