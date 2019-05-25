import React from 'react';

const TableContent = ({ children, transform, action }) => {
    return (
        <div
            className={`font-raleway text-sm w-2/12 py-6 bg-transparent ${transform ||
                'capitalize'}  ${action ? 'text-blue-450 cursor-pointer' : ''}`}
        >
            {children}
        </div>
    );
};

export default TableContent;
