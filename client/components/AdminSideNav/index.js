import React, { useContext } from 'react';
import context from '@context/authContext';
import { NavLink } from 'react-router-dom';

const { AuthContext } = context;

const AdminSideNav = () => {
    const [auth, setAuth, isAuth, isAdmin] = useContext(AuthContext);
    const signOut = () => {
        setAuth({ token: null, user: null });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const adminDash = (
        <NavLink
            to="/admin-dashboard"
            className="flex pb-0 cursor-pointer"
            activeClassName="border-l-4 border-blue-450  font-bold text-white"
        >
            <div className="w-1/4 bg-gray-950 text-center h-12 flex justify-center items-center">
                <img
                    className="h-6 white fill-current"
                    src="/images/admin.svg"
                />
            </div>
            <span className="w-3/4 h-12 flex justify-start items-center    ml-8 ">
                Admin Dashboard
            </span>
        </NavLink>
    );

    const books = (
        <NavLink
            to="/admin/library"
            className="flex pb-0 cursor-pointer"
            activeClassName="border-l-4 border-blue-450  font-bold text-white"
        >
            <div className="w-1/4  bg-gray-950 text-center h-12 flex justify-center items-center">
                <img className="h-6  fill-current" src="/images/book.svg" />
            </div>
            <div className="w-3/4 h-12 flex justify-start items-center   ml-8">
                Books
            </div>
        </NavLink>
    );

    const borrowedBooks = (
        <NavLink
            to="/borrowed"
            className="flex pb-0 cursor-pointer"
            activeClassName="border-l-4 border-blue-450  font-bold text-white"
        >
            <div className="w-1/4 bg-gray-950 text-center h-12 flex justify-center items-center">
                <img className="h-6  fill-current" src="/images/b-books.svg" />
            </div>
            <div className="w-3/4 h-12 flex justify-start items-center ml-8">
                Borrowed Books
            </div>
        </NavLink>
    );

    return (
        <React.Fragment>
            <div className="w-full md:w-1/6 bg-gray-800 text-center  text-gray-20">
                <div className="flex pb-0 ">
                    <div className="w-1/4 bg-gray-950 text-center h-8 flex justify-center items-center" />
                    <div className="w-3/4 h-8 flex justify-start items-center text-white ml-8 " />
                </div>

                {isAdmin() ? adminDash : ''}

                <NavLink
                    to="/dashboard"
                    className="flex pb-0 cursor-pointer"
                    activeClassName="border-l-4 border-blue-450  font-bold text-white"
                >
                    <div className="w-1/4 bg-gray-950 text-center h-12 flex justify-center items-center">
                        <img
                            className="h-6 white fill-current"
                            src="/images/home-4-line.svg"
                        />
                    </div>
                    <span className="w-3/4 h-12 flex justify-start items-center    ml-8 ">
                        Dashboard
                    </span>
                </NavLink>

                {isAdmin() ? books : ''}

                {!isAdmin() ? borrowedBooks : ''}

                <NavLink
                    to="/fines"
                    className="flex pb-0 cursor-pointer"
                    activeClassName="border-l-4 border-blue-450  font-bold text-white"
                >
                    <div className="w-1/4 bg-gray-950  text-center h-12 flex justify-center items-center">
                        <img
                            className="h-6  fill-current"
                            src="/images/fines.svg"
                        />
                    </div>
                    <div className="w-3/4 h-12 flex justify-start items-center ml-8">
                        Fines
                    </div>
                </NavLink>

                <NavLink
                    to="/profile"
                    className="flex pb-0 cursor-pointer"
                    activeClassName="border-l-4 border-blue-450  font-bold text-white"
                >
                    <div className="w-1/4 bg-gray-950  text-center h-12 flex justify-center items-center">
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
                    <div className="w-1/4 bg-gray-950  text-center h-12 flex justify-center items-center">
                        <img
                            className="h-6  fill-current"
                            src="/images/logout.svg"
                        />
                    </div>
                    <div className="w-3/4 h-12 flex justify-start items-center ml-8">
                        Sign Out
                    </div>
                </div>
                <div className="flex pb-0 ">
                    <div className="w-1/4 h-screen bg-gray-950 text-center h-8 flex justify-center items-center" />
                    <div className="w-3/4  flex justify-start items-center text-white ml-8 " />
                </div>
            </div>
        </React.Fragment>
    );
};

export default AdminSideNav;
