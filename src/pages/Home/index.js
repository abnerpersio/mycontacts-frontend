/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Container,
  InputSearchContainer,
  Header,
  ListHeader,
  Card,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFoundContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/icons/sad.svg';
import emptyBox from '../../assets/images/icons/empty-box.svg';
import magnifierQuestion from '../../assets/images/icons/magnifier-question.svg';

import Loader from '../../components/Loader';
import Button from '../../components/Button';

import ContactsService from '../../services/ContactsService';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  function checkIfIsSearched(item, searchWord) {
    return item?.toLowerCase()?.includes(searchWord?.toLowerCase());
  }

  const filteredContacts = useMemo(
    () =>
      contacts.filter(
        (contact) =>
          checkIfIsSearched(contact.name, searchTerm) ||
          checkIfIsSearched(contact.email, searchTerm) ||
          checkIfIsSearched(contact.phone, searchTerm) ||
          checkIfIsSearched(contact.category_name, searchTerm),
      ),
    [contacts, searchTerm],
  );

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearchTerm(e) {
    setSearchTerm(e.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            value={searchTerm}
            onChange={handleChangeSearchTerm}
            type="text"
            placeholder="Pesquise pelo nome, email ou telefone..."
          />
        </InputSearchContainer>
      )}

      <Header
        justifyContent={hasError ? 'flex-end' : contacts.length > 0 ? 'space-between' : 'center'}
      >
        {!!(!hasError && contacts.length > 0) && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' contato' : ' contatos'}
          </strong>
        )}
        <Link to="/new">Novo Contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="sad" />

          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos!</strong>

            <Button onClick={handleTryAgain} type="button">
              Tentar novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {contacts.length < 1 && !isLoading && (
            <EmptyListContainer>
              <img src={emptyBox} alt="Empty box" />

              <p>
                Voc?? ainda n??o tem nenhum contato cadastrado! Clique no bot??o
                <strong> ???Novo contato??? </strong>?? cima para cadastrar o seu primeiro!
              </p>
            </EmptyListContainer>
          )}

          {contacts.length > 0 && filteredContacts.length < 1 && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="Magnifier question" />

              <span>
                Nenhum resultado foi encontrado para <strong>{searchTerm}</strong>.
              </span>
            </SearchNotFoundContainer>
          )}

          {filteredContacts.length > 0 && (
            <ListHeader orderBy={orderBy}>
              <button onClick={handleToggleOrderBy} type="button">
                <span>Nome</span>
                <img src={arrow} alt="Arrow" />
              </button>
            </ListHeader>
          )}

          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>
                  {contact.category_name && <small>{contact.category_name}</small>}
                </div>
                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="Edit" />
                </Link>

                <button type="button">
                  <img src={trash} alt="Delete" />
                </button>
              </div>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
}
