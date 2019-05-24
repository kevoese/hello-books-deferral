import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AuthNavbar = () => {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-white-500 pt-5 p-3 shadow-lg">
            <div className="flex items-center flex-shrink-0 text-dark mr-6">
                <Link to="/">
                    <img className="w-full " src="/images/hello_books.png" />
                </Link>
            </div>
            <div className="flex">
                <div className="flex mr-2">
                    <img
                        className="h-4 white fill-current mt-2"
                        src="/images/notify.svg"
                    />
                    <span className="bg-red-700 h-1 w-1 float-right rounded-full absolute ml-3 mt-2" />
                </div>
                <img
                    className="h-8 rounded-full"
                    src="https://via.placeholder.com/150"
                />
            </div>
        </nav>
    );
};

export default AuthNavbar;
