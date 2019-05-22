import React, { useState, useEffect, Fragment, useLayoutEffect } from 'react';
import axios from 'axios';
import Book from '@components/Book';

const BookRow = (props) => {
    return (
        <div className='w-full flex flex-col items-center
        lg:flex-row lg:h-80 lg:justify-between'>
            {props.props[0] || ''}
            {props.props[1] || ''}
            {props.props[2] || ''}
            {props.props[3] || ''}
        </div>
    )
}


const Books = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(20);
    const [url, setUrl] = useState(`/api/v1/books?page=${page}&limit=${limit}`);
    const [data, setData] = useState([]);
    
    const [isLoading, setIsLoading] = useState(false);
        

    const loadBooks = (data) => {
        if(data.length < 1) {
            console.log('okay');
        }
        const detail = [];
        data.map(item => {
            detail.push(<Book key={item.id} {...item}/>)
        });
        const row = [];
        for(let i=0; i< detail.length; i+=4){
            row.push(detail.slice(i, i+4))
        };
        const finishedRow = row.map((item, index) => (
            <BookRow key={index} props={item} />
        ))
        return finishedRow;
    }

    const fetchData = async () => {
        try {
            const response = await axios.get(url);
            setData(response.data.data.results)
            setTotalPages(response.data.data.total);
            setIsLoading(false);
        }catch(err){return err}
    }

    useEffect(() => {
        setIsLoading(true);
        fetchData();
    }, [url]);

    return(
        <Fragment>
            <div className='m-6 ml-4 mr-10'>
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
                    {isLoading ? console.log('...waiting'): loadBooks(data)}
                </div>
                <div className='mt-10 bg-green-100 w-full flex flex-row justify-end items-center'>
                    <div className='mr-2'>Page </div>
                    <div className='mr-2'>
                        <input className='bg-blue-200 text-center' value={page} onChange={e=>setPage(e.target.value)} 
                        type='number' name='page'/>
                    </div>
                    <div className='mr-2'>of</div>
                    <div className='mr-2'>{totalPages/limit}</div>
                    <button className='mx-2 bg-green-500 p-1 rounded-sm' 
                    onClick={() => setUrl(`/api/v1/books?page=${page}&limit=${limit}`)}>
                        View</button>
                </div>
            </div>
        </Fragment>
    )
}

export default Books;
