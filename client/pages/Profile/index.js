import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import AuthNavbar from '@components/authNavbar';
import SideNavbar from '@components/sideNavbar';
import { ProfileValidator } from '@clientValidators/Profile';
import Button from '@components/Button';
import InputForm from '@components/InputForm';
import Footer from '@components/Footer';

const EmptyFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    bio: ''
};
let selectedImage = '';
const Profile = () => {
    const [errorState, setErrorState] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [initialFormValues, setInitialFormValues] = useState(EmptyFormValues);
    const CLOUDINARY_URL =
        'https://api.cloudinary.com/v1_1/deferral-hello-books/upload';
    const CLOUDINARY_UPLOAD_PRESET = 'hwmdjyvu';

    const selectProfileImage = event => {
        console.log(event.target.files);
        if (event.target.files && event.target.files[0])
            selectedImage = event.target.files[0];
    };

    const handleError = response => {
        response
            ? setErrorMessage(response.data.code.error)
            : setErrorMessage('Network Error!');
        setErrorState(true);
    };

    useEffect(() => {
        axios
            .get('/api/v1/profile/1')
            .then(res => {
                console.log(res.data.data);
                const firstName = res.data.data.firstName || '';
                const lastName = res.data.data.lastName || '';
                const email = res.data.data.email || '';
                const bio = res.data.data.bio || '';
                setProfileImage(
                    res.data.data.avatar || '/images/userimage.png'
                );
                setInitialFormValues({ firstName, lastName, email, bio });
            })
            .catch(({ response }) => {
                console.log(response);
                setInitialFormValues(EmptyFormValues);
            });
    }, []);

    return (
        <React.Fragment>
            <AuthNavbar />
            <div className="flex md:flex-row flex-wrap min-h-screen">
                <SideNavbar />
                <div className="w-full font-raleway md:w-5/6 bg-gray-250 text-gray-700">
                    <div className="m-8">
                        <h1 className="text-3xl font-bold">User Profile</h1>
                    </div>
                    <div className="lg:mx-24 md:mx-12 mx-0 my-10 bg-white md:rounded-10 pb-16">
                        <h3 className="text-lg px-10 py-6 border-b-2 opacity-75 text-gray-550 border-gray-300 border-solid">
                            EDIT ACCOUNT INFORMATION
                        </h3>
                        <div className="w-full">
                            <Formik
                                enableReinitialize={true}
                                initialValues={initialFormValues}
                                validationSchema={ProfileValidator}
                                onSubmit={async (
                                    values,
                                    { setSubmitting, resetForm }
                                ) => {
                                    setErrorState(false);
                                    try {
                                        console.log(profileImage);
                                        if (selectedImage) {
                                            const formdata = new FormData();
                                            formdata.append(
                                                'file',
                                                selectedImage
                                            );
                                            formdata.append(
                                                'upload_preset',
                                                CLOUDINARY_UPLOAD_PRESET
                                            );
                                            const cloudinaryResponse = await axios(
                                                {
                                                    method: 'post',
                                                    url: CLOUDINARY_URL,
                                                    headers: {
                                                        'Content-Type':
                                                            'application/x-www-form-urlencoded'
                                                    },
                                                    data: formdata
                                                }
                                            );
                                            console.log(cloudinaryResponse);
                                            values.avatar =
                                                cloudinaryResponse.data.secure_url;
                                        }
                                        const res = await axios.patch(
                                            '/api/v1/profile',
                                            values
                                        );
                                        console.log(res);
                                        resetForm({
                                            firstName:
                                                res.data.data.firstName || '',
                                            lastName:
                                                res.data.data.lastName || '',
                                            email: res.data.data.email || '',
                                            bio: res.data.data.bio || ''
                                        });
                                        selectedImage = '';
                                        setProfileImage(
                                            res.data.data.avatar ||
                                                '/images/userimage.png'
                                        );
                                    } catch (e) {
                                        console.log(e);
                                        handleError(e);
                                        setSubmitting(false);
                                    }
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
                                        className="w-full flex flex-col sm:flex-row flex-col-reverse"
                                    >
                                        <div className="sm:w-3/5 w-100 px-10 sm:pr-5">
                                            <div className="mb-8">
                                                <InputForm
                                                    block="true"
                                                    classes="bg-white border-2"
                                                    errors={errors}
                                                    touched={touched}
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    name="firstName"
                                                    labelname="First Name"
                                                    id="firstName"
                                                    type="text"
                                                    value={values.firstName}
                                                />
                                                <InputForm
                                                    block="true"
                                                    classes="bg-white border-2"
                                                    errors={errors}
                                                    touched={touched}
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    name="lastName"
                                                    labelname="Last Name"
                                                    id="lastName"
                                                    type="text"
                                                    value={values.lastName}
                                                />
                                                <InputForm
                                                    block="true"
                                                    classes="bg-white border-2"
                                                    errors={errors}
                                                    touched={touched}
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    name="email"
                                                    labelname="Email"
                                                    id="email"
                                                    type="text"
                                                    value={values.email}
                                                />
                                                <InputForm
                                                    block="true"
                                                    inputtype="textarea"
                                                    classes="bg-white border-2 h-32"
                                                    errors={errors}
                                                    touched={touched}
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    name="bio"
                                                    labelname="Bio"
                                                    id="bio"
                                                    type="text"
                                                    value={values.bio}
                                                />
                                            </div>
                                            <div className="sm:text-left text-center w-full">
                                                <Button
                                                    isSubmitting={isSubmitting}
                                                >
                                                    Update Profile
                                                </Button>
                                            </div>
                                            {errorState && (
                                                <div className="font-raleway py-3 pb-0  bottom-0  w-full px-4 text-lg sm:px-0 text-red-500 text-center ">
                                                    {errorMessage}
                                                </div>
                                            )}
                                        </div>
                                        <div className="sm:w-2/5 p-10 sm:pl-5 w-100">
                                            <img
                                                className="mx-auto"
                                                src={profileImage}
                                                alt="reading list"
                                            />
                                            <div className="w-full mt-5 text-center">
                                                <input
                                                    type="file"
                                                    className=""
                                                    onChange={
                                                        selectProfileImage
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
};

export default Profile;
