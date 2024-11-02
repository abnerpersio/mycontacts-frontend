import CategoryMapper from './mappers/CategoryMapper';
import HttpClient from './utils/HttpClient';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:4000');
  }

  async listCategories(signal) {
    const categories = (await this.httpClient.get('/categories', { signal })) ?? [];
    return categories.map(CategoryMapper.toDomain);
  }

  // TODO: implement all the crud methods for this service
}

export default new CategoriesService();
