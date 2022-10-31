class ContactMapper {
  toPersistence(domainContent) {
    return {
      name: domainContent.name,
      email: domainContent.email,
      phone: domainContent.phone,
      category_id: domainContent.categoryId,
    };
  }

  toDomain(persistenceContent) {
    return {
      name: persistenceContent.name,
      email: persistenceContent.email,
      phone: persistenceContent.phone,
      categoryId: persistenceContent.category_id,
    };
  }
}

export default new ContactMapper();
