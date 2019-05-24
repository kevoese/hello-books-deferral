import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SideNavbar = () => {
    return (
        <React.Fragment>
            <div className="w-full md:w-1/6 bg-gray-800 text-center text-gray-700">
                <div className="flex pb-0 cursor-pointer">
                    <div className="w-1/4 border-l-4 border-blue-500 text-center h-12 flex justify-center items-center">
                        <img
                            className="h-6 white fill-current"
                            src="/images/home-4-line.svg"
                        />
                    </div>
                    <div className="w-3/4 h-12 flex justify-start items-center text-white ml-8">
                        Dashboard
                    </div>
                </div>
                <div className="flex pb-0 cursor-pointer">
                    <div className="w-1/4  text-center h-12 flex justify-center items-center">
                        <img
                            className="h-6  fill-current"
                            src="/images/book.svg"
                        />
                    </div>
                    <div className="w-3/4 h-12 flex justify-start items-center text-gray-500 ml-8">
                        Borrowed Books
                    </div>
                </div>
                <div className="flex pb-0 cursor-pointer">
                    <div className="w-1/4  text-center h-12 flex justify-center items-center">
                        <img
                            className="h-6  fill-current"
                            src="/images/b-books.svg"
                        />
                    </div>
                    <div className="w-3/4 h-12 flex justify-start items-center text-gray-500 ml-8">
                        Favourite Books
                    </div>
                </div>
                <div className="flex pb-0 cursor-pointer">
                    <div className="w-1/4  text-center h-12 flex justify-center items-center">
                        <img
                            className="h-6  fill-current"
                            src="/images/fines.svg"
                        />
                    </div>
                    <div className="w-3/4 h-12 flex justify-start items-center text-gray-500 ml-8">
                        Fines
                    </div>
                </div>
                <div className="flex pb-0 cursor-pointer">
                    <div className="w-1/4  text-center h-12 flex justify-center items-center">
                        <img
                            className="h-6  fill-current"
                            src="/images/user.svg"
                        />
                    </div>
                    <div className="w-3/4 h-12 flex justify-start items-center text-gray-500 ml-8">
                        My Profile
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default SideNavbar;
