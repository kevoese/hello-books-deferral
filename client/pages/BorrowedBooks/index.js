import React, { useState, useEffect, useContext } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AdminSideNav from '@components/AdminSideNav';
import Footer from '@components/Footer';
import BorrowedBookRow from '@components/BorrowedBookRow';
import { getDateStr } from '@clientUtils';
import axios from 'axios';
import Button from '@components/Button';
import Loading from '@components/Loading';
import Modal from '@components/Modal';
import toastcontext from '@context/toastContext';

const BorrowedBooks = () => {
    const headings = [
        'Title',
        'Publisher',
        'Year',
        'Due Date',
        'Status',
        'Action'
    ];

    const [isLoading, setIsLoading] = useState(false);
    const [bookData, setbookData] = useState([]);
    const [bookId, setbookId] = useState();
    const [isVisible, changeVisibility] = useState(false);
    const { ToastContext } = toastcontext;
    const [toast, showToast] = useContext(ToastContext);

    const fetchData = () => {
        const options = {
            method: 'GET',
            headers: { 'x-access-token': localStorage.token },
            url: '/api/v1/books/borrow'
        };
        axios(options)
            .then(res => {
                setbookData(() => res.data.data);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        setIsLoading(true);
        fetchData()
    }, []);

    const extendBook = bookId => {
        changeVisibility(!isVisible);
        setbookId(bookId);
    };

    const handleCut = resetForm => {
        changeVisibility(!isVisible);
        resetForm({ days: '' });
    };
    const bookList = bookData.length ? (
        bookData.map(book => {
            const { title, publisher, year, dueDate, status } = book;
            const bookObj = {
                title,
                publisher,
                year,
                dueDate: dueDate && getDateStr(dueDate),
                status,
                action: 'extend'
            };

            return (
                <BorrowedBookRow
                    key={book.id}
                    bookId={book.id}
                    action={'Extend'}
                    contents={Object.values(bookObj)}
                    extendBook={extendBook}
                />
            );
        })
    ) : isLoading ? (
        <Loading />
    ) : (
        <h2 className="text-2xl py-2 text-center ">
            You don't have any borrowed books
        </h2>
    );

    return (
        <React.Fragment>
            <div className="flex md:flex-row flex-wrap min-h-screen">
                <AdminSideNav />
                <div className=" relative w-full md:w-5/6 bg-gray-20 text-center text-gray-700 px-4 py-4">
                    <header className="font-raleway font-bold text-black px-2 text-2xl text-left mb-4">
                        All Borrowed Books
                    </header>
                    <div className="px-2">
                        <BorrowedBookRow
                            transform="uppercase font-semibold"
                            contents={headings}
                        />

                        <div className="bg-white">{bookList}</div>
                    </div>
                    <Modal modalState={isVisible}>
                        <Formik
                            initialValues={{ days: '' }}
                            onSubmit={(
                                values,
                                { setFieldError, setSubmitting, resetForm }
                            ) => {
                                const options = {
                                    method: 'PATCH',
                                    data: { days: values.days },
                                    headers: {
                                        'x-access-token': localStorage.token
                                    },
                                    url: `/api/v1/books/${bookId}/extend`
                                };
                                setSubmitting(true);
                                axios(options)
                                    .then(res => {
                                        showToast('success', res.data.data.message)
                                        resetForm({
                                            days: ''
                                        });
                                        fetchData();
                                        setSubmitting(false);
                                        changeVisibility(false);
                                    })
                                    .catch(e => {
                                        setFieldError(
                                            'days',
                                            e.response.data.code.message
                                        );
                                        showToast('error', e.response.data.code.message);
                                        setSubmitting(false);
                                    });
                            }}
                            validationSchema={Yup.object().shape({
                                days: Yup.number('Number in days')
                                    .min(1, 'Minimum of 1 day')
                                    .max(
                                        7,
                                        'You cannot extend a book above 7 days'
                                    )
                                    .required('Please enter the number of days')
                            })}
                        >
                            {props => {
                                const {
                                    values,
                                    touched,
                                    errors,
                                    isSubmitting,
                                    handleChange,
                                    handleBlur,
                                    resetForm,
                                    handleSubmit
                                } = props;
                                return (
                                    <form
                                        onSubmit={handleSubmit}
                                        className="relative w-10/12 max-w-450 sm:w-1/2 py-8 pt-6 bg-white px-4 z-40"
                                    >
                                        <div
                                            className="absolute top-1 right-1 h-4 w-4 bg-no-repeat bg-center bg-cover cursor-pointer"
                                            onClick={() => handleCut(resetForm)}
                                            style={{
                                                backgroundImage: `url(/images/cut.png)`
                                            }}
                                        />
                                        {(
                                            <div>
                                                <label
                                                    htmlFor="days"
                                                    className="font-raleway text:md w-10/12 text-left py-2"
                                                >
                                                    Days to extend
                                                </label>
                                                <input
                                                    id="days"
                                                    name="days"
                                                    placeholder="Enter the number of days"
                                                    type="number"
                                                    value={values.days}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className="block border mt-2 rounded-10 py-1 px-2 text-sm border-gray-600 mx-auto font-robotoMono w-10/12"
                                                />
                                                {errors.days &&
                                                    touched.days && (
                                                        <div className="text-red-600">
                                                            {errors.days}
                                                        </div>
                                                    )}
                                                <Button
                                                    isSubmitting={isSubmitting}
                                                >
                                                    Extend
                                                </Button>
                                            </div>
                                        )}
                                    </form>
                                );
                            }}
                        </Formik>
                    </Modal>
                </div>
            </div>

            <Footer />
        </React.Fragment>
    );
};

export default BorrowedBooks;
