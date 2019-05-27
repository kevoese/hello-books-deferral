import * as Yup from 'yup';

export const AddBookValidator = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    copiesAvailable: Yup.number().required('Number of Copies is required'),
    publisher: Yup.string().required('Publisher is required'),
    price: Yup.string().required('Price is required'),
    isbn: Yup.string().required('ISBN is required'),
    coverType: Yup.string().required('Cover Type is required')
});
