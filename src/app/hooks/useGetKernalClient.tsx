import { useSelector } from 'react-redux';

const useGetKernalClient = () => {
  const kernal = useSelector((state: RootState) => state.kernalClient.value);

  return kernal;
};

export default useGetKernalClient;
