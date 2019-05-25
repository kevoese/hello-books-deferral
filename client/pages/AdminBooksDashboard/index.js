import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '@components/Footer';
import AdminSideNav from '@components/adminSideNav';
import TableRowItems from '@components/TableRow';

const AdminBooksDashboard = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [url, setUrl] = useState(`/api/v1/books?page=${page}&limit=${limit}`);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

    const loadBooks = data => {
        if (data.length < 1) {
            return Loading;
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

    const Loading = (
        <div className="w-full bg-transparent mt-4 flex flex-row items-center justify-center">
            <p className="p-16 h-64 text-blue-600 text-6xl">
                Loading <span className="text-orange-600">.</span>
                <span className="text-blue-500">.</span>
                <span className="text-yellow-500">.</span>
            </p>
        </div>
    );

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
                                <button className="font-raleway p-4 rounded-full bg-blue-450 shadow-xl ">
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
                                    {isLoading ? Loading : loadBooks(data)}
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
            <Footer />
        </React.Fragment>
    );
};

export default AdminBooksDashboard;
