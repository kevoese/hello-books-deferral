import React from 'react';
import Book from '@components/Book';

const BookRow = () => {
    return (
        <div className='w-full flex flex-col items-center
        lg:flex-row lg:h-80 lg:justify-between'>
            <Book />
            <Book />
            <Book />
        </div>
    )
}


const Books = () => {
    return(
        <div className='m-6 ml-10 mr-20'>
            <div className='flex flex-col-reverse lg:flex-row mx-4'>
                <button className='flex flex-row items-center rounded p-2 mr-3 pr-10 pl-4 uppercase text-lg font-semibold
                tracking-widest text-black-1000 bg-blue-200 hover:bg-blue-300 bg-blue-11000 w-40 mt-6 lg:mt-0 self-end'>
                    <div className='pt-1'>
                        <div className='border-t-2 border-black w-3 mb-1' />
                        <div className='border-t-2 border-black w-3 mb-1' />
                        <div className='border-t-2 border-black w-3 mb-1' />
                    </div>
                    <p className='ml-2 font-raleway'>Filter</p>
                </button>
                <input type='text' placeholder='search for books' 
                className='bg-gray-200 rounded-full w-full p-2 text-black-1000
                focus:rounded-full pl-6 font-semibold text-sm font-raleway bg-light-gray' />
            </div>
            <div>
                <BookRow />
                <BookRow />
                <BookRow />
                <BookRow />

            </div>
        </div>
    )
}

export default Books;
