import React from 'react';

const Input = ({ handleChange, ...rest }) => {
    return (
        <input
            {...rest}
            onChange={handleChange}
            className="font-robotoMono outline-none h-8 text-base px-4 text-gray-550 bg-gray-250 sm:w-7/12 w-full rounded-10"
        />
    );
};

export default Input;
