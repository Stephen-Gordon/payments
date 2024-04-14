import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

interface ProgressButtonProps {
  onComplete: () => void;
}

const ProgressButton = ({onComplete} : ProgressButtonProps) => {
  const [isHolding, setIsHolding] = useState(false);
  const controls = useAnimation();
  const bgControls = useAnimation()
  

  const handleHoldStart = async () => {
    setIsHolding(true);
    controls.start({ pathLength: 1, transition: { duration: 2 } });
    await bgControls.start({width: "100%", transition: { duration: 2 } })
    

  };

  const handleHoldEnd = () => {
    setIsHolding(false);
    controls.stop();
    controls.start({ pathLength: 0, transition: { duration: 0.4 } }); // Animate pathLength back to 0
    bgControls.start({ width: 0, transition: { duration: 0.4 } }); // Animate pathLength back to 0
  };
  const width = useMotionValue(0);

  useEffect(() => {

    if (width.current == '100%') {
      onComplete(); 
    }

  }, [width.current])
  
  return (
    <div style={{ position: 'relative', width: 200, height: 50 }}>
      <motion.div
        style={{
          width: '100%',
          height: '100%',
        }}

        className='bg-background rounded-xl border'
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
          className='bg-muted-foreground rounded-xl'
          animate={bgControls}
          
        />

        <button
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontWeight: 'bold',
          }}
          className='mix-blend-exclusion'
        >
          Hold to Send
        </button>
      </motion.div>
    </div>
  );
};

export default ProgressButton;
