// components/BottomNavbar.js
import Link from 'next/link';
import { BookUser, Home, Send, Settings } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setSheet } from '@/GlobalRedux/Features/sheet/sheetSlice';

// react
import { useEffect, useState } from 'react';
import { RootState } from '@/GlobalRedux/store';

// framer
import { AnimatePresence, motion } from 'framer-motion';

const BottomNavbar = () => {
  const router = useRouter();

  const pathname = usePathname();

  const [showNav, setShowNav] = useState(false);

  const sheetState = useSelector((state: RootState) => state.sheet.value);

   useEffect(() => {
    if (pathname == '/home') {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  }, [pathname])

/*   useEffect(() => {
    if (sheetState) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [sheetState]) */

  // redux
  const dispatch = useDispatch();

  const address = useSelector((state: RootState) => state.address.value);

  return (
    <>
      <AnimatePresence>
          <motion.nav
            layout
            /* key={'nav'}
             initial={{ opacity: 1, }}
            animate={{ opacity: showNav ? 1 : 0.5, y: showNav ? 0 : 0 }}
            exit={{ opacity: 0.5, }} */
            transition                                                                                                                                                                                                                                                                                                                                  ={{ duration: 0.4, ease: 'easeIn' }} 
            className='fixed bottom-0 flex h-auto w-full justify-between bg-transparent bg-opacity-0 bg-gradient-to-br from-slate-50/10 p-4 px-8 pb-8 pt-4 backdrop-blur-xl  '
          >
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
                pathname: '/settings',
              }}
            >
              <Settings
                onClick={() => {
                  dispatch(setSheet(true));
                }}
                className='stroke-muted-foreground'
                strokeWidth={1}
              />
            </Link>
          </motion.nav>
        
      </AnimatePresence>
    </>
  );
};

export default BottomNavbar;

