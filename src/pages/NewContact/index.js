import { useRef } from 'react';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';
import { toast } from '../../utils/toast';

export default function NewContact() {
  const contactFormRef = useRef(null);

  async function handleSumit(params) {
    try {
      await ContactsService.createContact(params);
      contactFormRef.current.resetFields();

      toast({ text: 'Contato cadastrado com sucesso!', type: 'success' });
    } catch (error) {
      toast({ text: 'Ocorreu um erro ao cadastrar o contato!', type: 'danger' });
    }
  }

  return (
    <>
      <PageHeader title="Novo Contato" />

      <ContactForm ref={contactFormRef} buttonLabel="Cadastrar" onSubmit={handleSumit} />
    </>
  );
}
