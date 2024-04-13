'use client';

import { Drawer } from 'vaul';
import { useDispatch, useSelector } from 'react-redux';
import { setSheet } from '@/GlobalRedux/Features/sheet/sheetSlice';

import { useEffect, useState, useRef } from 'react';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function VaulDrawer({children}) {

      const isOpen = useSelector((state) => state.sheet.value);
      const dispatch = useDispatch();

      

  return (
    <Drawer.Root
    
      onClose={() => {
        dispatch(setSheet(false));
        window.history.pushState({}, '', '/home');
      }}
      open={isOpen}
      shouldScaleBackground={true}
    >
      <Drawer.Portal>
        <Drawer.Overlay
        
          onClick={() => dispatch(setSheet(false))}
          className='bg-background/40 fixed inset-0'
        />
        <Drawer.Content className='from-background to bg-background/60 fixed bottom-0 left-0 right-0 z-50 mt-24 flex h-[96%] flex-col rounded-t-[10px] bg-gradient-to-t backdrop-blur-2xl'>
          
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.2 }}
              >
                {children}
              </motion.div>
            </>

        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
