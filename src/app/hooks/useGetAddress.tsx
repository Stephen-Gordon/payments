import { useSelector } from 'react-redux';
import { RootState } from '../../GlobalRedux/store';

const useGetAddress = () => {
  const addressState = useSelector((state: RootState) => state.address.value);

  return addressState;
};

export default useGetAddress;
