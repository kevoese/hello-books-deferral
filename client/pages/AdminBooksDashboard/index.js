import React, { useState, useEffect, useContext, useRef } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import InputForm from '@components/InputForm';
import Button from '@components/Button';
import { AddBookValidator } from '@clientValidators/Book';
import Footer from '@components/Footer';
import AdminSideNav from '@components/AdminSideNav';
import TableRowItems from '@components/TableRow';
import Modal from '@components/Modal';
import Loading from '@components/Loading';
import ToastContext from '@context/toastContext';
import AuthContext from '@context/authContext';

const { AuthContext: Auth } = AuthContext;
const { ToastContext: Toast } = ToastContext;

const Table = items => {
    const detail = [];

    items.map(item => {
        detail.push(<TableRowItems key={item.id} {...item} />);
    });

    return (
        <table className="mt-4 mb-6 w-full">
            <thead>
                <tr className="bg-gray-10">
                    <th className="font-raleway text-sm font-semiBold py-4 w-1/6 ">
                        TITLE
                    </th>
                    <th className="font-raleway text-sm font-semiBold py-4 w-1/6 ">
                        AUTHOR
                    </th>
                    <th className="font-raleway text-sm font-semiBold py-4 w-1/6 ">
                        YEAR
                    </th>
                    <th className="font-raleway text-sm font-semiBold py-4 w-1/6 ">
                        ISBN
                    </th>
                    <th className="font-raleway text-sm font-semiBold py-4 w-1/6 ">
                        COPIES AVAILABLE
                    </th>
                    <th className="font-raleway text-sm font-semiBold py-4  w-1/6">
                        ACTIONS
                    </th>
                </tr>
            </thead>
            <tbody>{detail}</tbody>
        </table>
    );
};

let selectedImage = '';

