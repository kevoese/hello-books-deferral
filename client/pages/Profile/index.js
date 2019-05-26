import React, { useState, useContext, useRef } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import AuthNavbar from '@components/authNavbar';
import SideNavbar from '@components/sideNavbar';
import { ProfileValidator } from '@clientValidators/Profile';
import context from '@context/authContext';
import Button from '@components/Button';
import InputForm from '@components/InputForm';
import Footer from '@components/Footer';

let initialFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    avatar: '/images/userimage.png'
};
let userId;
let selectedImage = '';
const Profile = () => {
    const inputEl = useRef(null);
    const { AuthContext } = context;
    const [auth] = useContext(AuthContext);

    if (auth.user) {
        initialFormValues = {
            firstName: auth.user.firstName || '',
            lastName: auth.user.lastName || '',
            email: auth.user.email || '',
            bio: auth.user.bio || '',
            avatar: auth.user.avatar || '/images/userimage.png'
        };
        userId = auth.user.id;
    }
    const [profileImage, setProfileImage] = useState(initialFormValues.avatar);
    const [profileImageName, setprofileImageName] = useState('');
    const CLOUDINARY_URL =
        'https://api.cloudinary.com/v1_1/deferral-hello-books/upload';
    const CLOUDINARY_UPLOAD_PRESET = 'hwmdjyvu';

    const selectProfileImage = event => {
        const files = event.target.files;
        if (files && files[0]) {
            selectedImage = files[0];
            setprofileImageName(event.target.value.split(/(\\|\/)/g).pop());
            const reader = new FileReader();
            reader.onload = e => setProfileImage(e.target.result);
            reader.readAsDataURL(files[0]);
        }
    };

    return (
        <React.Fragment>
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
                                initialValues={{}}
                                validationSchema={ProfileValidator}
                                onSubmit={async (
                                    values,
                                    { setStatus, setSubmitting, resetForm }
                                ) => {
                                    try {
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
                                            values.avatar =
                                                cloudinaryResponse.data.secure_url;
                                        }
                                        if (
                                            initialFormValues.email ==
                                            values.email
                                        )
                                            delete values.email;
                                        const res = await axios.patch(
                                            `/api/v1/profile/${userId}`,
                                            values
                                        );
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
                                        setStatus(e);
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
                                            {!!status && (
                                                <FormError>{status}</FormError>
                                            )}
                                        </div>
                                        <div className="sm:w-2/5 p-10 sm:pl-5 w-100">
                                            <div className="w-48 h-48 rounded-full bg-gray-250  overflow-hidden mx-auto relative">
                                                <img
                                                    className="absolute m-auto inset-0 object-cover"
                                                    src={profileImage}
                                                    alt="user image"
                                                />
                                            </div>
                                            <div className="w-full relative -mt-5 text-center">
                                                <input
                                                    type="file"
                                                    ref={inputEl}
                                                    className="hidden"
                                                    onChange={
                                                        selectProfileImage
                                                    }
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        inputEl.current.click()
                                                    }
                                                    className=""
                                                >
                                                    <img
                                                        className=""
                                                        src={
                                                            '/images/upload.png'
                                                        }
                                                        alt="user image"
                                                    />
                                                </button>
                                                <h4>{profileImageName}</h4>
                                                {profileImage !=
                                                    '/images/userimage.png' && (
                                                    <Button
                                                        clicked={() => {
                                                            selectedImage = '';
                                                            setProfileImage(
                                                                '/images/userimage.png'
                                                            );
                                                            setprofileImageName(
                                                                ''
                                                            );
                                                        }}
                                                    >
                                                        Clear
                                                    </Button>
                                                )}
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
