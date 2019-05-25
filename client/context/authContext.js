import React, { useState, createContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = props => {
    // localStorage.user
    const [auth, setAuth] = useState({
        token: localStorage.token || null,
        user: JSON.parse(localStorage.getItem('user')) || null
    });
    const isAuth = () => {
        if (auth.user) {
            return true;
        }
        return false;
    };

    const notGuest = prop_value => {
        if (auth.user) {
            let { from } = prop_value.location.state || {
                from: { pathname: '/dashboard' }
            };
            return <Redirect to={from} />;
        }
    };

    // const isAdmin = () => {
    //     if(this.auth.user.role === 'admin') {
    //         return true;
    //     }
    //     return false;
    // }
    return (
        <AuthContext.Provider value={[auth, setAuth, isAuth, notGuest]}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default { AuthContext, AuthProvider };
