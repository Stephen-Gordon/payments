// components/BottomNavbar.js
import Link from 'next/link';
import { BookUser, Home, Send, Settings } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setSheet } from '@/GlobalRedux/Features/sheet/sheetSlice';

// react
import { useEffect, useState } from 'react';

const BottomNavbar = () => {
  const router = useRouter();

  const pathname = usePathname();

  const [showNav, setShowNav] = useState(true);

   useEffect(() => {
    if (pathname == '/' || pathname == '/login' || pathname == '/tx') {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [pathname])

  // redux
  const dispatch = useDispatch();

  return (
    <>
      {showNav && (
        <nav className='fixed bottom-0 z-40 flex w-full justify-between overflow-hidden bg-transparent bg-opacity-0 bg-gradient-to-br from-slate-50/10 p-4 px-8 pb-8 pt-4 backdrop-blur-xl transition-all duration-500 '>
          {/* <Link href='/home'>
            <Home
              className='stroke-muted-foreground'
              strokeWidth={1}
              onClick={() => {
                dispatch(setSheet(false));
              }}
            />
          </Link> */}
          <Link href='/search'>
            <Send
              className='stroke-muted-foreground'
              strokeWidth={1}
              onClick={() => {
                dispatch(setSheet(true));
              }}
            />
          </Link>
          <Link
            href={{
              pathname: '/contacts',
            }}
            onClick={() => {
              dispatch(setSheet(true));
            }}
          >
            <BookUser className='stroke-muted-foreground' strokeWidth={1} />
          </Link>
          <Link
            href={{
              pathname: '/menu',
              query: { isNavOpen: true },
            }}
          >
            <Settings
              className='stroke-muted-foreground'
              strokeWidth={1}
              onClick={() => router.push(`/menu?isNavOpen=true`)}
            />
          </Link>
        </nav>
      )}
    </>
  );
};

export default BottomNavbar;

