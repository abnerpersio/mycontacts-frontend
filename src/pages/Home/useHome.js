import { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
import ContactsService from '../../services/ContactsService';
import { toast } from '../../utils/toast';

function checkIfIsSearched(item, searchWord) {
  return item?.toLowerCase()?.includes(searchWord?.toLowerCase());
}

export function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const deferedSearchTerm = useDeferredValue(searchTerm);

  const filteredContacts = useMemo(
    () =>
      contacts.filter(
        (contact) =>
          checkIfIsSearched(contact.name, deferedSearchTerm) ||
          checkIfIsSearched(contact.email, deferedSearchTerm) ||
          checkIfIsSearched(contact.phone, deferedSearchTerm) ||
          checkIfIsSearched(contact.category.name, deferedSearchTerm),
      ),
    [contacts, deferedSearchTerm],
  );

  const loadContacts = useCallback(
    async (signal) => {
      try {
        setIsLoading(true);

        const contactsList = await ContactsService.listContacts(orderBy, signal);

        setHasError(false);
        setContacts(contactsList);
      } catch (error) {
        console.log('error', error);

        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setHasError(true);
        setContacts([]);
      } finally {
        setIsLoading(false);
      }
    },
    [orderBy],
  );

  useEffect(() => {
    const controller = new AbortController();

    loadContacts(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadContacts]);

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }, []);

  const handleChangeSearchTerm = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  function handleTryAgain() {
    loadContacts();
  }

  const handleDeleteContact = useCallback((contact) => {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }, []);

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);
      await ContactsService.deleteContact(contactBeingDeleted.id);

      setContacts((prevState) => prevState.filter(({ id }) => id !== contactBeingDeleted.id));
      handleCloseDeleteModal();

      toast({ type: 'success', text: 'Contato deletado com sucesso!' });
    } catch {
      toast({ type: 'danger', text: 'Ocorreu um erro ao deletar o contato!' });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
    contacts,
    filteredContacts,
    isLoading,
    hasError,
    orderBy,
    searchTerm,
    isDeleteModalVisible,
    contactBeingDeleted,
    isLoadingDelete,
    handleToggleOrderBy,
    handleChangeSearchTerm,
    handleTryAgain,
    handleDeleteContact,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
  };
}
