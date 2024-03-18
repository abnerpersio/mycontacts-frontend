import { useRef } from 'react';
import ContactsService from '../../services/ContactsService';
import { toast } from '../../utils/toast';

export function useNewContact() {
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

  return {
    contactFormRef,
    handleSumit,
  };
}
