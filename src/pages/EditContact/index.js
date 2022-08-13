import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';
import Loader from '../../components/Loader';
import { toast } from '../../utils/toast';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        const data = await ContactsService.getContact(id);
        contactFormRef.current.setFields(data);
        setIsLoading(false);
      } catch (error) {
        history.push('/');
        toast({ type: 'danger', text: 'Contato não encontrado!' });
      }
    }

    loadContact();
  }, [id, history]);

  async function handleSumit(params) {
    const updatedContact = {
      name: params.name,
      email: params.email,
      phone: params.phone,
      category_id: params.categoryId,
    };

    console.log(updatedContact);
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title="Editar Contato" />

      <ContactForm ref={contactFormRef} buttonLabel="Salvar alterações" onSubmit={handleSumit} />
    </>
  );
}
