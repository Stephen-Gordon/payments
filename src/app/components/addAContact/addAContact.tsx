import {
  Credenza,
  CredenzaBody,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaContent,
} from '@/app/components/ui/credenza';
import { Input } from '../ui/input';
import { Avatar } from '../ui/avatar';
import { Button } from '../ui/button';
import { setContacts } from '@/GlobalRedux/Features/contacts/contactsSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Contact } from '@/app/types/types';

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
  const [newContactName, setNewContactName] = useState<string>('');

  const isContactAvailable = (name: string): boolean => {
    return contactsState.some(
      (contact: Contact) => contact.name === name || contact.address === payee
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewContactName(e.target.value);
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
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Add a Contact</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          <div className='grid w-full items-center justify-center'>
            <Avatar className='h-9 w-9'></Avatar>
            <div className='flex flex-col space-y-4'>
              <div>
                <label htmlFor='name'>Name</label>
                <Input
                  onChange={handleChange}
                  type='text'
                  id='name'
                  name='name'
                  value={newContactName}
                  placeholder='Name'
                  className='w-full'
                />
              </div>
            </div>
          </div>
        </CredenzaBody>
        <CredenzaFooter>
          <Button
            className='w-full'
            variant={'default'}
            onClick={handleAddContact}
          >
            Add To Contacts
          </Button>
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
