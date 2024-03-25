import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';

const Confetti = () => {
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const detectSize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener when component mounts
    window.addEventListener('resize', detectSize);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, []); // Empty dependency array to run effect only once when component mounts

  return (
    <div>
      <ReactConfetti
        width={windowDimension.width}
        height={windowDimension.height}
        tweenDuration={1000}
      />
    </div>
  );
};

export { Confetti };
