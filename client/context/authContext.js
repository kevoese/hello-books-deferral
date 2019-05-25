import React, { useState, createContext } from 'react';

const AuthContext = createContext();

const AuthProvider = props => {
    const [auth, setAuth] = useState({
        token: localStorage.token || null,
        user: null
    });
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default { AuthContext, AuthProvider };
