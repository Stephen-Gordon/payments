import React from 'react'

import { AiOutlinePlusSquare } from 'react-icons/ai'
import { FaTimes, FaBars } from 'react-icons/fa'
import { ImArrowDown } from 'react-icons/im'
import { FiShare } from 'react-icons/fi'
import { TfiPlus } from 'react-icons/tfi'
import { Card, CardContent } from '../ui/card'

interface Props {
    closePrompt: () => void;
    doNotShowAgain: () => void;
}

export default function AddToSamsung(props: Props) {
    const { closePrompt, doNotShowAgain } = props;

    return (
      <Card>
        <CardContent>
          <div className='bg-background relative flex h-full flex-col items-center justify-around rounded-xl p-4 text-center'>
            <button
              className='absolute right-0 top-0 p-3'
              onClick={closePrompt}
            >
              <FaTimes className='text-2xl' />
            </button>
            <p className='text-lg'>
              For the best experience, we recommend installing the Valley Trader
              app to your home screen!
            </p>
            <div className='flex items-center gap-2 text-lg'>
              <p>Click the</p>
              <FaBars className='text-4xl' />
              <p>icon</p>
            </div>
            <div className='flex w-full flex-col items-center gap-2 px-4 text-lg'>
              <p>Scroll down and then click:</p>
              <div className='flex flex-col items-center gap-2 rounded-lg bg-white p-4 text-zinc-800'>
                <TfiPlus className='text-2xl' />
                <p>Add page to</p>
              </div>
            </div>
            <div className='flex w-full flex-col items-center gap-2 px-4 text-lg'>
              <p>Then select:</p>
              <div className='flex flex-col items-center gap-2 rounded-lg bg-white px-4 py-2 text-zinc-800'>
                <p>Home screen</p>
              </div>
            </div>
            <button className='border-2 p-1' onClick={doNotShowAgain}>
              Don&apos;t show again
            </button>
            <ImArrowDown className='absolute -bottom-[50px] right-[-3px] z-10 animate-bounce text-4xl text-indigo-700' />
          </div>
        </CardContent>
      </Card>
    );
}
