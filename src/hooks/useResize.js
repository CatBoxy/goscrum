import { useEffect, useState } from 'react';

export default function useResize() {
  const [isPhone, setIsPhone] = useState(
    window.innerWidth < 900 ? true : false
  );
  
  const handleResize = () => {
    if (window.innerWidth < 900) {
      setIsPhone(true);
      return
    }
    setIsPhone(false)
    return
  }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  },[]);

  return { isPhone }
}