import React from 'react';
import { Link } from 'react-router-dom';

const Book = ({ id, title, copiesAvailable, authors, price, coverImage }) => {
    return (
        <div
            className="relative flex flex-col h-72 w-3/4 bg-transparent shadow-md mt-8
        lg:h-64 lg:w-1/3 mx-4 cursor-pointer"
        >
            <Link to={`/books/${id}`}>
                <div className="flex justify-center mt-2">
                    <img
                        src={coverImage ? coverImage : '/images/notebook.png'}
                        className="h-40 w-40 justify-center z-30"
                    />
                </div>
                <div
                    className="absolute inset-x-0 bottom-1 border border-gray-100 h-40 mx-3 pr-2
                flex flex-row justify-between p-2"
                >
                    <div className="flex flex-col w-4/5 self-end pt-2">
                        <p className="text-sm tracking-wider text-base font-robotoMono">
                            {title}
                        </p>
                        <p className="text-xxs text-gray-700 font-robotoMono tracking-tight">
                            {authors && authors[0] && authors[0].name}
                        </p>
                    </div>

                    <div className="flex flex-col w-1/5 self-end">
                        <p className="uppercase text-red-400 font-semibold text-xs font-semibold font-robotoMono mt-2">
                            {copiesAvailable === 0
                                ? 'UNAVAILABLE'
                                : 'AVAILABLE'}
                        </p>
                        <p className="font-semibold">N{price}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Book;
