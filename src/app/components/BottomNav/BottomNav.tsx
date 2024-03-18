// components/BottomNavbar.js
import Link from 'next/link';
import { Home, Send, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setSheet } from '@/GlobalRedux/Features/sheet/sheetSlice';
const BottomNavbar = () => {
  const router = useRouter();

  // redux
  const dispatch = useDispatch();

  return (
    <nav className='bg-background/90 fixed bottom-0 left-0 flex w-full justify-between bg-opacity-10 bg-clip-padding p-4 backdrop-blur-sm backdrop-filter'>
      <Link href='/home'>
        <Home
          onClick={() => {
            dispatch(setSheet(false));
          }}
        />
      </Link>
      <Link href='/search'>
        <Send
          onClick={() => {
            dispatch(setSheet(true));
          }}
        />
      </Link>

      <Link
        href={{
          pathname: '/menu',
          query: { isNavOpen: true },
        }}
      >
        <Settings onClick={() => router.push(`/menu?isNavOpen=true`)} />
      </Link>
    </nav>
  );
};

export default BottomNavbar;
1;
