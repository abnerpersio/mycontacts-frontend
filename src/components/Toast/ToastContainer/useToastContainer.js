import { useCallback, useEffect, useState } from 'react';
import { randomBytes } from 'crypto';
import { toastEventManager } from '../../../utils/toast';

export function useToastContainer() {
  const [messages, setMessages] = useState([]);

  const handleRemoveMessage = useCallback((messageId) => {
    setMessages((prevState) => prevState.filter(({ id }) => id !== messageId));
  }, []);

  useEffect(() => {
    function handleAddToast(toast) {
      const id = randomBytes(8).toString('hex');
      const message = { id, ...toast };
      setMessages((prevState) => [...prevState, message]);
    }

    toastEventManager.on('toast', handleAddToast);

    return () => {
      toastEventManager.removeListener('toast', handleAddToast);
    };
  }, []);

  return {
    messages,
    handleRemoveMessage,
  };
}
