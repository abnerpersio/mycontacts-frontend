import ContactMapper from './mappers/ContactMapper';
import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:4000');
  }

  async listContacts(orderBy, signal) {
    const result = await this.httpClient.get(`/contacts?orderBy=${orderBy || 'asc'}`, { signal });
    const contacts = result ?? [];
    return contacts.map(ContactMapper.toDomain);
  }

  async getContact(id, signal) {
    const data = await this.httpClient.get(`/contacts/${id}`, { signal });
    return ContactMapper.toDomain(data);
  }

  createContact(contact) {
    const body = ContactMapper.toPersistence(contact);
    return this.httpClient.post('/contacts', { body });
  }

  updateContact(id, contact) {
    const body = ContactMapper.toPersistence(contact);
    return this.httpClient.put(`/contacts/${id}`, { body });
  }

  deleteContact(id) {
    return this.httpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsService();
