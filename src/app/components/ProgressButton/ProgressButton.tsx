import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimate, useAnimation, useMotionValue } from 'framer-motion';
import { Send } from 'lucide-react';

interface ProgressButtonProps {
  onComplete: () => void;
}

const ProgressButton = ({onComplete} : ProgressButtonProps) => {
  const [isHolding, setIsHolding] = useState(false);

  const [scope, animate ] = useAnimate()
  

  const handleHoldStart = async () => {
    setIsHolding(true);
    animate(scope.current, { pathLength: 1 }, { duration: 2 } );
        await animate(scope.current, { width: '100%' }, { duration: 2 });

            console.log('scope 2', scope);


    

  };

  const handleHoldEnd = () => {
    setIsHolding(false);
            animate(scope.current, { width: 0 }, { duration: 0.4 });
  };
  const width = useMotionValue(0);


  useEffect(() => {

    if (scope.current >= '99') {
/*       onComplete();  */
      
       //alert("Complete") 
    } 

  }, [ width])
  
  return (
    <div style={{ position: 'relative', height: 50 }}>
      <motion.div
        style={{
          width: '100%',
          height: '100%',
        }}
        className='bg-background w-full rounded-xl border'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onTapStart={handleHoldStart}
        onTap={handleHoldEnd}
      >
        {/*  <motion.svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='transparent'
          stroke-linecap='round'
          stroke-linejoin='round'
          className='lucide lucide-circle stroke-muted-foreground stroke-1'
        >
          <motion.circle
            initial={{ pathLength: 0 }}
            animate={controls}
            exit={{ pathLength: 0 }}
            cx='12'
            cy='12'
            r='10'
          />
        </motion.svg> */}
        <motion.div
          style={{
            width: width, 
            height: '100%',
          }}
          className='bg-white rounded-xl'
          ref={scope}
        />

        <button
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
          }}
          className='mix-blend-exclusion flex'
        >
          Hold to Send <Send className='ml-4 stoke-1 stroke-muted-foreground'/>
        </button>
      </motion.div>
    </div>
  );
};

export default ProgressButton;
