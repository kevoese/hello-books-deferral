import React, { createContext, useState } from 'react';

const ToastContext = createContext();

const ToastProvider = props => {
    const [toast, setToast] = useState({
        type: null,
        message: null
    });

    const showToast = (type, message) => {
        setToast({
            type,
            message
        });

        setTimeout(() => {
            setToast({
                type: null,
                message: null
            });
        }, 3000);
    };

    return (
        <ToastContext.Provider value={[toast, showToast]}>
            {props.children}
        </ToastContext.Provider>
    );
};

export default { ToastContext, ToastProvider };
