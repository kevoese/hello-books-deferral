import React, { useState, useEffect, Fragment, useLayoutEffect } from 'react';
import axios from 'axios';
import Book from '@components/Book';
import Footer from '@components/Footer';

const BookRow = props => {
    return (
        <div
            className="w-full flex flex-col items-center
        lg:flex-row lg:h-80 lg:justify-between"
        >
            {props.props[0] || ''}
            {props.props[1] || ''}
            {props.props[2] || ''}
            {props.props[3] || ''}
        </div>
    );
};

const Books = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(18);
    const [url, setUrl] = useState(`/api/v1/books?page=${page}&limit=${limit}`);
    const [data, setData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const loadBooks = data => {
        if (data.length < 1) {
            return Loading;
        }
        const detail = [];
        data.map(item => {
            detail.push(<Book key={item.id} {...item} />);
        });
        const row = [];
        for (let i = 0; i < detail.length; i += 3) {
            row.push(detail.slice(i, i + 3));
        }
        const finishedRow = row.map((item, index) => (
            <BookRow key={index} props={item} />
        ));
        return finishedRow;
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
        const { name } = e.target;
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
        <Fragment>
            <div className="m-6 ml-4 mr-10">
                <div className="flex flex-col-reverse bg-transparent lg:flex-row mx-4 w-full justify-center items-center">
                    <button
                        className="flex flex-row items-center rounded p-2 mr-3 pr-10 pl-4 uppercase text-lg font-semibold
                    tracking-widest text-black-1000 bg-blue-200 hover:bg-blue-300 bg-blue-11000 w-40 mt-2 mb-4 lg:mt-0"
                    >
                        <div className="pt-1">
                            <div className="border-t-2 border-black w-3 mb-1" />
                            <div className="border-t-2 border-black w-3 mb-1" />
                            <div className="border-t-2 border-black w-3 mb-1" />
                        </div>
                        <p className="ml-2 font-raleway">Filter</p>
                    </button>
                    <input
                        type="text"
                        placeholder="search for books"
                        className="bg-gray-200 rounded-full w-full p-2 text-black-1000
                    focus:rounded-full pl-6 font-semibold text-sm font-raleway bg-light-gray"
                    />
                </div>
                <div>{isLoading ? Loading : loadBooks(data)}</div>
                <div className="mt-10 bg-transparent flex flex-row justify-between items-center ml-4 mr-4">
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
                <Footer />
            </div>
        </Fragment>
    );
};

export default Books;
