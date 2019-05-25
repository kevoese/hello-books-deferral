import React, { useState, useEffect } from 'react';
import AuthNavbar from '@components/authNavbar/index';
import SideNavbar from '@components/sideNavbar/index';
import Footer from '@components/Footer/index';
import BorrowedBookRow from '@components/BorrowedBookRow/index';
import axios from 'axios';

const BorrowedBooks = () => {
    const headings = [
        'Title',
        'Author',
        'Year',
        'Due Date',
        'Status',
        'Action'
    ];
    const content = [
        {
            id: '1',
            title: 'Game of thrones',
            author: 'George R. R.',
            year: '2019',
            dueDate: '3rd nov 2019',
            status: 'active'
        },
        {
            id: '2',
            title: 'Vue js',
            author: 'Kati frantz',
            year: '2019',
            dueDate: '3rd nov 2019',
            status: 'active'
        },
        {
            id: '3',
            title: 'Game of thrones',
            author: 'George R. R.',
            year: '2019',
            dueDate: '3rd nov 2019',
            status: 'expired'
        }
    ];
    const [books, setbooks] = useState(content);

    useEffect(() => {});

    const bookList = books.length ? (
        books.map(book => {
            const { title, author, year, dueDate, status } = book;
            const bookObj = { title, author, year, dueDate, status };

            return (
                <BorrowedBookRow
                    key={book.id}
                    action={'Extend'}
                    contents={Object.values(bookObj)}
                />
            );
        })
    ) : (
        <BorrowedBookRow />
    );

    return (
        <div className="w-full md:w-5/6 bg-gray-20 text-center text-gray-700 px-4 py-4">
            <header className="font-raleway font-bold text-black px-2 text-2xl text-left mb-4">
                All Borrowed Books
            </header>
            <div className="px-2">
                <BorrowedBookRow
                    transform="uppercase font-semibold"
                    contents={headings}
                />
                <div className="bg-white">{bookList}</div>
            </div>
        </div>
    );
};

export default BorrowedBooks;
