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
        if (auth && auth.user) {
            return true;
        }
        return false;
    };

    const isAdmin = () => {
        if (
            (auth.user && auth.user.role === 'admin') ||
            (auth.user && auth.user.role === 'super_admin')
        ) {
            return true;
        }
        return false;
    };

    const isPatron = () => {
        if (
            (auth.user && auth.user.role === 'patron')
        ) {
            return true;
        }
        return false;
    };
    

    const isSuperAdmin = () => {
        if (auth.user && auth.user.role === 'super_admin') {
            return true;
        }
        return false;
    };

    return (
        <AuthContext.Provider
            value={[auth, setAuth, isAuth, isAdmin, isSuperAdmin, isPatron]}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default { AuthContext, AuthProvider };
