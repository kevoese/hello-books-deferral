import React, { useContext } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import context from '@context/authContext';
import InputForm from '@components/inputForm';
import Button from '@components/Button';
import { RegisterValidator } from '@clientValidators/auth';

const { AuthContext } = context;

const Register = () => {
    const [auth, setAuth] = useContext(AuthContext);
    return (
        <div
            className="bg-no-repeat bg-center bg-cover  flex flex-col justify-center items-center sm:h-screen"
            style={{ background: `url(/images/12.jpg)` }}
        >
            <div className="inline-block px-0 py-5 sm:w-9/12 max-w-custom w-500">
                <h1 className=" text-5xl text-gray-1200 text-center my-10 mt-0">
                    Register
                </h1>
                <Formik
                    initialValues={{
                        email: '',
                        firstName: '',
                        password: '',
                        lastName: '',
                        password: '',
                        passwordConfirmation: ''
                    }}
                    validationSchema={RegisterValidator}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        axios
                            .post('/api/v1/auth/signup', values)
                            .then(res => {
                                resetForm({
                                    email: '',
                                    firstName: '',
                                    lastName: '',
                                    password: '',
                                    passwordConfirmation: ''
                                });

                                const user_token = res.data.data.token;
                                const user_data = res.data.data.user;
                                setAuth(prevAuth => {
                                    prevAuth.token = user_token;
                                    prevAuth.user = user_data;
                                });
                                localStorage.setItem('token', user_token);
                                setSubmitting(false);
                            })
                            .catch(e => {
                                setSubmitting(false);
                            });
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting
                    }) => (
                        <form
                            onSubmit={handleSubmit}
                            className="shadow-custom px-16 py-5 pb-8 sm:w-12/12 sm:rounded-54 bg-white text-center"
                        >
                            <InputForm
                                details={{
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    name: 'firstName',
                                    labelName: ' First-name',
                                    id: 'firstName',
                                    type: 'text',
                                    value: values.firstName
                                }}
                            />
                            <InputForm
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                name='lastName'
                                labelName=' Last-name'
                                id='lastName'
                                type='text'
                                value={values.lastName}
                            />
                            <InputForm
                                details={{
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    name: 'email',
                                    labelName: 'Email',
                                    id: 'email',
                                    type: 'email',
                                    value: values.email
                                }}
                            />
                            <InputForm
                                details={{
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    name: 'password',
                                    labelName: 'Password',
                                    id: 'password',
                                    type: 'password',
                                    value: values.password
                                }}
                            />
                            <InputForm
                                details={{
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    name: 'passwordConfirmation',
                                    labelName: 'Confirm password',
                                    id: 'con-password',
                                    type: 'password',
                                    value: values.passwordConfirmation
                                }}
                            />
                            <Button details={isSubmitting}>Register</Button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Register;
