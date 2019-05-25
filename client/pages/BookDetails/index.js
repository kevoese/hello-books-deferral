import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@components/Button';

const BookDetails = props => {
    let valueMarkup;
    const bookId = props.match.params.bookId;
    const [url] = useState(`/api/v1/books/${bookId}`);
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get(url);
            setIsLoading(false);
            setData(response.data.data);
        } catch (err) {
            if (err.response.status === 404) {
                setData(err.response.status);
            }
        }
    };

    useEffect(() => {
        setIsLoading(true);
        fetchData();
    }, [url]);

    if (isLoading) {
        valueMarkup = (
            <div className="w-full bg-transparent mt-4 flex flex-row items-center justify-center">
                <p className="p-16 h-64 text-blue-600 text-3xl">
                    {data == 404 ? 'Book not found' : 'Loading...'}
                </p>
            </div>
        );
    } else {
        valueMarkup = (
            <div className="flex flex-row my-16 mx-10">
                <div className="flex w-0" />
                <div className="text-sm text-center lg:mr-5 xl:mr-5">
                    <Link
                        className="font-raleway inline-block text-sm px-4 py-2 pr-10 pl-10 border-400 rounded-full text-blue-500 border border-blue-500 hover:border-transparent hover:bg-white mt-4 shadow lg:mt-0"
                        to="/books"
                    >
                        Back
                    </Link>
                </div>
                <div className="flex w-3/4 shadow-lg rounded-lg">
                    <div className="flex-1 text-gray-700 text-center px-4 py-2 m-2">
                        <div className="max-w-sm rounded overflow-hidden">
                            <img
                                className="w-4/5 -px-5 float-right"
                                src="/images/notebook.png"
                                alt="Sunset in the mountains"
                            />
                        </div>
                    </div>
                    <div className="flex-1 text-gray-700  px-2 py-2 m-2">
                        <div className="px-6 py-4 float-left">
                            <p className="sm:text-lg md:text-xl tracking-wider font-semibold text-base font-robotoMono">
                                {data.title}
                            </p>
                            <p className="text-sm text-gray-700 font-robotoMono tracking-tight">
                                By Laura Gift
                            </p>
                            <p className="uppercase text-red-400 text-xs font-semibold font-robotoMono mt-2">
                                {data.copiesAvailable
                                    ? 'Available'
                                    : 'Unavailable'}
                            </p>
                            <p className="text-gray-700 text-base my-8">
                                {data.description}
                            </p>
                            <Button> Borrow </Button>
                        </div>
                    </div>
                </div>
                <div className="flex  w-32" />
            </div>
        );
    }

    return <Fragment>{valueMarkup}</Fragment>;
};

export default BookDetails;
