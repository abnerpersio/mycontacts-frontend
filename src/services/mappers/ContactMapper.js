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
      id: persistenceContent.id,
      name: persistenceContent.name,
      email: persistenceContent.email,
      phone: persistenceContent.phone,
      category: {
        id: persistenceContent.category_id,
        name: persistenceContent.category_name,
      },
    };
  }
}

export default new ContactMapper();
