import { useEffect, useRef, useState } from 'react';

export function useAnimatedUnmount(visible) {
  const [shouldRender, setShouldRender] = useState(visible);
  const animatedRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }

    const handleAnimationEnd = () => setShouldRender(false);

    const element = animatedRef.current;

    if (!visible && element) {
      element.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if (element) element.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [visible]);

  return { animatedRef, shouldRender };
}
