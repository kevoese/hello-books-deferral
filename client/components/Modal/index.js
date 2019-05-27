import React, { useState, useEffect, useLayoutEffect } from 'react';

const Modal = ({ children, modalState }) => {
    const [modal, setModal] = useState('hidden');
    const closeModal = () => {
        setModal('hidden');
        document.body.style.overflowY = 'scroll';
    };

    const openModal = () => {
        setModal('block');
        document.body.style.overflowY = 'hidden';
    };

    useEffect(() => {
        modalState ? openModal() : closeModal();
    }, [modalState]);

    return (
        <div className={modal}>
            <div className="absolute inset-0 w-full h-full">
                <div className="fixed inset-0  w-full bg-gray-350" />
                <div className="inset-0 w-full h-full flex flex-col justify-center items-center fixed  overflow-scroll  py-20">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
