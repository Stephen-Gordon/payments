import React from 'react'
import Image from 'next/image'

import { FaTimes } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'
import { ImArrowDownRight } from 'react-icons/im'
import ffIcon from '@/app/assets/img/icons/firefox-install.png'

interface Props {
    closePrompt: () => void;
    doNotShowAgain: () => void;
}

export default function AddToMobileFirefox(props: Props) {
    const { closePrompt, doNotShowAgain } = props;

    return (
      <div className='fixed bottom-0 left-0 right-0 z-50 h-[60%] px-4 pb-12 text-white'>
        <div className='bg-background relative flex h-full flex-col items-center justify-around rounded-xl p-4 text-center'>
          <button className='absolute right-0 top-0 p-3' onClick={closePrompt}>
            <FaTimes className='text-2xl' />
          </button>
          <p className='text-lg'>
            For the best experience, we recommend installing the Valley Trader
            app to your home screen!
          </p>
          <div className='flex items-center gap-2 text-lg'>
            <p>Click the</p>
            <HiDotsVertical className='text-4xl' />
            <p>icon</p>
          </div>
          <div className='flex w-full flex-col items-center gap-2 px-4 text-lg'>
            <p>Scroll down and then click:</p>
            <div className='bg-background flex w-full items-center justify-around rounded-lg px-4 py-2 text-zinc-900'>
              <div className='flex items-center gap-6'>
                <Image
                  src={ffIcon}
                  alt='Firefox install icon'
                  width={32}
                  height={32}
                />
                <p>Install</p>
              </div>
            </div>
          </div>
          <button className='border-2 p-1' onClick={doNotShowAgain}>
            Don&apos;t show again
          </button>
          <ImArrowDownRight className='absolute -bottom-[50px] right-1 z-10 animate-bounce text-4xl text-indigo-700' />
        </div>
      </div>
    );
}
