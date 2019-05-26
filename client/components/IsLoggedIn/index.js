import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import context from '@context/authContext';

const { AuthContext } = context;

const SignedIn = ({ auth, isPatron }) => {
    return (
        <React.Fragment>
            <div className="text-sm text-center lg:mr-5 xl:mr-5">
                <div className="text-sm text-center">
                    <NavLink
                        className="flex justify-center items-center"
                        to="/dashboard"
                    >
                        <img
                            className="h-12 rounded-full"
                            src={
                                auth.user.avatar ||
                                'https://via.placeholder.com/150'
                            }
                        />
                        <Link to={isPatron() ? '/dashboard' : '/admin-dashboard'}>
                            <span className="ml-4 font-raleway text-lg">
                                Hello, {auth.user.firstName}
                            </span>
                        </Link>
                    </NavLink>
                </div>
            </div>
        </React.Fragment>
    );
};

const SignedOut = () => (
    <React.Fragment>
        <div className="flex">
            <div className="text-sm text-center lg:mr-5 xl:mr-5">
                <NavLink
                    className="font-raleway inline-block text-sm px-4 py-2 pr-10 pl-10 border-400 rounded-full text-blue-500 border border-blue-500 hover:border-transparent hover:bg-white mt-4 shadow lg:mt-0"
                    to="/signin"
                >
                    Sign In
                </NavLink>
            </div>
            <div className="text-sm text-center">
                <NavLink
                    className="font-raleway inline-block text-sm px-4 py-2 pr-10 pl-10 border-500 rounded-full text-white border border-blue-500 bg-blue-500 hover:shadow-md mt-4 shadow lg:mt-0"
                    to="/signup"
                >
                    Register
                </NavLink>
            </div>
        </div>
    </React.Fragment>
);

const IsLoggedIn = () => {
    const [auth, setAuth, isAuth, isAdmin, isSuperAdmin, isPatron] = useContext(AuthContext);

    const view = isAuth() ? <SignedIn auth={auth} isPatron={isPatron}  /> : <SignedOut />;
    return <React.Fragment>{view}</React.Fragment>;
};

export default IsLoggedIn;
