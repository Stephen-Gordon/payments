'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sheet, { SheetRef } from 'react-modal-sheet';
import { setSheet } from '@/GlobalRedux/Features/sheet/sheetSlice';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/app/components/ui/drawer';
import { useState } from 'react';


const SheetLayout = ({ children }) => {
  const isOpen = useSelector((state) => state.sheet.value);

  useEffect(() => {
    console.log('Sheet is open:', isOpen);
  }, [isOpen]);

  const dispatch = useDispatch();

  return (
    <>
      {/* <Sheet isOpen={isOpen} onClose={() => dispatch(setSheet(false))}>
        <Sheet.Container
          className='blurios'
          style={{
            backgroundColor: 'rgba(29, 31, 39, 0.8)',
            backdropFilter: 'blur(20px) saturate(100%)',
          }}
        >
          <Sheet.Content>{children}</Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={() => dispatch(setSheet(false))} />
      </Sheet> */}
      <Drawer
        onClose={() => {
          dispatch(setSheet(false));
        }}
        open={isOpen}
      >
        <DrawerContent className='h-auto bg-clip-padding backdrop-blur-sm backdrop-filter '>
          {children}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SheetLayout;
