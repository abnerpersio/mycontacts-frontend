import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import { useNewContact } from './useNewContact';

export default function NewContact() {
  const { contactFormRef, handleSumit } = useNewContact();

  return (
    <>
      <PageHeader title="Novo Contato" />

      <ContactForm ref={contactFormRef} buttonLabel="Cadastrar" onSubmit={handleSumit} />
    </>
  );
}
