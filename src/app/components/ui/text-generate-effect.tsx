'use client';
import { useEffect } from 'react';
import { motion, stagger, useAnimate } from 'framer-motion';
import { cn } from '@/lib/utils';

export const TextGenerateEffect = ({
  words,
  className,
  onAnimationComplete,
  delay
}: {
  words: string;
  className?: string;
  onAnimationComplete?: () => void;
  delay?: number;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(' ');

  useEffect(() => {
    animate(
      'span',
      {
        opacity: 1,
      },
      {
        duration: 1,
        delay: stagger(delay || 0.1),
      }
    ).then(() => {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    });
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span key={word + idx} className='opacity-0 '>
              {word === '\\n' ? <br /> : word}{' '}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className='font-normal leading-relaxed tracking-wide text-inherit'>
      {renderWords()}
    </div>
  );
};
