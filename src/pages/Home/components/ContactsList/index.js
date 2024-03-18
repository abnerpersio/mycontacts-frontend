import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, ListHeader } from './styles';
import arrow from '../../../../assets/images/icons/arrow.svg';
import edit from '../../../../assets/images/icons/edit.svg';
import trash from '../../../../assets/images/icons/trash.svg';

export default function ContactsList(props) {
  const { filteredContacts, orderBy, onToggleOrderBy, onDeleteContact } = props;

  if (!filteredContacts.length) {
    return null;
  }

  return (
    <>
      <ListHeader orderBy={orderBy}>
        <button onClick={onToggleOrderBy} type="button">
          <span>Nome</span>
          <img src={arrow} alt="Arrow" />
        </button>
      </ListHeader>

      {filteredContacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category.name && <small>{contact.category.name}</small>}
            </div>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="Edit" />
            </Link>

            <button type="button" onClick={() => onDeleteContact(contact)}>
              <img src={trash} alt="Delete" />
            </button>
          </div>
        </Card>
      ))}
    </>
  );
}

ContactsList.propTypes = {
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
      category: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  ).isRequired,
  orderBy: PropTypes.string.isRequired,
  onToggleOrderBy: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
