'use client'
import { useRouter } from 'next/router';
// Next
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  let address = searchParams.get('address');

  return <p>Payee: {address}</p>;
}
