import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import context from '@context/authContext';

const { AuthContext } = context;

const SignedOut = () => {
    const [auth, setAuth] = useContext(AuthContext);
    return (
        <React.Fragment>
            <div className="text-sm text-center lg:mr-5 xl:mr-5" />
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
                    <span className="ml-4 font-raleway text-lg">
                        {auth.user.firstName}
                    </span>
                </NavLink>
            </div>
            <div className="text-sm text-center" />
        </React.Fragment>
    );
};

export default SignedOut;
