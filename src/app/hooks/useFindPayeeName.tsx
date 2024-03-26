import { useSelector } from 'react-redux';
import { RootState } from '@/GlobalRedux/store';
import { Contact } from '@/app/types/types';
import truncateEthAddress from 'truncate-eth-address';

const useFindPayeeName = (payeeAddress: string) => {

  const contactsState = useSelector((state: RootState) => state.contacts.value);

  const findPayeeName = (payeeAddress: string): string | null => {
    if ( contactsState.length == 0) {
      return truncateEthAddress(payeeAddress);
    }

    // make sure theyre lowercase to match them
    const contact = contactsState.find(
      (element: Contact) => element.address?.toLocaleLowerCase() == payeeAddress.toLocaleLowerCase()
    );
    console.log("contact ", contact)

    return contact ? contact.name : truncateEthAddress(payeeAddress);
  };

  return findPayeeName(payeeAddress);
};

export default useFindPayeeName;
