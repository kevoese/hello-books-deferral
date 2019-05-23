import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '@components/Footer';
import Book from '@components/Book';

const Home = () => {
    return (
        <div>
            <div className="xl:flex lg:flex block p-5 m-10 mb-4">
                <div className="block xl:flex-1 lg:flex-1  text-dark  ">
                    <div className="xl:pt-24 xl:mt-18 xl:pr-32  lg:pt-32 lg:mt-18 lg:pr-32 ">
                        <h1 className="font-raleway leading-tight sm:text-3xl md:text-4xl lg-text-5xl xl:text-5xl text-2xl">
                            Get unlimited & full access to books on the go
                        </h1>
                        <h6 className="font-raleway text-base sm:text-lg md:text-xl pt-4 pb-12 text-dark-400 ">
                            You can borrow books, extend your lease period pick
                            up at any your convenience
                        </h6>
                        <div className=" m-auto text-center xl:text-left lg:text-left mb-8 ">
                            <Link
                                to="/books"
                                className="font-raleway text-sm md:text-base lg:text-xl xl:text-xl px-4 py-2 pt-3 pb-3  xl:pt-4 xl:pb-4 lg:pt-4 lg:pb-4 pr-10 pl-10 xl:pr-20 xl:pl-20 lg:pr-16 lg:pl-16 md:pr-10 md:pl-10 border-500 rounded-full text-white border border-blue-500 bg-blue-500 mt-4 shadow-lg"
                            >
                                Explore Now
                            </Link>
                        </div>
                    </div>
                </div>
                <div className=" block xl:flex-1 lg:flex-1 pt-8 m-auto  ">
                    <img
                        className="w-full lg:pr-10 lg:pl-10 xl:pr-10 xl:pl-10 "
                        src="/images/lady_reading_book.png"
                        alt="Lady reading books"
                    />
                </div>
            </div>

            {/* home page search bar */}
            <div className="relative block lg:flex -mb-4  w-md mx-auto md:mr-28 md:ml-28 lg:mr-32 lg:ml-32  xl:mr-40 xl:ml-40  pt-10 pb-10 p-6 bg-white rounded-lg shadow-xl">
                <div className="block lg:flex-initial xl:flex-initial xl:pl-10 lg:pl-10 w-full">
                    <input
                        className="font-raleway w-full shadow appearance-none  border border-blue-500 rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="search"
                        type="text"
                        placeholder="Search e.g 'Harry Porter'"
                    />
                </div>
                <div className="block w-full lg:flex-1 xl:flex-1 xl:pr-10  lg:pr-10 ">
                    <Link
                        className="font-raleway block w-full text-center text-sm px-4 py-2 pr-10 pl-10 border-500 rounded-r text-white border border-blue-500 bg-blue-500 hover:border-white mt-4 shadow lg:mt-0"
                        to="/"
                    >
                        Search
                    </Link>
                </div>
            </div>

            {/* second section */}
            <div className="flex-none w-full bg-gray-50 -mr-4 ">
                <h1 className="font-raleway text-center text-4xl pt-20 ">
                    We bring the library to you
                </h1>
                <div className="m-auto">
                    <svg
                        width="40"
                        height="2"
                        viewBox="0 0 40 2"
                        className="m-auto"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <line
                            y1="1"
                            x2="26"
                            y2="1"
                            stroke="#009DEE"
                            strokeWidth="2"
                        />
                        <line
                            x1="30"
                            y1="1"
                            x2="40"
                            y2="1"
                            stroke="#009DEE"
                            strokeWidth="2"
                        />
                    </svg>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row bg-gray-50 pt-10 pb-24 ">
                <div className="flex flex-col w-3/3 mt-8  lg:h-72 lg:w-1/3 mx-4">
                    <img
                        className="w-3/3 m-auto pt-5 pb-5 pr-10 pl-10 "
                        src="/images/read.png"
                        alt="reading list"
                    />
                    <h6 className="text-center leading-tight font-raleway pt-5 pb-5 text-dark-500 text-2xl ">
                        Draw up a reading list
                    </h6>
                    <p className="text-justify leading-none font-raleway pb-5 pr-16 pl-16  text-dark-300 text-xs ">
                        {' '}
                        You choose want and when your favourite book for pick
                        up. No hidden charges
                    </p>
                </div>

                <div className="flex flex-col w-3/3 mt-8  lg:h-72 lg:w-1/3 mx-4">
                    <img
                        className="w-3/3 m-auto pt-5 pb-5 pr-10 pl-10 "
                        src="/images/book.png"
                        alt="book online"
                    />
                    <h6 className="text-center leading-tight font-raleway pt-5 pb-5 text-dark-500 text-2xl ">
                        Make booking online
                    </h6>
                    <p className="text-justify leading-none font-raleway pb-5 pr-16 pl-16  text-dark-300 text-xs ">
                        {' '}
                        You choose want and when your favourite book for pick
                        up. No hidden charges
                    </p>
                </div>

                <div className="flex flex-col w-3/3 mt-8  lg:h-72 lg:w-1/3 mx-4">
                    <img
                        className="w-3/3 m-auto pt-5 pb-5 pr-10 pl-10 "
                        src="/images/man_read.png"
                        alt="man reading books"
                    />
                    <h6 className="text-center leading-tight font-raleway pt-5 pb-5 text-dark-500 text-2xl ">
                        Read as much as you want
                    </h6>
                    <p className="text-justify leading-none font-raleway pb-5 pr-16 pl-16  text-dark-300 text-xs ">
                        {' '}
                        You choose want and when your favourite book for pick
                        up. No hidden charges
                    </p>
                </div>
            </div>

            {/* import book slider component */}
            <div className="w-full pt-6 pb-20">
                <h1 className="font-raleway text-center text-4xl pt-10 ">
                    Books from our library
                </h1>
                <div className="m-auto">
                    <svg
                        width="40"
                        height="2"
                        viewBox="0 0 40 2"
                        className="m-auto"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <line
                            y1="1"
                            x2="26"
                            y2="1"
                            stroke="#009DEE"
                            strokeWidth="2"
                        />
                        <line
                            x1="30"
                            y1="1"
                            x2="40"
                            y2="1"
                            stroke="#009DEE"
                            strokeWidth="2"
                        />
                    </svg>
                </div>

                {/* import slider component */}
                <div className="w-full flex flex-col items-center lg:flex-row lg:h-80 lg:justify-between pt-16 pr-5 pl-5">
                    <Book />
                    <Book />
                    <Book />
                </div>

                <div className="m-auto text-center pt-16 pb-6">
                    <Link
                        className="font-raleway inline-block text-center text-xl  px-4 py-2 pr-16 pl-16 border-400 border-blue-450 rounded-full text-blue-450 bg-white border hover:border-transparent hover:bg-white mt-4 shadow-lg lg:mt-0"
                        to="/books"
                    >
                        Browse All
                    </Link>
                </div>
            </div>

            {/* call to action */}
            <div className="w-full bg-blue-450 pt-10 pb-10">
                <h1 className="font-raleway text-white text-center leading-snug tracking-normal pr-10 pl-10 xl:pl-64 xl:pr-64 text-xl md:text-4xl pt-10 ">
                    Ready to explore our library and get unlimited access to
                    your favourite books?
                </h1>

                <div className="m-auto text-center pt-10 pb-6">
                    <Link
                        className="font-raleway inline-block text-center text-lg  px-4 py-2 pr-10 pl-10 border-400 rounded-full text-blue-450 bg-white border hover:border-transparent hover:bg-white mt-4 shadow-2xl lg:mt-0"
                        to="/signup"
                    >
                        Get Started
                    </Link>

                    <div className="relative hidden lg:block lg:-mt-24  ">
                        <img
                            className="p-2 w-24"
                            src="/images/book_icon_hello_books.png"
                            alt="Book icon"
                        />
                    </div>
                </div>
            </div>

            <div className="w-full pt-20 pb-20">
                <h1 className="font-raleway text-center text-4xl pt-10 ">
                    FAQs
                </h1>
                <div className="m-auto">
                    <svg
                        width="40"
                        height="2"
                        viewBox="0 0 40 2"
                        className="m-auto"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <line
                            y1="1"
                            x2="26"
                            y2="1"
                            stroke="#009DEE"
                            strokeWidth="2"
                        />
                        <line
                            x1="30"
                            y1="1"
                            x2="40"
                            y2="1"
                            stroke="#009DEE"
                            strokeWidth="2"
                        />
                    </svg>
                </div>

                <div className="flex flex-col lg:flex-row">
                    <div className=" flex flex-col m-auto w-2/2 pt-16 pr-2 pl-2 md:pr-10 md:pl-10">
                        <div className="pr-8 pl-8 font-bold border-blue-450 border-l-2 shadow-2xl  rounded-r-sm rounded-b-sm">
                            <div className="flex flex-row">
                                <div className="flex flex-col flex-initial w-2/2">
                                    <p className="pt-6 pb-6 font-raleway text-lg">
                                        How long does it takes to return a
                                        borrowed book?
                                    </p>
                                </div>
                                <div className="flex flex-col w-2/2 pt-6 pl-24  ">
                                    <svg
                                        width="15"
                                        height="30"
                                        className="text-left"
                                        viewBox="0 0 20 30"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1.77588 1.79785L16.7759 14.8453L1.77588 28.376"
                                            stroke="#D5D6DB"
                                            strokeWidth="3"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className={` w-2/2 pt-16 pr-2 pl-2 `}>
                            <p className="m-auto ">
                                You can borrow a book for a month after which
                                you will be fined
                                <br /> for extra days above the borrowing period
                            </p>
                        </div>
                    </div>

                    <div className=" flex flex-col m-auto w-2/2 pt-16 pr-2 pl-2 md:pr-10 md:pl-10">
                        <div className="pr-8 pl-8 font-bold border-blue-450 border-l-2 shadow-2xl  rounded-r-md rounded-b-md">
                            <div className="flex flex-row">
                                <div className="flex flex-col flex-initial w-2/2">
                                    <p className="pt-6 pb-6 font-raleway text-lg">
                                        How much does it cost for borrowing a
                                        book?
                                    </p>
                                </div>
                                <div className="flex flex-col w-2/2 pt-6 pl-24  ">
                                    <svg
                                        width="15"
                                        height="30"
                                        className="text-left"
                                        viewBox="0 0 20 30"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1.77588 1.79785L16.7759 14.8453L1.77588 28.376"
                                            stroke="#D5D6DB"
                                            strokeWidth="3"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className={` w-2/2 pt-16 pr-2 pl-2 `}>
                            <p className="m-auto ">
                                You can borrow a book for as low as N3000
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row">
                    <div className=" flex flex-col m-auto w-2/2 pt-16 pr-2 pl-2 md:pr-10 md:pl-10">
                        <div className="pr-8 pl-8 font-bold border-blue-450 border-l-2 shadow-2xl  rounded-r-sm rounded-b-sm">
                            <div className="flex flex-row">
                                <div className="flex flex-col flex-initial w-2/2">
                                    <p className="pt-6 pb-6 font-raleway text-lg">
                                        How do I create an account?
                                    </p>
                                </div>
                                <div className="flex flex-col w-2/2 pt-6 pl-24  ">
                                    <svg
                                        width="15"
                                        height="30"
                                        className="text-left"
                                        viewBox="0 0 20 30"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1.77588 1.79785L16.7759 14.8453L1.77588 28.376"
                                            stroke="#D5D6DB"
                                            strokeWidth="3"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className={` w-2/2 pt-16 pr-2 pl-2 `}>
                            <p className="m-auto ">
                                Click on the register button to register with
                                us.
                            </p>
                        </div>
                    </div>

                    <div className=" flex flex-col m-auto w-2/2 pt-16 pr-2 pl-2 md:pr-10 md:pl-10">
                        <div className="pr-8 pl-8 font-bold border-blue-450 border-l-2 shadow-2xl  rounded-r-md rounded-b-md">
                            <div className="flex flex-row">
                                <div className="flex flex-col flex-initial w-2/2">
                                    <p className="pt-6 pb-6 font-raleway text-lg">
                                        How do I acess the books from my
                                        location?
                                    </p>
                                </div>
                                <div className="flex flex-col w-2/2 pt-6 pl-24  ">
                                    <svg
                                        width="15"
                                        height="30"
                                        className="text-left"
                                        viewBox="0 0 20 30"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1.77588 1.79785L16.7759 14.8453L1.77588 28.376"
                                            stroke="#D5D6DB"
                                            strokeWidth="3"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className={` w-2/2 pt-16 pr-2 pl-2 `}>
                            <p className="m-auto ">
                                You can only pick up the book from our library.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* partners logo */}
            <div className="pt-20 pb-20">
                <div className="flex flex-col lg:flex-row">
                    <div className="flex flex-col w-4/4 m-auto">
                        <img
                            className=" m-auto pt-5 pb-5 pr-10 pl-10 "
                            src="/images/figma_logo.png"
                            alt="reading list"
                        />
                    </div>
                    <div className="flex flex-col w-4/4  m-auto">
                        <img
                            className=" m-auto pt-5 pb-5 pr-10 pl-10 "
                            src="/images/andela.png"
                            alt="reading list"
                        />
                    </div>

                    <div className="flex flex-col w-4/4  m-auto">
                        <img
                            className=" m-auto pt-5 pb-5 pr-10 pl-10 "
                            src="/images/twilio_logo_red.png"
                            alt="reading list"
                        />
                    </div>
                    <div className="flex flex-col w-4/4  m-auto">
                        <img
                            className=" m-auto pt-5 pb-5 pr-10 pl-10 "
                            src="/images/nescafe_logo.png"
                            alt="reading list"
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
