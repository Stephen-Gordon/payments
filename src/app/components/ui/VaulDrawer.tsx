'use client';

import { Drawer } from 'vaul';
import { useDispatch, useSelector } from 'react-redux';
import { setSheet } from '@/GlobalRedux/Features/sheet/sheetSlice';

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
      shouldScaleBackground
    >
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 bg-black/40' />
        <Drawer.Content className='from-background to bg-background/80 fixed bottom-0 left-0 right-0 mt-24 flex h-[96%] flex-col rounded-t-[10px] bg-gradient-to-t backdrop-blur-2xl'>
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
