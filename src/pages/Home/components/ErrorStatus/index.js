import PropTypes from 'prop-types';
import sad from '../../../../assets/images/icons/sad.svg';
import Button from '../../../../components/Button';

import { Container } from './styles';

export default function ErrorStatus(props) {
  const { onTryAgain } = props;

  return (
    <Container>
      <img src={sad} alt="sad" />

      <div className="details">
        <strong>Ocorreu um erro ao obter os seus contatos!</strong>

        <Button onClick={onTryAgain} type="button">
          Tentar novamente
        </Button>
      </div>
    </Container>
  );
}

ErrorStatus.propTypes = {
  onTryAgain: PropTypes.func.isRequired,
};
