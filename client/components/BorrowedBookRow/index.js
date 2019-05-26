import React from 'react';
import TableContent from '@components/Tablecontent';

const BookRow = props => {
    const { contents } = props;
    const List = contents.length ? (
        contents.map((content, index) => {
            return (
                <TableContent key={index} index={index} {...props}>
                    {content}
                </TableContent>
            );
        })
    ) : (
        <TableContent>No content</TableContent>
    );
    return (
        <section className="border-b flex bg-transparent hover:bg-gray-10 border-gray-300">
            {List}
        </section>
    );
};

export default BookRow;
