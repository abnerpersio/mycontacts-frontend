import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { Container } from './styles';

import checkIcon from '../../../assets/images/icons/check-circle.svg';
import errorIcon from '../../../assets/images/icons/error-circle.svg';

export default function ToastMessage({ isLeaving, message, onRemoveMessage, onAnimationEnd }) {
  const animatedRef = useRef(null);

  useEffect(() => {
    const handleAnimationEnd = () => onAnimationEnd(message.id);

    const element = animatedRef.current;

    if (isLeaving) {
      element.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      element.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [isLeaving, onAnimationEnd, message.id]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onRemoveMessage, message]);

  function handleRemove() {
    onRemoveMessage(message.id);
  }

  return (
    <Container
      ref={animatedRef}
      isLeaving={isLeaving}
      type={message.type}
      onClick={handleRemove}
      tabIndex={0}
      role="button"
    >
      {message.type === 'success' && <img src={checkIcon} alt="Check" />}
      {message.type === 'danger' && <img src={errorIcon} alt="X" />}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.defaultProps = {
  isLeaving: false,
};

ToastMessage.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'danger', 'success']),
    duration: PropTypes.number,
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
  onAnimationEnd: PropTypes.func.isRequired,
  isLeaving: PropTypes.bool,
};
