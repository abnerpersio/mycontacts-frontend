import PropTypes from 'prop-types';
import { Container } from './styles';

export default function InputSearch(props) {
  const { value, onChange } = props;

  return (
    <Container>
      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder="Pesquise pelo nome, email ou telefone..."
      />
    </Container>
  );
}

InputSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
