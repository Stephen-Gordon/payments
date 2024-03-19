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
    <nav
      
      className='bg-background/50 fixed z-40 bottom-0 flex w-full justify-between overflow-hidden bg-opacity-10 bg-clip-padding p-4 px-8 pb-8 saturate-200 backdrop-blur-xl backdrop-filter'
    >
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
