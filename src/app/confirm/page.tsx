'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push('/home');
  });

  return (
    <div>
      <p>Confirm page</p>
    </div>
  );
}
