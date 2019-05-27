import React from 'react';

const Select = ({
    classes,
    background,
    handleChange,
    handleBlur,
    options,
    ...rest
}) => {
    return (
        <select
            {...rest}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`font-robotoMono outline-none h-8 text-base px-4 text-gray-550 ${classes ||
                'bg-gray-250'} w-full rounded-10`}
        >
            <option defaultValue> Select an option </option>

            {options.map(item => {
                return (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                );
            })}
        </select>
    );
};

export default Select;
