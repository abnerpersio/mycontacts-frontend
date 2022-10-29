import { useEffect, useRef } from 'react';
import { useState } from 'react';

export default function useSafeAsyncState(initalState) {
  const [state, setState] = useState(initalState);

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  });

  function setSafeAsyncState(value) {
    if (!isMounted.current) return;
    setState(value);
  }

  return [state, setSafeAsyncState];
}
