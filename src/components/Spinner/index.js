import PropTypes from 'prop-types';

import { StyledSpinner } from './styles';

export default function Spinner(props) {
  const { size = 32 } = props;

  return <StyledSpinner size={size} />;
}

Spinner.propTypes = {
  size: PropTypes.number,
};
