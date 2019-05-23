import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classJoin from 'classnames';

const Navbar = () => {
    const [isVisible, changeVisibility] = useState(false);
    const classToggle = classJoin({
        block: isVisible,
        hidden: !isVisible
    });

    return (
        <nav className="flex items-center justify-between flex-wrap bg-white-500 pt-5 p-3">
            <div className="flex items-center flex-shrink-0 text-dark mr-6">
                <Link to="/">
                    <img className="w-full " src="/images/hello_books.png" />
                </Link>
            </div>
            <div className="block lg:hidden">
                <button
                    className="flex items-center px-3 py-2 border navToggler rounded text-dark-200 border-dark-500 hover:text-dark hover:border-dark"
                    onClick={() => changeVisibility(!isVisible)}
                >
                    <svg
                        className="fill-current h-3 w-3"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div
                id="navLink"
                className={`${classToggle} w-full flex-grow lg:visible xl:visible lg:flex lg:items-center lg:w-auto`}
            >
                <div className="text-sm text-center m-auto pt-8 lg:pt-1 xl:pt-1">
                    <Link
                        className="font-raleway block font-semibold md:text-lg lg:text-lg xl:text-lg text-sm lg:mr-8 mt-4 lg:inline-block lg:mt-0 text-dark-200 hover:text-dark"
                        to="/"
                    >
                        Home
                        <div className=" lg:text-left xl:text-left">
                            <svg
                                width="40"
                                height="2"
                                className="lg:m-0 m-auto "
                                viewBox="0 0 40 2"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <line
                                    y1="1"
                                    x2="26"
                                    y2="1"
                                    stroke="#009DEE"
                                    strokeWidth="2"
                                />
                                <line
                                    x1="30"
                                    y1="1"
                                    x2="40"
                                    y2="1"
                                    stroke="#009DEE"
                                    strokeWidth="2"
                                />
                            </svg>
                        </div>
                    </Link>
                    <Link
                        className="font-raleway block font-semibold  md:text-lg lg:text-lg xl:text-lg lg:mr-8 mt-4 lg:inline-block lg:mt-0 text-dark-200 hover:text-dark"
                        to="/books"
                    >
                        Library Catalogue
                    </Link>

                    <Link
                        className="font-raleway block font-semibold  md:text-lg lg:text-lg xl:text-lg mr-8 mt-4 lg:inline-block lg:mt-0 text-dark-200 hover:text-dark"
                        to="/"
                    >
                        FAQs
                    </Link>
                </div>
                <div className="text-sm text-center lg:mr-5 xl:mr-5">
                    <Link
                        className="font-raleway inline-block text-sm px-4 py-2 pr-10 pl-10 border-400 rounded-full text-blue-500 border border-blue-500 hover:border-transparent hover:bg-white mt-4 shadow lg:mt-0"
                        to="/signin"
                    >
                        Sign In
                    </Link>
                </div>
                <div className="text-sm text-center">
                    <Link
                        className="font-raleway inline-block text-sm px-4 py-2 pr-10 pl-10 border-500 rounded-full text-white border border-blue-500 bg-blue-500 hover:border-white mt-4 shadow lg:mt-0"
                        to="/signup"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
