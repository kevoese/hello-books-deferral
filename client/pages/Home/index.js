import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <div className="xl:flex lg:flex block p-5">
                <div className="block xl:flex-1 lg:flex-1  text-dark  ">
                    <div className="xl:pt-20 xl:mt-18 xl:pr-10  lg:pt-20 lg:mt-18 lg:pr-10">
                        <h1 className="font-raleway sm:text-3xl md:text-4xl lg-text-5xl xl:text-5xl text-2xl">
                            Get unlimited & full access to books on the go
                        </h1>
                        <h6 className="font-raleway text-base sm:text-lg md:text-xl pt-4 pb-12 text-dark-400 ">
                            You can borrow books, extend your lease period pick
                            up at any your convenience
                        </h6>
                        <div className=" m-auto text-center xl:text-left lg:text-left mb-8 ">
                            <Link
                                to="/"
                                className="font-raleway text-sm md:text-base lg:text-xl xl:text-xl px-4 py-2 pt-3 pb-3  xl:pt-4 xl:pb-4 lg:pt-4 lg:pb-4 pr-10 pl-10 xl:pr-20 xl:pl-20 lg:pr-16 lg:pl-16 md:pr-10 md:pl-10 border-500 rounded-full text-white border border-blue-500 bg-blue-500 mt-4 shadow-lg"
                            >
                                Explore Now
                            </Link>
                        </div>
                    </div>
                </div>
                <div className=" block xl:flex-1 lg:flex-1 pt-8 m-auto ">
                    <img
                        className="w-full lg:pr-10 lg:pl-10 xl:pr-10 xl:pl-10 "
                        src="/images/lady_reading_book.png"
                        alt="Lady reading books"
                    />
                </div>
            </div>

            <div className="block lg:flex xl:flex w-md mx-auto md:mr-28 md:ml-28 lg:mr-32 lg:ml-32  xl:mr-40 xl:ml-40 mt-6 mb-6  md:mt-16 md:mb-16  xl:mt-16 xl:mb-16  lg:mt-16 lg:mb-16 pt-10 pb-10 p-6 bg-white rounded-lg shadow-xl">
                <div className="block lg:flex-initial xl:flex-initial xl:pl-10 lg:pl-10 w-full">
                    <input
                        className="font-raleway w-full shadow appearance-none  border border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="search"
                        type="text"
                        placeholder="Search e.g 'Harry Porter'"
                    />
                </div>
                <div className="block w-full lg:flex-1 xl:flex-1 xl:pl-2 xl:pr-10 lg:pl-2 lg:pr-10 ">
                    <Link
                        className="font-raleway block w-full text-center text-sm px-4 py-2 pr-10 pl-10 border-500 rounded text-white border border-blue-500 bg-blue-500 hover:border-white mt-4 shadow lg:mt-0"
                        to="/"
                    >
                        Search
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
