import { useRouter } from 'next/navigation';
import { Undo2 } from 'lucide-react';

interface BackButtonProps {
  routehome?: boolean;
}

export default function BackButton({ routehome }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (routehome) {
      router.push('/home');
    } else {
      router.back();
    }
  };

  return (
    <div className='w-fit rounded-full p-4 hover:bg-slate-300'>
      <Undo2 size={20} onClick={handleBack} color='#cbd5e1' />
    </div>
  );
}
