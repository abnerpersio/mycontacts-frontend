import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { StyledButton } from './styles';

export default function Button({ type, disabled, isLoading, danger, children, onClick }) {
  return (
    <StyledButton type={type} disabled={disabled || isLoading} danger={danger} onClick={onClick}>
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  danger: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  danger: false,
  isLoading: false,
  onClick: undefined,
};
