import React from 'react'
import Link from 'next/link'

import { FaTimes } from 'react-icons/fa'

interface Props {
    closePrompt: () => void;
    doNotShowAgain: () => void;
}

export default function AddToOtherBrowser(props: Props) {
    const { closePrompt, doNotShowAgain } = props;
    const searchUrl = `https://www.google.com/search?q=add+to+home+screen+for+common-mobile-browsers`;

    return (
      <div className='fixed bottom-0 left-0 right-0 z-50 flex h-[60%] flex-col items-center justify-around px-4 pb-12 text-white'>
        <div className='bg-background relative flex h-full flex-col items-center justify-around rounded-xl p-4 text-center'>
          <button className='absolute right-0 top-0 p-3' onClick={closePrompt}>
            <FaTimes className='text-2xl' />
          </button>
          <p className='text-lg'>
            For the best experience, we recommend installing the Valley Trader
            app to your home screen!
          </p>
          <div className='flex flex-col items-center gap-4 text-lg'>
            <p>
              Unfortunately, we were unable to determine which browser you are
              using. Please search for how to install a web app for your
              browser.
            </p>
            <Link className='text-blue-300' href={searchUrl} target='_blank'>
              Try This Search
            </Link>
          </div>
          <button className='border-2 p-1' onClick={doNotShowAgain}>
            Don&apos;t show again
          </button>
        </div>
      </div>
    );
}