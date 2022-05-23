import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';

export default function NewContact() {
  async function handleSumit(params) {
    try {
      const contact = {
        name: params.name,
        email: params.email,
        phone: params.phone,
        category_id: params.categoryId,
      };

      const response = await ContactsService.createContact(contact);

      console.log(response);
    } catch (error) {
      alert('Ocorreu um erro ao cadastrar o contato!');
    }
  }

  return (
    <>
      <PageHeader title="Novo Contato" />

      <ContactForm buttonLabel="Cadastrar" onSubmit={handleSumit} />
    </>
  );
}
