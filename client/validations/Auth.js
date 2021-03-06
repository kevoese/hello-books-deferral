import * as Yup from 'yup';

export const RegisterValidator = Yup.object().shape({
    email: Yup.string()
        .email()
        .required('Email is required'),
    firstName: Yup.string().required('First-name is required'),
    lastName: Yup.string().required('Last-name is required'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be greater than 8 characters'),
    passwordConfirmation: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Passwords must match'
    )
});

export const SignInValidator = Yup.object().shape({
    email: Yup.string()
        .email()
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be greater than 8 characters')
});

export const ForgotPasswordValidator = Yup.object().shape({
    email: Yup.string()
        .email()
        .required('Required')
});

export const ResetPasswordValidator = Yup.object().shape({
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be greater than 8 characters'),
    passwordConfirmation: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Passwords must match'
    )
});

export const AddBookValidator = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    copiesAvailable: Yup.string().required('Number of Copies is required'),
    publisher: Yup.string().required('Publisher is required'),
    price: Yup.string().required('Price is required'),
    isbn: Yup.string().required('ISBN is required')
});
