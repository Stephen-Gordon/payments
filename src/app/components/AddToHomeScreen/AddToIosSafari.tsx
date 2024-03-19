import React from 'react'

import { TbShare2 } from 'react-icons/tb'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'
import { ImArrowDown } from 'react-icons/im'
import { Smartphone } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { BackgroundGradientAnimation } from '../ui/background-gradient-animation'
interface Props {
    closePrompt: () => void;
    doNotShowAgain: () => void;
}

function closePrompt () {
    return null

}

export default function AddToIosSafari(props: Props) {
    const { doNotShowAgain } = props;

    return (
      <div className='relative'>
        <div className='absolute -z-50 '>
          <BackgroundGradientAnimation />
        </div>
        <Card>
          <CardContent className='bg-card/30 bg-opacity-90 bg-clip-padding backdrop-blur-sm backdrop-filter'>
            <div className='flex h-full flex-col items-center justify-around space-y-6 rounded-xl p-4 text-center'>
              <div className='flex justify-center'>
                <Smartphone className='h-20 w-20 ' strokeWidth={1} />
              </div>
              <p className='font-semibold leading-none tracking-tight '>
                To install this app, please add it to your home screen{' '}
              </p>
              <div className='flex items-center gap-2 text-lg'>
                <p>Click the</p>
                <TbShare2 className='text-4xl' />
                <p>icon</p>
              </div>
              <div className='flex w-full flex-col items-center gap-2 px-4 text-lg'>
                <p>Scroll down and then click:</p>
                <div className='flex w-full items-center justify-between rounded-lg bg-zinc-800 px-4 py-2'>
                  <p>Add to Home Screen</p>
                  <AiOutlinePlusSquare className='text-2xl' />
                </div>
              </div>
              {/*               <ImArrowDown className='animate-bounce text-4xl text-slate-400' />
               */}{' '}
            </div>
          </CardContent>
        </Card>
      </div>
    );
}
