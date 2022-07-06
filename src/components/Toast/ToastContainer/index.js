import { randomBytes } from 'crypto';
import { useCallback, useEffect, useState } from 'react';
import { toastEventManager } from '../../../utils/toast';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';

export default function ToastContainer() {
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

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage key={message.id} message={message} onRemoveMessage={handleRemoveMessage} />
      ))}
    </Container>
  );
}
