'use client';
import { useButton } from '@react-aria/button';
import { FocusRing } from '@react-aria/focus';
// framer
import { AnimatePresence, motion, useAnimation } from 'framer-motion';

// icons
import { ArrowLeft } from 'lucide-react';

// react
import { useEffect, useRef, useState } from 'react';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '@/GlobalRedux/store';
import { formatUnits } from 'viem';
interface KeyPadProps {
  setUsdcAmount: (usdcAmount: string) => void;
  usdcAmount: string;
}

export default function KeyPad({ setUsdcAmount, usdcAmount }: KeyPadProps) {
  let [nums, setNums] = useState<any>([]);

  // redux
  const balanceState = useSelector((state: RootState) => state.balance.value);

  function handleClick(num: any) {
    setNums([...nums, num]);
  }

  useEffect(() => {
    setUsdcAmount(nums.join(''));
  }, [nums]);

  return (
    <div className='mx-auto flex max-w-xs flex-col justify-center'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className={`m-auto text-center text-5xl font-extralight tabular-nums transition-all duration-500 ${
          usdcAmount > formatUnits(balanceState, 6)
            ? 'text-rose-500'
            : 'text-white'
        }`}
      >
        {usdcAmount || 0}
      </motion.div>

      <div className='grid w-full justify-center'>
        <motion.div
          onClick={() => {
            setNums([formatUnits(balanceState, 6)]);
            setUsdcAmount(formatUnits(balanceState, 6));
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          key='insufficient-balance'
          className={` full  mt-2 flex w-fit rounded-full border px-4 py-2 text-center text-sm ${
            usdcAmount > formatUnits(balanceState, 6)
              ? 'text-rose-500 '
              : 'text-muted-foreground bg-card'
          }`}
        >
          {balanceState && <span>Balance: {formatUnits(balanceState, 6)}</span>}
        </motion.div>
      </div>

      <motion.div
        key='keypad-button'
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className='mt-9 flex flex-wrap justify-between gap-4'
      >
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
      </motion.div>
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
