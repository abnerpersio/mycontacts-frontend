import { useEffect } from 'react';
import { randomBytes } from 'crypto';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';
import { toastEventManager } from '../../../utils/toast';
import { useAnimatedList } from '../../../hooks/useAnimatedList';

export default function ToastContainer() {
  const { setItems: setMessages, handleRemoveItem, renderList } = useAnimatedList();

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
  }, [setMessages]);

  return (
    <Container>
      {renderList((message, { isLeaving, animatedRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveItem}
          isLeaving={isLeaving}
          animatedRef={animatedRef}
        />
      ))}
    </Container>
  );
}
