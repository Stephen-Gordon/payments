'use client';
import { QRCode } from 'react-qrcode-logo';
// Redux
import { useSelector } from 'react-redux';

// react
import { useState, useEffect } from 'react';

export default function Qr() {
  const address: string = useSelector((state: string) => state.address.value);

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth; // Get the screen width
      const tenPercentOfScreenWidth = screenWidth * 0.1; // Calculate 10% of the screen width
      const screenWidthMinusTenPercent = screenWidth - tenPercentOfScreenWidth; // Subtract 10% from the screen width
      setWindowWidth(screenWidthMinusTenPercent); // Set the state with the modified screen width
    }

    // Initial width on component mount
    handleResize();

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array to run effect only once on mount
  return (
    <>
      <QRCode
        ecLevel='H'
        quietZone={20}
        size={windowWidth}
        bgColor='#0c0e1800'
        fgColor='#a7a3f5'
        qrStyle='dots'
        eyeRadius={8}
        //pink, purple, yellow
        eyeColor={['#ec91d8', '#ec91d8b3', '#ec91d866 ']}
        value={`${address}`}
      />
    </>
  );
}
