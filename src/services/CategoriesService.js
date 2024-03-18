import CategoryMapper from './mappers/CategoryMapper';
import HttpClient from './utils/HttpClient';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:4000');
  }

  async listCategories() {
    const categories = (await this.httpClient.get('/categories')) ?? [];
    return categories.map(CategoryMapper.toDomain);
  }

  // TODO: implement all the crud methods for this service
}

export default new CategoriesService();
