import React from 'react';
import TableContent from '@components/TableContent/index.js';

const BookRow = ({ contents, transform, action }) => {
    const List = contents.length ? (
        contents.map((content, index) => {
            return (
                <TableContent key={index} transform={transform}>
                    {content}
                </TableContent>
            );
        })
    ) : (
        <TableContent>No content</TableContent>
    );
    return (
        <section className="border-b flex bg-transparent border-gray-300">
            {List}
            {action ? (
                <TableContent action transform={transform}>
                    {action}
                </TableContent>
            ) : (
                ''
            )}
        </section>
    );
};

export default BookRow;
