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
    if (pathname == '/' || pathname == '/login') {
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
        <nav style={{backdropFilter: 'blur(100px)'}} className='fixed transition-all duration-500 bottom-0 z-40 bg-opacity-0 flex w-full justify-between overflow-hidden p-4 px-8 pb-8 '>
          <Link href='/home'>
            <Home
              className='stroke-muted-foreground'
              strokeWidth={1}
              onClick={() => {
                dispatch(setSheet(false));
              }}
            />
          </Link>
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

