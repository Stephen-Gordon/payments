import { useRouter } from 'next/navigation';
import { Undo2 } from 'lucide-react';

interface BackButtonProps {
  routehome?: boolean;
  onClick?: () => void;
}

export default function BackButton({ routehome, onClick }: BackButtonProps) {
  return (
    <div onClick={onClick} className='w-fit rounded-full p-4 '>
      <Undo2 size={20} color='#cbd5e1' />
    </div>
  );
}
