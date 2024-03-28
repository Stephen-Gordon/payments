import { useSelector } from 'react-redux';
import { RootState } from '@/GlobalRedux/store';
import { Contact } from '@/app/types/types';
import truncateEthAddress from 'truncate-eth-address';

const useFindPayeeName = (payeeAddress: string, contactsState : any) => {

  const findPayeeName = (payeeAddress: string): string | null => {
    if (!contactsState || contactsState.length === 0) {
      return truncateEthAddress(payeeAddress);
    }

    // Ensure to lower case both sides to match
    const contact = contactsState.find(
      (element: Contact) => element.address?.toLocaleLowerCase() === payeeAddress.toLocaleLowerCase()
    );

    return contact ? contact.name : truncateEthAddress(payeeAddress);
  };

  return findPayeeName(payeeAddress);
};

export default useFindPayeeName;
