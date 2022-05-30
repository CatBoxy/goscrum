import { useEffect, useState } from 'react';

// screen size/device checking hook, returns boolean

export default function useResize() {
  // Initialize state with boolean if vw < or > 900px
  const [isPhone, setIsPhone] = useState(
    window.innerWidth < 900 ? true : false
  );
  
  // handler updates isPhone state
  const handleResize = () => {
    if (window.innerWidth < 900) {
      setIsPhone(true);
      return
    }
    setIsPhone(false)
    return
  }

  // useEffect executes handleResize through listening to changes with addEventListener
  // eventListener is removed when useEffect ends its execution
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  },[]);

  // returns boolean state
  return { isPhone }
}