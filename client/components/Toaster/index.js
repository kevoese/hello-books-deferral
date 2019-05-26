import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import context from '@context/toastContext';

const Toaster = () => {
    const { ToastContext } = context;
    const [toast, showToast] = useContext(ToastContext);

    return (
        <React.Fragment>
            {toast.message && (
                <div className="fixed mt-6 z-50 w-full">
                    <div
                        className={classnames(
                            'w-full lg:w-1/4 rounded shadow-lg h-12 flex items-center justify-center text-white mx-auto',
                            {
                                'bg-green-500': toast.type === 'success',
                                'bg-red-500': toast.type === 'error'
                            }
                        )}
                    >
                        {toast.message}
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default Toaster;
