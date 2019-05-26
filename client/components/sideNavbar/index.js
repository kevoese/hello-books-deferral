import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import context from '@context/authContext';
import { Redirect } from 'react-router-dom';

const { AuthContext } = context;

const SideNavbar = () => {
    const [auth, setAuth] = useContext(AuthContext);

    const signOut = () => {
        setAuth({ token: null, user: null });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        <Redirect to="/" />;
    };
    return (
        <React.Fragment>
            <div className="relative w-full md:w-1/6 bg-gray-960 text-center  text-gray-500">
                <NavLink
                    to="/dashboard"
                    exact
                    className="flex pb-0 cursor-pointer"
                >
                    <div className="w-1/4 text-center h-12 flex justify-center items-center">
                        <img
                            className="h-6 white fill-current"
                            src="/images/home-4-line.svg"
                        />
                    </div>
                    <div className="w-3/4 h-12 flex justify-start items-center ml-8">
                        Dashboard
                    </div>
                </NavLink>
                <NavLink to="/borrowed" className="flex pb-0 cursor-pointer">
                    <div className="w-1/4 text-center h-12 flex justify-center items-center">
                        <img
                            className="h-6  fill-current"
                            src="/images/book.svg"
                        />
                    </div>
                    <div className="w-3/4 h-12 flex justify-start items-center ml-8">
                        Borrowed Books
                    </div>
                </NavLink>
                <div className="flex pb-0 cursor-pointer">
                    <div className="w-1/4  text-center h-12 flex justify-center items-center">
                        <img
                            className="h-6  fill-current"
                            src="/images/b-books.svg"
                        />
                    </div>
                    <div className="w-3/4 h-12 flex justify-start items-center ml-8">
                        Favourite Books
                    </div>
                </div>
                <NavLink to="/fines" className="flex pb-0 cursor-pointer">
                    <div className="w-1/4  text-center h-12 flex justify-center items-center">
                        <img
                            className="h-6  fill-current"
                            src="/images/fines.svg"
                        />
                    </div>
                    <div className="w-3/4 h-12 flex justify-start items-center ml-8">
                        Fines
                    </div>
                </NavLink>
                <div className="flex pb-0 cursor-pointer">
                    <div className="w-1/4  text-center h-12 flex justify-center items-center">
                        <img
                            className="h-6  fill-current"
                            src="/images/user.svg"
                        />
                    </div>
                    <div className="w-3/4 h-12 flex justify-start items-center ml-8">
                        My Profile
                    </div>
                </div>
                <NavLink to="/profile" className="flex pb-0 cursor-pointer">
                    <div className="w-1/4  text-center h-12 flex justify-center items-center">
                        <img
                            className="h-6  fill-current"
                            src="/images/user.svg"
                        />
                    </div>
                    <div className="w-3/4 h-12 flex justify-start items-center ml-8">
                        My Profile
                    </div>
                </NavLink>
                <div className="flex pb-0 cursor-pointer" onClick={signOut}>
                    <div className="w-1/4  text-center h-12 flex justify-center items-center">
                        <img
                            className="h-6  fill-current"
                            src="/images/logout.svg"
                        />
                    </div>
                    <div className="w-3/4 h-12 flex justify-start items-center text-gray-500 ml-8">
                        SignOut
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default SideNavbar;
