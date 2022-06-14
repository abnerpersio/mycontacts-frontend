import PropTypes from 'prop-types';
import { Container } from './styles';

import checkIcon from '../../../assets/images/icons/check-circle.svg';
import errorIcon from '../../../assets/images/icons/error-circle.svg';

export default function ToastMessage({ text, type }) {
  return (
    <Container type={type}>
      {type === 'success' && <img src={checkIcon} alt="Check" />}
      {type === 'danger' && <img src={errorIcon} alt="X" />}
      <strong>{text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'danger', 'success']),
};

ToastMessage.defaultProps = {
  type: 'default',
};
