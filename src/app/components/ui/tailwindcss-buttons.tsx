'use client';
import React from 'react';
import { IconClipboard } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
export const ButtonsCard = ({
  children,
  className,
  onClick,
}: {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'group/btn relative flex h-60 w-full items-center justify-center overflow-hidden rounded-xl border border-neutral-100 bg-white hover:border-neutral-200 dark:border-white/[0.2] dark:bg-black',
        className
      )}
    >
      <div className='dark:bg-dot-white/[0.1] bg-dot-black/[0.1] absolute inset-0' />
      <IconClipboard className='absolute right-2 top-2 hidden h-4 w-4 text-neutral-300 transition duration-200 group-hover/btn:block' />
      <div className='relative z-40'>{children}</div>
    </div>
  );
};
