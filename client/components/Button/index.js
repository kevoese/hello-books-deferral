import React from 'react';

const Button = ({ children, isSubmitting }) => {
    return (
        <button
            type="submit"
            disabled={isSubmitting}
            className="font-raleway focus:outline-none bg-blue-550 hover:shadow-md outline-none w-auto text-center text-base text-white rounded-full py-2 mt-4 px-10"
        >
            {children}
        </button>
    );
};

export default Button;
