import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedIn = () => {
    return (
        <React.Fragment>
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
        </React.Fragment>
    );
};

export default SignedIn;
