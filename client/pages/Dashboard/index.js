import React from 'react';
import AuthNavbar from '@components/authNavbar/index';
import SideNavbar from '@components/sideNavbar/index';
import Button from '../../components/Button/index';

const Dashboard = () => {
    return (
        <React.Fragment>
            <AuthNavbar />
            <div className="flex md:flex-row flex-wrap min-h-screen">
                <SideNavbar />
                <div className="w-full md:w-5/6 bg-gray-250 text-center text-gray-700 ">
                    <div className="m-1">
                        <div className="h-32 bg-white flex py-4">
                            <div className="w-1/3 border-gray-100 border-r-2">
                                <h2 className="text-5xl font-extrabold">1</h2>
                                <p>BORROWED BOOKS</p>
                            </div>
                            <div className="w-1/3 border-gray-100 border-r-2">
                                <h2 className="text-5xl font-extrabold">2</h2>
                                <p>REQUESTED BOOKS</p>
                            </div>
                            <div className="w-1/3 border-gray-100 border-r-2">
                                <h2 className="text-5xl font-extrabold">3</h2>
                                <p>PENDING FINES</p>
                            </div>
                        </div>
                        <div className="flex mt-1">
                            <div className="w-4/6">
                                <div className="shadow-lg mr-2 bg-white">
                                    <h2 className="text-left bg-white p-2 border-gray-100 border-b-2 ">
                                        BORROWED BOOKS (3)
                                    </h2>

                                    <div className="flex justify-around">
                                        <div
                                            className="relative flex flex-col shadow-md h-60 w-3/4 mt-2 bg-transparent
              lg:h-72 lg:w-1/3 mx-4"
                                        >
                                            <div className="flex justify-center mt-6">
                                                <img
                                                    src="/images/notebook.png"
                                                    className="h-24 w-24 justify-center z-30"
                                                />
                                            </div>
                                            <div
                                                className="absolute inset-x-0 bottom-2 border border-gray-100 h-32 mb-2 mx-4 
                  flex flex-row p-2 justify-between"
                                            >
                                                <div className="flex flex-col w-3/5 mt-12">
                                                    <p className="text-left tracking-wider font-semibold text-base font-robotoMono">
                                                        Vuejs cookbook
                                                    </p>
                                                    <p className="text-sm text-left text-gray-700 font-robotoMono tracking-tight">
                                                        Laura Gift
                                                    </p>
                                                </div>

                                                <div className="flex flex-col w-2/5 mt-12 items-end">
                                                    <p className="uppercase text-red-400 text-xs font-semibold font-robotoMono mt-2">
                                                        Deadline
                                                    </p>
                                                    <p>4 days</p>
                                                </div>
                                            </div>
                                            <button className="absolute bottom-0 mb-2 text-white right-0 bg-blue-400  my-1  mr-4 px-20 rounded-full ">
                                                Extend
                                            </button>
                                        </div>

                                        <div
                                            className="relative flex flex-col shadow-md h-60 w-3/4 mt-2 bg-transparent
              lg:h-72 lg:w-1/3 mx-4"
                                        >
                                            <div className="flex justify-center mt-6">
                                                <img
                                                    src="/images/notebook.png"
                                                    className="h-24 w-24 justify-center z-30"
                                                />
                                            </div>
                                            <div className="absolute right-0 text-xs badge-overdue">
                                                <div className="badge-text font-bold text-white">
                                                    overdue
                                                </div>
                                            </div>
                                            <div
                                                className="absolute inset-x-0 bottom-2 border border-gray-100 h-32 mb-2 mx-4 
                  flex flex-row p-2 justify-between"
                                            >
                                                <div className="flex flex-col w-3/5 mt-12">
                                                    <p className="text-left tracking-wider font-semibold text-base font-robotoMono">
                                                        Vuejs cookbook
                                                    </p>
                                                    <p className="text-sm text-left text-gray-700 font-robotoMono tracking-tight">
                                                        Laura Gift
                                                    </p>
                                                </div>

                                                <div className="flex flex-col w-2/5 mt-12 items-end">
                                                    <p className="uppercase text-red-400 text-xs font-semibold font-robotoMono mt-2">
                                                        Expired
                                                    </p>
                                                </div>
                                            </div>
                                            <button className="absolute bottom-0 mb-2 right-0 bg-blue-400 text-white my-1  mr-4 px-20 rounded-full ">
                                                Extend
                                            </button>
                                        </div>
                                    </div>

                                    <button className="bg-transparent text-blue-700 my-4 py-1 px-6 border border-blue-500  rounded-full">
                                        View All
                                    </button>
                                </div>
                            </div>
                            <div className="w-2/6">
                                <div className="bg-white shadow-lg">
                                    <h2 className="text-left bg-white p-2 border-gray-100 border-b-2">
                                        Fines(3)
                                    </h2>
                                    <div className="flex justify-between items-center bg-white p-3">
                                        <div className="flex flex-col items-start">
                                            <h5>MISSING PAGES</h5>
                                            <p className="font-bold">N1,000</p>
                                            <p className="text-gray-500">
                                                May, 25 2019
                                            </p>
                                        </div>
                                        <button className=" bg-green-400 px-4 py-1 text-white rounded-full">
                                            Pay Now
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-center bg-white p-3">
                                        <div className="flex flex-col items-start">
                                            <h5>DAMAGED BOOKS</h5>
                                            <p className="font-bold">N15,000</p>
                                            <p className="text-gray-500">
                                                May, 25 2019
                                            </p>
                                        </div>
                                        <button className=" bg-green-400 px-4 py-1 text-white rounded-full">
                                            Pay Now
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-center bg-white p-3">
                                        <div className="flex flex-col items-start">
                                            <h5>MISSING PAGES</h5>
                                            <p className="font-bold">N10,000</p>
                                            <p className="text-gray-500">
                                                May, 25 2019
                                            </p>
                                        </div>
                                        <button className="bg-green-400 px-4 py-1 text-white rounded-full">
                                            Pay Now
                                        </button>
                                    </div>
                                    <button className="bg-transparent text-blue-700 my-4 py-1 px-6 border border-blue-500  rounded-full">
                                        View All
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex mt-12">
                            <div className="w-4/6">
                                <div className="shadow-lg mr-2 bg-white">
                                    <h2 className="text-left bg-white p-2 border-gray-100 border-b-2 ">
                                        BOOKS FROM YOUR FAVOURITE AUTHORS
                                    </h2>

                                    <div className="flex flex-col ">
                                        <div className="w-full">
                                            <div className="flex justify-between items-center bg-white p-3">
                                                <div className="flex ">
                                                    <img
                                                        src="/images/notebook.png"
                                                        className="h-24 w-24 justify-center z-30"
                                                    />
                                                    <div className="flex-col items-start">
                                                        <h5 className="text-sm font-robotoMono font-bold">
                                                            Vuejs cookbook
                                                        </h5>
                                                        <p className="text-left text-xs font-robotoMono tracking-tight">
                                                            John Doe
                                                        </p>
                                                        <p className=" text-left font-bold">
                                                            N1,000
                                                        </p>
                                                        <p className="text-gray-500 text-left text-orange-600">
                                                            AVAILABLE
                                                        </p>
                                                    </div>
                                                </div>
                                                <button className=" bg-blue-500 px-4 py-1 text-white rounded-full">
                                                    Get Now
                                                </button>
                                            </div>
                                        </div>

                                        <div className="w-full">
                                            <div className="flex justify-between items-center bg-white p-3">
                                                <div className="flex ">
                                                    <img
                                                        src="/images/notebook.png"
                                                        className="h-24 w-24 justify-center z-30"
                                                    />
                                                    <div className="flex-col items-start">
                                                        <h5 className="text-sm font-robotoMono font-bold">
                                                            Vuejs cookbook
                                                        </h5>
                                                        <p className="text-left text-xs font-robotoMono tracking-tight">
                                                            John Doe
                                                        </p>
                                                        <p className=" text-left font-bold">
                                                            N1,000
                                                        </p>
                                                        <p className="text-gray-500 text-left text-orange-600">
                                                            AVAILABLE
                                                        </p>
                                                    </div>
                                                </div>
                                                <button className=" bg-blue-500 px-4 py-1 text-white rounded-full">
                                                    Get Now
                                                </button>
                                            </div>
                                        </div>

                                        <div className="w-full">
                                            <div className="flex justify-between items-center bg-white p-3">
                                                <div className="flex ">
                                                    <img
                                                        src="/images/notebook.png"
                                                        className="h-24 w-24 justify-center z-30"
                                                    />
                                                    <div className="flex-col items-start">
                                                        <h5 className="text-sm font-robotoMono font-bold">
                                                            Vuejs cookbook
                                                        </h5>
                                                        <p className="text-left text-xs font-robotoMono tracking-tight">
                                                            John Doe
                                                        </p>
                                                        <p className=" text-left font-bold">
                                                            N1,000
                                                        </p>
                                                        <p className="text-gray-500 text-left text-orange-600">
                                                            AVAILABLE
                                                        </p>
                                                    </div>
                                                </div>
                                                <button className=" bg-blue-500 px-4 py-1 text-white rounded-full">
                                                    Get Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="bg-transparent text-blue-700 my-4 py-1 px-6 border border-blue-500  rounded-full">
                                        View All
                                    </button>
                                </div>
                            </div>

                            <div className="w-2/6">
                                <div className="bg-white shadow-lg">
                                    <h2 className="text-left bg-white p-2 border-gray-100 border-b-2">
                                        FAVOURITE AUTHORS
                                    </h2>
                                    <div className="flex justify-between items-center bg-white p-3">
                                        <div className="flex flex-col items-start">
                                            <div className="flex">
                                                <div className="h-12 w-12 flex justify-center items-center bg-blue-400 text-white rounded-full font-bold mr-1">
                                                    J
                                                </div>
                                                <div>
                                                    <h5 className="text-left text-sm font-bold">
                                                        J.K ROWLINGS
                                                    </h5>
                                                    <p className="text-left text-sm">
                                                        BOOKS (25)
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-1/4  text-center h-12 flex justify-center items-center">
                                            <img
                                                className="h-6  fill-current"
                                                src="/images/delete.svg"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center bg-white p-3">
                                        <div className="flex flex-col items-start">
                                            <div className="flex">
                                                <div className="h-12 w-12 flex justify-center items-center bg-blue-400 text-white rounded-full font-bold mr-1">
                                                    J
                                                </div>
                                                <div>
                                                    <h5 className="text-left text-sm font-bold">
                                                        J.K ROWLINGS
                                                    </h5>
                                                    <p className="text-left text-sm">
                                                        BOOKS (25)
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-1/4  text-center h-12 flex justify-center items-center">
                                            <img
                                                className="h-6  fill-current"
                                                src="/images/delete.svg"
                                            />
                                        </div>
                                    </div>

                                    <button className="bg-transparent text-blue-700 my-4 py-1 px-6 border border-blue-500  rounded-full">
                                        View All
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Dashboard;
