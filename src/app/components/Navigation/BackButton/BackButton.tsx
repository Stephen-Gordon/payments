import { useRouter } from 'next/navigation';
import { Undo2 } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();
  return (
    <div className='w-fit rounded-full p-4 hover:bg-slate-700'>
      <Undo2 size={20} onClick={() => router.back()} color='#cbd5e1' />
    </div>
  );
}
