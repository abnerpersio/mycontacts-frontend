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

      toast('Contato cadastrado com sucesso!', 'success');
    } catch (error) {
      toast('Ocorreu um erro ao cadastrar o contato!', 'danger');
    }
  }

  return (
    <>
      <PageHeader title="Novo Contato" />

      <ContactForm buttonLabel="Cadastrar" onSubmit={handleSumit} />
    </>
  );
}
