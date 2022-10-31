import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';
import Loader from '../../components/Loader';
import { toast } from '../../utils/toast';

import useIsMounted from '../../hooks/useIsMounted';

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

  async function handleSumit(params) {
    try {
      const { name: updatedName } = await ContactsService.updateContact(id, {
        name: params.name,
        email: params.email,
        phone: params.phone,
        category_id: params.categoryId,
      });

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

      <ContactForm ref={contactFormRef} buttonLabel="Salvar alterações" onSubmit={handleSumit} />
    </>
  );
}
