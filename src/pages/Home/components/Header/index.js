/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container } from './styles';

export default function Header(props) {
  const { hasError, contactsQty, filteredContactsQty } = props;

  const hasContacts = contactsQty > 0;
  const alignment = hasError ? 'flex-end' : hasContacts ? 'space-between' : 'center';

  return (
    <Container justifyContent={alignment}>
      {!hasError && !!hasContacts && (
        <strong>
          {filteredContactsQty}
          {filteredContactsQty === 1 ? ' contato' : ' contatos'}
        </strong>
      )}

      <Link to="/new">Novo Contato</Link>
    </Container>
  );
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  contactsQty: PropTypes.number.isRequired,
  filteredContactsQty: PropTypes.number.isRequired,
};
