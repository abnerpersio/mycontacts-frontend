import { Container } from './styles';
import Loader from '../../components/Loader';
import { useHome } from './useHome';
import InputSearch from './components/InputSerach';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ContactsList from './components/ContactsList';
import Modal from '../../components/Modal';

export default function Home() {
  const {
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    contactBeingDeleted,
    contacts,
    filteredContacts,
    searchTerm,
    orderBy,
    hasError,
    handleTryAgain,
    handleDeleteContact,
    handleConfirmDeleteContact,
    handleCloseDeleteModal,
    handleChangeSearchTerm,
    handleToggleOrderBy,
  } = useHome();

  const hasContacts = contacts.length > 0;
  const hasFilteredContacts = filteredContacts.length > 0;
  const isListEmpty = !hasError && !hasContacts && !isLoading;
  const isSearchEmpty = !hasError && hasContacts && !hasFilteredContacts;

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasContacts && <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />}

      <Header
        hasError={hasError}
        contactsQty={contacts.length}
        filteredContactsQty={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList />}
      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      {hasContacts && (
        <>
          <ContactsList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
          />

          <Modal
            isLoading={isLoadingDelete}
            visible={isDeleteModalVisible}
            title={`Tem certeza que deseja remover o contato ”${contactBeingDeleted?.name}”?`}
            danger
            confirmLabel="Deletar"
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteContact}
          >
            <p>Esta ação não poderá ser desfeita!</p>
          </Modal>
        </>
      )}
    </Container>
  );
}
