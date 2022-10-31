import { useCallback } from 'react';
import useIsMounted from './useIsMounted';

export function useSafeAsyncOperation(callback = () => {}) {
  const isMounted = useIsMounted();

  const runSafeAsyncOperation = useCallback(() => {
    if (!isMounted()) return;
    callback();
  }, [isMounted, callback]);

  return runSafeAsyncOperation;
}
