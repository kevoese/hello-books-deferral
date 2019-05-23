import React from 'react';

const Input = ({ handleChange, handleBlur, ...rest }) => {
    return (
        <input
            {...rest}
            onChange={handleChange}
            onBlur={handleBlur}
            className="font-robotoMono outline-none h-8 text-base px-4 text-gray-550 bg-gray-250 w-full rounded-10"
        />
    );
};

export default Input;
