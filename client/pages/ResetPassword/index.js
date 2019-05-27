import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import InputForm from '@components/InputForm';
import Button from '@components/Button';
import { ResetPasswordValidator } from '@clientValidators/Auth';
import context from '@context/toastContext';

const { ToastContext } = context;
const ResetPassword = ({ match, history }) => {
    const [toast, showToast] = useContext(ToastContext);

    return (
        <React.Fragment>
            <div
                className="mt-0 lg:-mt-18 bg-no-repeat bg-center bg-cover flex flex-col items-center min-h-screen"
                style={{ background: `url(/images/12.jpg)` }}
            >
                <div
                    className="flex-grow flex flex-col items-center justify-center
                relative inline-block px-0 my-18 sm:w-9/12 mb-8 max-w-custom w-500"
                >
                    <h1 className="font-raleway text-5xl text-gray-550 text-center mt-10 mb-5 mt-0">
                        Reset Password
                    </h1>
                    <Formik
                        initialValues={{
                            password: '',
                            passwordConfirmation: ''
                        }}
                        validationSchema={ResetPasswordValidator}
                        onSubmit={(
                            values,
                            { setSubmitting, resetForm, setError }
                        ) => {
                            values.token = match.params.token;
                            axios
                                .patch('/api/v1/auth/reset', values)
                                .then(res => {
                                    resetForm({
                                        password: '',
                                        passwordConfirmation: ''
                                    });
                                    setSubmitting(false);
                                    showToast('success', res.data.data.message);
                                    history.push('/signin');
                                })
                                .catch(({ response }) => {
                                    response.data &&
                                        response.data.message &&
                                        response.data.message[0] &&
                                        setError(
                                            response.data.message[0].message
                                        );
                                    setSubmitting(false);
                                });
                        }}
                    >
                        {({
                            error,
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
                                    errors={errors}
                                    touched={touched}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    name="password"
                                    labelname="Password"
                                    id="password"
                                    type="password"
                                    value={values.password}
                                />
                                <InputForm
                                    errors={errors}
                                    touched={touched}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    name="passwordConfirmation"
                                    labelname="Confirm password"
                                    id="con-password"
                                    type="password"
                                    value={values.passwordConfirmation}
                                />

                                <Button isSubmitting={isSubmitting}>
                                    Submit
                                </Button>
                                {error && (
                                    <div className="font-raleway py-3 pb-0  bottom-0  w-full px-4 text-lg sm:px-0 text-red-500 text-center ">
                                        {error}
                                    </div>
                                )}
                            </form>
                        )}
                    </Formik>
                </div>
                <div className="w-full bg-gray-550 py-2 opacity-50">
                    <h5 className="text-center font-bold text-white">
                        @ Copyright {new Date().getFullYear()}
                    </h5>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ResetPassword;
