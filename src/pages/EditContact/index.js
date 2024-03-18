import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ContactsService from '../../services/ContactsService';
import { toast } from '../../utils/toast';
import useIsMounted from '../../hooks/useIsMounted';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const contactFormRef = useRef(null);
  const isMounted = useIsMounted();

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContact(id);

        if (!isMounted()) return;

        contactFormRef.current.setFields(contact);
        setContactName(contact.name);
        setIsLoading(false);
      } catch {
        if (!isMounted()) return;

        history.push('/');
        toast({ type: 'danger', text: 'Contato não encontrado!' });
      }
    }

    loadContact();
  }, [id, history, isMounted]);

  async function handleSubmit(params) {
    try {
      const { name: updatedName } = await ContactsService.updateContact(id, params);

      setContactName(updatedName);

      toast({ text: 'Contato editado com sucesso!', type: 'success' });
    } catch (error) {
      toast({ text: 'Ocorreu um erro ao editar o contato!', type: 'danger' });
    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader title={isLoading ? 'Carregando...' : `Editar ${contactName}`} />

      <ContactForm ref={contactFormRef} buttonLabel="Salvar alterações" onSubmit={handleSubmit} />
    </>
  );
}
