import React from 'react';

const Button = ({ children, isSubmitting }) => {
    return (
        <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-550 hover:shadow-md outline-none w-auto text-center text-base font-bold text-white text-lg rounded-full py-2 mt-2 px-8"
        >
            {children}
        </button>
    );
};

export default Button;
