import * as Yup from 'yup';

export const RegisterValidator = Yup.object().shape({
    email: Yup.string()
        .email()
        .required('Email is Required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
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
        .required('Email is Required'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be greater than 8 characters')
});
