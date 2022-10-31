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
    return persistenceContent;
  }
}

export default new ContactMapper();
