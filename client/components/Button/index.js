import React from 'react';

const Button = ({ clicked, children, isSubmitting }) => {
    return (
        <button
            type={clicked ? 'button' : 'submit'}
            onClick={clicked}
            disabled={isSubmitting}
            className="font-raleway focus:outline-none bg-blue-550 hover:shadow-md outline-none w-auto text-center text-base text-white rounded-full mt-4 py-2 px-10"
        >
            {children}
        </button>
    );
};

export default Button;
