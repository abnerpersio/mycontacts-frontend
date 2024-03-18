import ToastMessage from '../ToastMessage';
import { Container } from './styles';
import { useToastContainer } from './useToastContainer';

export default function ToastContainer() {
  const { pendingRemovalMessagesIds, messages, handleRemoveMessage, handleAnimationEnd } =
    useToastContainer();

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
          onAnimationEnd={handleAnimationEnd}
          isLeaving={pendingRemovalMessagesIds.includes(message.id)}
        />
      ))}
    </Container>
  );
}