const AdminBooksDashboard = () => {
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [authors, setAuthors] = useState([])
    const [url, setUrl] = useState(`/api/v1/books?page=${page}&limit=${limit}`);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalState, setModalState] = useState(false);
    const [errorState, setErrorState] = useState(false);
    const [coverImage, setCoverImage] = useState('/images/notebook.png');
    const [coverImageName, setCoverImageName] = useState('');
    const [auth] = useContext(Auth);

    const inputEl = useRef(null);

    const [toast, showToast] = useContext(Toast);

    useEffect(() => {
        axios.get(`/api/v1/authors`)
            .then(({ data: { data: { results } } }) => {
                setAuthors(results.map(({ id, name }) => ({ value: id, label: name })))
            })
    }, [])

    const CLOUDINARY_URL =
        'https://api.cloudinary.com/v1_1/deferral-hello-books/upload';
    const CLOUDINARY_UPLOAD_PRESET = 'hwmdjyvu';

    const selectCoverImage = event => {
        const files = event.target.files;
        if (files && files[0]) {
            selectedImage = files[0];

            if (!selectedImage.type.match(/image/)) {
                showToast('error', 'Please select only an image.')
                return
            }
            setCoverImageName(event.target.value.split(/(\\|\/)/g).pop());
            const reader = new FileReader();
            reader.onload = e => setCoverImage(e.target.result);
            reader.readAsDataURL(files[0]);
        }
    };

    const loadBooks = data => {
        if (data.length < 1) {
            return <Loading />;
        }

        return Table(data);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(url);
            setData(response.data.data.results);
            setTotalPages(response.data.data.total);
            setIsLoading(false);
        } catch (err) {
            return err;
        }
    };

    const changePage = e => {
        const { name, value } = e.target;
        if (name == 'next' && page <= totalPages) {
            setPage(page + 1);
            return setUrl(`/api/v1/books?page=${page}&limit=${limit}`);
        }
        if (name === 'prev' && page !== 1) {
            setPage(page - 1);
            return setUrl(`/api/v1/books?page=${page}&limit=${limit}`);
        }
        return;
    };

    useEffect(() => {
        setIsLoading(true);
        fetchData();
    }, [url]);

    return (
        <React.Fragment>
            <div className="flex md:flex-row flex-wrap min-h-screen">
                <AdminSideNav />

                <div className="w-full md:w-5/6 bg-gray-10 text-center text-gray-700 ">
                    <div className="m-2">
                        <div className="mt-2 bg-transparent px-2 py-4 flex flex-row justify-between items-center ml-4 mr-4">
                            <div className="flex ">
                                <h5 className="font-raleway text-xl text-black font-bold">
                                    {' '}
                                    All Books
                                </h5>
                            </div>
                            <div className="flex pr-10 ">
                                <button
                                    className="font-raleway p-4 rounded-full bg-blue-450 shadow-xl "
                                    onClick={() => setModalState(true)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="19"
                                        fill="none"
                                    >
                                        <path
                                            d="M17.943 9.41c0 .833-.667 1.5-1.5 1.5h-6v5.667c0 .833-.667 1.5-1.5 1.5s-1.5-.667-1.5-1.5V10.91H1.776c-.833 0-1.5-.667-1.5-1.5s.667-1.5 1.5-1.5h5.667v-6c0-.833.667-1.5 1.5-1.5s1.5.667 1.5 1.5v6h6c.833 0 1.5.667 1.5 1.5z"
                                            fill="#fff"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex mt-2 mb-16 ">
                            <div className="w-full mx-2">
                                <div className="shadow-lg mr-2 bg-white">
                                    {isLoading ? <Loading /> : loadBooks(data)}
                                    <div className="mt-10 bg-transparent px-4 py-6 flex flex-row justify-between items-center ml-4 mr-4">
                                        <input
                                            type="button"
                                            name="prev"
                                            onClick={changePage}
                                            value="Previous Page"
                                            className="bg-blue-400 hover:bg-blue-300 p-2 cursor-pointer rounded outline-none font-semibold text-white shadow-md"
                                        />
                                        <input
                                            type="button"
                                            name="next"
                                            onClick={changePage}
                                            value="Next Page"
                                            className="bg-blue-400 hover:bg-blue-300 p-2 cursor-pointer rounded outline-none font-semibold text-white shadow-md"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal modalState={modalState} className=" ">
                <div className=" rounded-10  w-6/12 bg-white overflow-scroll ">
                    <div className="border-b flex flex-row  items-center  ">
                        <div className=" flex flex-1  p-2  mx-2 my-4">
                            <h6 className="font-raleway m-auto text-3xl font-bold ">
                                {' '}
                                Add New Book to Catalogue
                            </h6>
                        </div>
                        <div className=' flex flex-intial p-2 mx-4 my-2"'>
                            <button
                                onClick={() => setModalState(false)}
                                className=" text-xl p-2 text-gray-450"
                            >
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 22 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <line
                                        y1="-1"
                                        x2="27.8318"
                                        y2="-1"
                                        transform="matrix(0.718602 -0.695422 0.718602 0.695422 2 21)"
                                        stroke="black"
                                        strokeWidth="2"
                                    />
                                    <line
                                        y1="-1"
                                        x2="27.8318"
                                        y2="-1"
                                        transform="matrix(-0.718602 -0.695422 0.718602 -0.695422 22 20.3549)"
                                        stroke="black"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="p-4">
                        <Formik
                            initialValues={{
                                title: '',
                                author: '',
                                coverType: '',
                                year: '',
                                isbn: '',
                                description: '',
                                copiesAvailable: '',
                                price: '',
                                publisher: '',
                                coverImage
                            }}
                            validationSchema={AddBookValidator}
                            onSubmit={async (
                                values,
                                { setSubmitting, resetForm }
                            ) => {
                                setErrorState(false);
                                if (selectedImage) {
                                    const formdata = new FormData();
                                    formdata.append('file', selectedImage);
                                    formdata.append(
                                        'upload_preset',
                                        CLOUDINARY_UPLOAD_PRESET
                                    );
                                    const cloudinaryResponse = await axios({
                                        method: 'post',
                                        url: CLOUDINARY_URL,
                                        headers: {
                                            'Content-Type':
                                                'application/x-www-form-urlencoded'
                                        },
                                        data: formdata
                                    });
                                    values.coverImage =
                                        cloudinaryResponse.data.secure_url;
                                }

                                if (values.coverImage) {
                                    axios
                                        .post('/api/v1/books', {
                                            ...values,
                                            authors: [values.author]
                                        }, {
                                            headers: {
                                                'x-access-token': auth.token
                                            }
                                        })
                                        .then(res => {
                                            resetForm({
                                                title: '',
                                                author: '',
                                                coverType: '',
                                                year: '',
                                                isbn: '',
                                                description: '',
                                                copiesAvailable: '',
                                                price: '',
                                                publisher: ''
                                            });


                                            showToast('success', 'Book added to library.');
                                            setSubmitting(false);
                                            setModalState(false);
                                            fetchData();
                                        })
                                        .catch(({ response }) => {
                                            showToast('error', 'Some errors occured.');
                                            setSubmitting(false);
                                        });
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
                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-row bg-white text-center">
                                        <div className="mb-8 p-4 sm:w-1/2">
                                            <InputForm
                                                block="true"
                                                classes="bg-white border-2 "
                                                errors={errors}
                                                touched={touched}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                name="title"
                                                labelname="Title"
                                                id="title"
                                                type="text"
                                                value={values.title}
                                            />
                                            <InputForm
                                                block="true"
                                                classes="bg-white border-2 "
                                                errors={errors}
                                                touched={touched}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                name="author"
                                                labelname="Author"
                                                id="author"
                                                inputtype="select"
                                                options={authors}
                                                value={values.author}
                                            />
                                            <InputForm
                                                block="true"
                                                classes="bg-white border-2 "
                                                errors={errors}
                                                touched={touched}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                name="isbn"
                                                labelname="ISBN"
                                                id="isbn"
                                                type="text"
                                                value={values.isbn}
                                            />
                                            <InputForm
                                                block="true"
                                                classes="bg-white border-2 "
                                                errors={errors}
                                                touched={touched}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                name="copiesAvailable"
                                                labelname="Copies Available"
                                                id="copiesAvailable"
                                                type="number"
                                                value={values.copiesAvailable}
                                            />

                                            <InputForm
                                                block="true"
                                                classes="bg-white border-2 h-20"
                                                inputtype="textarea"
                                                errors={errors}
                                                touched={touched}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                name="description"
                                                labelname="Description"
                                                id="description"
                                                type="text"
                                                value={values.description}
                                            />
                                        </div>
                                        <div className="mb-8 p-4 w-full sm:w-1/2">
                                            <InputForm
                                                block="true"
                                                classes="bg-white border-2 "
                                                errors={errors}
                                                touched={touched}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                name="price"
                                                labelname="Price"
                                                id="price"
                                                type="number"
                                                value={values.price}
                                            />

                                            <InputForm
                                                block="true"
                                                classes="bg-white border-2 "
                                                errors={errors}
                                                touched={touched}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                name="year"
                                                labelname="Year"
                                                id="year"
                                                type="number"
                                                value={values.year}
                                            />

                                            <InputForm
                                                block="true"
                                                classes="bg-white border-2 "
                                                errors={errors}
                                                touched={touched}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                name="publisher"
                                                labelname="Publisher"
                                                id="publisher"
                                                type="text"
                                                value={values.publisher}
                                            />

                                            <InputForm
                                                block="true"
                                                inputtype="select"
                                                options={[
                                                    {
                                                        label: 'Hard',
                                                        value: 'Hard'
                                                    },
                                                    {
                                                        label: 'Soft',
                                                        value: 'Soft'
                                                    },
                                                    {
                                                        label: 'Normal',
                                                        value: 'Normal'
                                                    }
                                                ]}
                                                classes="bg-white border-2 "
                                                errors={errors}
                                                touched={touched}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                name="coverType"
                                                labelname="Cover Type"
                                                id="coverType"
                                                type="text"
                                                value={values.coverType}
                                            />

                                            <div className="font-raleway text-left text-gray-550 pt-4 pb-4">
                                                <p>Add a Book Cover</p>
                                            </div>

                                            <div className="w-48 h-48 rounded-0 bg-gray-250  overflow-hidden mx-auto relative">
                                                <img
                                                    className="absolute m-auto "
                                                    src={coverImage}
                                                    alt="user image"
                                                />
                                            </div>
                                            <div className="w-full relative -mt-5 text-center">
                                                <input
                                                    type="file"
                                                    ref={inputEl}
                                                    className="hidden"
                                                    onChange={selectCoverImage}
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
                                                <h4>{coverImageName}</h4>
                                                {coverImage !=
                                                    '/images/notebook.png' && (
                                                    <Button
                                                        clicked={() => {
                                                            selectedImage = '';
                                                            setCoverImage(
                                                                '/images/notebook.png'
                                                            );
                                                            setCoverImageName(
                                                                ''
                                                            );
                                                        }}
                                                    >
                                                        Clear
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <br />
                                    <div className=" text-center">
                                        <Button isSubmitting={isSubmitting}>
                                            Submit
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </Modal>
            <Footer />
        </React.Fragment>
    );
};

export default AdminBooksDashboard;
