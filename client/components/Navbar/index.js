import React, { useState, useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classJoin from 'classnames';
import context from '@context/authContext';
import SignedIn from '@components/SignedIn/index';
import SignedOut from '@components/SignedOut/index';

const { AuthContext } = context;

const Navbar = () => {
    const [auth, setAuth, isAuth] = useContext(AuthContext);
    const [isVisible, changeVisibility] = useState(false);
    const classToggle = classJoin({
        block: isVisible,
        hidden: !isVisible
    });

    const view = isAuth() ? <SignedOut /> : <SignedIn />;

    return (
        <nav className="flex items-center justify-between flex-wrap bg-white-500 pt-5 p-3 z-40">
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
                    <NavLink
                        className="font-raleway block font-semibold md:text-lg lg:text-lg xl:text-lg text-sm lg:mr-8 mt-4 lg:inline-block lg:mt-0 text-dark-200 hover:text-dark"
                        to="/"
                        exact
                        activeClassName="border-blue-450 pb-1 border-b-2"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        className="font-raleway block font-semibold  md:text-lg lg:text-lg xl:text-lg lg:mr-8 mt-4 lg:inline-block lg:mt-0 text-dark-200 hover:text-dark"
                        to="/books"
                        activeClassName="border-blue-450 pb-1 border-b-2"
                    >
                        Library Catalogue
                    </NavLink>

                    <NavLink
                        className="font-raleway block font-semibold  md:text-lg lg:text-lg xl:text-lg mr-8 mt-4 lg:inline-block lg:mt-0 text-dark-200 hover:text-dark"
                        to="#"
                        exact
                        activeClassName="border-blue-450 pb-1 border-b-2"
                    >
                        FAQs
                    </NavLink>
                </div>
                {view}
            </div>
        </nav>
    );
};

export default Navbar;
