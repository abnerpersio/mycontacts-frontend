import { randomBytes } from 'crypto';
import { useEffect, useState } from 'react';
import { toastEventManager } from '../../../utils/toast';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast({ type, text }) {
      const id = randomBytes(8).toString('hex');
      setMessages((prevState) => [...prevState, { id, type, text }]);
    }

    toastEventManager.on('toast', handleAddToast);

    return () => {
      toastEventManager.removeListener('toast', handleAddToast);
    };
  }, []);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage key={message.id} type={message.type} text={message.text} />
      ))}
    </Container>
  );
}
