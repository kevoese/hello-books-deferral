import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Footer from '@components/Footer';
import AuthContext from '@context/authContext';
import ToastContext from '@context/toastContext';
import SideNavbar from '@components/sideNavbar';
import FineRowData from '@components/FineRow';

const { AuthContext: Auth } = AuthContext;
const { ToastContext: Toast } = ToastContext;

const Fines = () => {
    const [page, setPage] = useState(1);
    const [auth] = useContext(Auth);
    const [toast, showToast] = useContext(Toast);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(5);
    const [url, setUrl] = useState(`/api/v1/fines?page=${page}&limit=${limit}`);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentlyPayingFine, setCurrentlyPayingFine] = useState(null);
    const [makingPayment, setMakingPayment] = useState(false);

    const handlePay = id => {
        setMakingPayment(true);

        setCurrentlyPayingFine(data.find(fine => fine.id === id));
    };

    const Table = items => {
        const detail = [];

        items.map(item => {
            detail.push(
                <FineRowData key={item.id} {...item} handlePay={handlePay} />
            );
        });

        return (
            <table className="mt-0 mb-6 w-full">
                <thead>
                    <tr className="bg-gray-10">
                        <th className="font-raleway uppercase text-sm font-semiBold py-4 w-1/6 ">
                            Issued on
                        </th>
                        <th className="font-raleway uppercase text-sm font-semiBold py-4 w-1/6 ">
                            type
                        </th>
                        <th className="font-raleway uppercase text-sm font-semiBold py-4 w-1/6 ">
                            description
                        </th>
                        <th className="font-raleway uppercase text-sm font-semiBold py-4 w-1/6 ">
                            amount
                        </th>
                        <th className="font-raleway uppercase text-sm font-semiBold py-4 w-1/6 ">
                            Status
                        </th>
                        <th className="font-raleway uppercase text-sm font-semiBold py-4  w-1/6">
                            Action
                        </th>
                    </tr>
                </thead>
                {items.length > 0 && <tbody>{detail}</tbody>}
                {items.length === 0 && (
                    <tbody>
                        <tr>
                            <td colSpan="6">No items</td>
                        </tr>
                    </tbody>
                )}
            </table>
        );
    };

    const loadFines = data => {
        if (isLoading) {
            return Loading;
        }

        return Table(data);
    };

    const fetchData = async () => {
        const options = {
            method: 'GET',
            headers: { 'x-access-token': localStorage.token },
            url: '/api/v1/fines'
        };
        try {
            const response = await axios(options);

            setData(response.data.data);
            setTotalPages(response.data.data.length);
            setIsLoading(false);
        } catch (err) {
            return err;
        }
    };

    const changePage = e => {
        const { name, value } = e.target;
        if (name == 'next' && page <= totalPages) {
            setPage(page + 1);
            return setUrl(`/api/v1/fines?page=${page}&limit=${limit}`);
        }
        if (name === 'prev' && page !== 1) {
            setPage(page - 1);
            return setUrl(`/api/v1/fines?page=${page}&limit=${limit}`);
        }
        return;
    };

    useEffect(() => {
        if (makingPayment) {
            document.getElementById('paystack-button').click();
        }
    }, [makingPayment]);

    useEffect(() => {
        setIsLoading(true);
        fetchData();
    }, [url]);

    const Loading = (
        <div className="w-full bg-transparent mt-4 flex flex-row items-center justify-center">
            <p className="p-16 h-64 text-blue-600 text-6xl">
                Loading <span className="text-orange-600">.</span>
                <span className="text-blue-500">.</span>
                <span className="text-yellow-500">.</span>
            </p>
        </div>
    );

    const openPaystackModal = () => {
        PaystackPop.setup({
            key: process.env.PAYSTACK_PUBLIC_KEY,
            email: auth.user.email,
            currency: 'NGN',
            amount: parseInt(currentlyPayingFine.amount) * 100,
            callback: ({ reference }) => {
                setCurrentlyPayingFine(null);
                setMakingPayment(false);

                axios
                    .post(
                        `/api/v1/fines/pay`,
                        {
                            reference,
                            fineId: currentlyPayingFine.id
                        },
                        {
                            headers: { 'x-access-token': localStorage.token }
                        }
                    )
                    .then(() => {
                        showToast('success', 'Payment successful.');
                        fetchData();
                    })
                    .catch(() => {
                        showToast('error', 'Payment failed.');
                    });
            },
            onClose: () => {
                setCurrentlyPayingFine(null);
                setMakingPayment(false);
            }
        }).openIframe();
    };

    return (
        <Fragment>
            <Helmet>
                <title>Patron Fines</title>
                <script src="https://js.paystack.co/v1/inline.js" />
            </Helmet>
            {makingPayment && (
                <form>
                    <button
                        className="hidden"
                        id="paystack-button"
                        type="button"
                        onClick={openPaystackModal}
                    >
                        {' '}
                        Pay{' '}
                    </button>
                </form>
            )}
            <div className="flex md:flex-row flex-wrap min-h-screen">
                <SideNavbar />
                <div className="w-full md:w-5/6 bg-gray-10 text-center text-gray-700 ">
                    <div className="m-2">
                        <div className="mt-2 bg-transparent px-2 py-4 flex flex-row justify-between items-center ml-4 mr-4">
                            <div className="flex ">
                                <h5 className="font-raleway text-xl text-black font-bold">
                                    All Fines
                                </h5>
                            </div>
                        </div>
                        <div className="flex mt-2 mb-16 ">
                            <div className="w-full mx-2">
                                <div className="shadow-lg mr-2 bg-white">
                                    {isLoading ? Loading : loadFines(data)}
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
        </Fragment>
    );
};

export default Fines;
