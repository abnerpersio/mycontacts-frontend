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

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {contacts.length > 0 && <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />}

      <Header
        hasError={hasError}
        contactsQty={contacts.length}
        filteredContactsQty={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}

      {!hasError && (
        <>
          {contacts.length < 1 && !isLoading && <EmptyList />}

          {contacts.length > 0 && filteredContacts.length < 1 && (
            <SearchNotFound searchTerm={searchTerm} />
          )}

          <ContactsList
            filteredContacts={filteredContacts}
            isDeleteModalVisible={isDeleteModalVisible}
            isLoadingDelete={isLoadingDelete}
            contactBeingDeleted={contactBeingDeleted}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onCloseDeleteModal={handleCloseDeleteModal}
            onConfirmDeleteContact={handleConfirmDeleteContact}
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
