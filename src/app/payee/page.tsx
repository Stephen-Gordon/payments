import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.push('/home');
  }, []);
  return (
    <>
      <h1> backup payee</h1>
    </>
  );
}
