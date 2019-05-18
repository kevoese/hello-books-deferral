import React, { useContext } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

const SignUp = () => {
    const [auth, setAuth] = useContext(AuthContext);

    return (
        <div>
            <h1>Sign Up</h1>
            <Formik
                initialValues={{
                    email: '',
                    firstName: '',
                    password: '',
                    lastName: '',
                    passwordConfirmation: ''
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email()
                        .required('Required'),
                    firstName: Yup.string().required(),
                    lastName: Yup.string().required(),
                    password: Yup.string()
                        .required('Password is required')
                        .min(8, 'Password must be greater than 8 characters'),
                    passwordConfirmation: Yup.string().oneOf(
                        [Yup.ref('password'), null],
                        'Passwords must match'
                    )
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    axios
                        .post('/api/v1/auth/signup', {
                            ...values
                        })
                        .then(res => {
                            resetForm({
                                email: '',
                                firstName: '',
                                lastName: '',
                                password: '',
                                passwordConfirmation: ''
                            });
                            alert(res.data.data.message);
                            const user_token = res.data.data.token;
                            const user_data = res.data.data.user;
                            setAuth(prevAuth => {
                                prevAuth.token = user_token;
                                prevAuth.user = user_data;
                            });
                            setSubmitting(false);
                        })
                        .catch(e => {
                            setSubmitting(false);
                            alert('An Error must have occurred');
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
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                        />
                        {errors.firstName &&
                            touched.firstName &&
                            errors.firstName}
                        <br />
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}
                        />
                        {errors.lastName && touched.lastName && errors.lastName}
                        <br />
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {errors.email && touched.email && errors.email}
                        <br />
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {errors.password && touched.password && errors.password}
                        <br />
                        <label htmlFor="con-password">Confirm Password</label>
                        <input
                            id="con-password"
                            type="password"
                            name="passwordConfirmation"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.passwordConfirmation}
                        />
                        {errors.passwordConfirmation &&
                            touched.passwordConfirmation &&
                            errors.passwordConfirmation}
                        <br />
                        <br />
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default SignUp;
