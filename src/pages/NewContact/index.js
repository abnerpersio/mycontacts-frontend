import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';
import { toast } from '../../utils/toast';

export default function NewContact() {
  async function handleSumit(params) {
    try {
      const contact = {
        name: params.name,
        email: params.email,
        phone: params.phone,
        category_id: params.categoryId,
      };

      await ContactsService.createContact(contact);

      toast({ text: 'Contato cadastrado com sucesso!', type: 'success' });
    } catch (error) {
      toast({ text: 'Ocorreu um erro ao cadastrar o contato!', type: 'danger' });
    }
  }

  return (
    <>
      <PageHeader title="Novo Contato" />

      <ContactForm buttonLabel="Cadastrar" onSubmit={handleSumit} />
    </>
  );
}
