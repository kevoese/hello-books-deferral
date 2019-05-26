import React from 'react';

const TableContent = ({
    children,
    transform,
    action,
    extendBook,
    index,
    bookId
}) => {
    const actionKey = action && index > 4 ? true : false;
    const handleClick = e => {
        if (!actionKey) return;
        extendBook(bookId);
    };
    return (
        <div
            onClick={handleClick}
            className={`font-raleway text-sm w-2/12 py-4 px-1 flex justify-center items-center bg-transparent ${transform ||
                'capitalize'}  ${
                actionKey ? 'text-blue-450 cursor-pointer' : ''
            }`}
        >
            {children}
        </div>
    );
};

export default TableContent;
