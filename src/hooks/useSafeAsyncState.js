import { useCallback, useState } from 'react';
import useIsMounted from './useIsMounted';

export default function useSafeAsyncState(initalState) {
  const [state, setState] = useState(initalState);
  const isMounted = useIsMounted();

  const setSafeAsyncState = useCallback(
    (value) => {
      if (!isMounted()) return;
      setState(value);
    },
    [isMounted],
  );

  return [state, setSafeAsyncState];
}
