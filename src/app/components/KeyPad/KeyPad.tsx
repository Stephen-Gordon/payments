import { useButton } from '@react-aria/button';
import { FocusRing } from '@react-aria/focus';
import { motion, useAnimation } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface KeyPadProps {
  setUsdcAmount: (usdcAmount: string) => void;
  usdcAmount: string;
}

export default function KeyPad({ setUsdcAmount, usdcAmount }: KeyPadProps) {
  let [nums, setNums] = useState<any>([]);

  function handleClick(num: any) {
    setNums([...nums, num]);
  }

  useEffect(() => {
    setUsdcAmount(nums.join(''));
  }, [nums]);

  return (
    <div className='mx-auto flex max-w-xs flex-col items-center justify-end p-6 md:justify-center'>
      <div className='m-auto text-center text-8xl font-extralight tabular-nums text-white'>
        ${usdcAmount || 0}
      </div>
      <div className='mt-9 flex flex-wrap justify-between gap-4'>
        <Button onClick={() => handleClick('7')}>7</Button>
        <Button onClick={() => handleClick('8')}>8</Button>
        <Button onClick={() => handleClick('9')}>9</Button>
        <Button onClick={() => handleClick('4')}>4</Button>
        <Button onClick={() => handleClick('5')}>5</Button>
        <Button onClick={() => handleClick('6')}>6</Button>
        <Button onClick={() => handleClick('1')}>1</Button>
        <Button onClick={() => handleClick('2')}>2</Button>
        <Button onClick={() => handleClick('3')}>3</Button>
        <Button onClick={() => handleClick('.')}>.</Button>
        <Button onClick={() => handleClick('0')}>0</Button>
        <Button
          onClick={() => {
            setNums(nums.slice(0, -1));
          }}
        >
          <ArrowLeft size={40} className='m-auto text-center' />
        </Button>
      </div>
    </div>
  );
}

function Button({
  onClick = () => {},
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  let ref = useRef();
  let controls = useAnimation();

  let { buttonProps } = useButton(
    {
      onPressStart: () => {
        controls.stop();
        controls.set({ background: '#757376' });
      },
      onPressEnd: () => {
        controls.start({
          background: '#353336',
          transition: { duration: 0.4 },
        });
      },
      onPress: () => {
        onClick();
        controls.start({
          background: [null, '#353336'],
          transition: { duration: 0.4 },
        });
      },
    },
    ref
  );

  return (
    <FocusRing focusRingClass='ring ring-offset-2 ring-offset-black'>
      <motion.button
        {...buttonProps}
        ref={ref}
        animate={controls}
        className='h-20 w-20 touch-none select-none rounded-full bg-[#353336] text-center text-[40px] text-white focus:outline-none'
        style={{
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        {children}
      </motion.button>
    </FocusRing>
  );
}
