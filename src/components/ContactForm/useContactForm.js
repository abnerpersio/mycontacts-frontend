import { useEffect, useImperativeHandle, useState } from 'react';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';
import formatPhone from '../../utils/formatPhone';
import CategoriesService from '../../services/CategoriesService';
import useErrors from '../../hooks/useErrors';
import isEmailValid from '../../utils/isEmailValid';

export function useContactForm(onSubmit, ref) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      setFields: (fields) => {
        setName(fields.name ?? '');
        setEmail(fields.email ?? '');
        setPhone(formatPhone(fields.phone ?? ''));
        setCategoryId(fields.category.id ?? '');
      },
      resetFields: () => {
        setName('');
        setEmail('');
        setPhone(formatPhone(''));
        setCategoryId('');
      },
    }),
    [],
  );

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories();
        setCategories(categoriesList);
      } catch {
      } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  }, [setCategories, setIsLoadingCategories]);

  const { errors, setError, removeError, getErrorMessageByFieldName } = useErrors();

  const isFormValid = name && errors.length === 0;

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'o email está com erro' });
    } else {
      removeError('email');
    }
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setIsSubmitting(true);
    await onSubmit({ name, email, phone, categoryId });
    setIsSubmitting(false);
  }

  return {
    name,
    email,
    phone,
    categoryId,
    categories,
    isLoadingCategories,
    isSubmitting,
    errors,
    isFormValid,
    getErrorMessageByFieldName,
    handleNameChange,
    handleEmailChange,
    handlePhoneChange,
    handleSubmit,
  };
}
