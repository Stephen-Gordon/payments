import { useSelector } from 'react-redux';
import { RootState } from '@/GlobalRedux/store';
import { Contact } from '@/app/types/types';
import truncateEthAddress from 'truncate-eth-address';

const useFindPayeeName = (payeeAddress: string) => {
  const contactsState = useSelector((state: RootState) => state.contacts.value);

  const findPayeeName = (payeeAddress: string): string | null => {
    if (!payeeAddress || contactsState.length === 0) {
      return null;
    }

    const contact = contactsState.find(
      (contact: Contact) => contact.address === payeeAddress
    );

    return contact ? contact.name : truncateEthAddress(payeeAddress);
  };

  return findPayeeName(payeeAddress);
};

export default useFindPayeeName;
