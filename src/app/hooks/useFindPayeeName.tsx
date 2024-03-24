// redux
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
// types
import { Contact } from "@/app/types/types";
import truncateEthAddress from "truncate-eth-address";

const useFindPayeeName = (payeeAddress: string) => {

    const contactsState = useSelector(
        (state: RootState) => state.contacts.value
    );

    const findPayeeName = (payeeAddress: string): string => {
        const contact = contactsState.find(
            (contact: Contact) => contact.address === payeeAddress
        );
        return contact ? contact.name : truncateEthAddress(payeeAddress);
    };
    console.log("Hook useFindPayeeName" , findPayeeName(payeeAddress));

    return findPayeeName(payeeAddress);
}

export default useFindPayeeName;