import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import context from '@context/authContext';

const { AuthContext } = context;

const AuthNavbar = () => {
    const [auth, setAuth] = useContext(AuthContext);
    return (
        <nav className="flex items-center justify-between flex-wrap bg-white-500 p-3 shadow-lg">
            <div className="flex items-center flex-shrink-0 text-dark mr-6">
                <Link to="/">
                    <img className="w-full " src="/images/hello_books.png" />
                </Link>
            </div>
            <div className="flex">
                <div className="flex justify-center items-center mr-2">
                    <div className="relative">
                        <img
                            className="h-4 white fill-current mt-2"
                            src="/images/notify.svg"
                        />
                        <span className="bg-red-700 h-1 w-1 float-right rounded-full absolute ml-3 -mt-4" />
                    </div>
                </div>

                <img
                    className="h-12 rounded-full"
                    src={auth && auth.user.avatar || 'https://via.placeholder.com/150'}
                />
            </div>
        </nav>
    );
};

export default AuthNavbar;
