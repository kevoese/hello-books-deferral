import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '@components/Footer';
import AdminSideNav from '@components/AdminSideNav';

const Dashboard = () => {
    return (
        <React.Fragment>
            <div className="flex md:flex-row flex-wrap min-h-screen">
                <AdminSideNav />

                <div className="w-full md:w-5/6 bg-gray-10 text-center text-gray-700 ">
                    <div className="m-2">
                        <div className=" bg-white flex py-16 mx-2 mt-6">
                            <div className="w-1/3 border-gray-100 border-r-2">
                                <h2 className="text-5xl text-black font-extrabold font-raleway pb-1">
                                    400
                                </h2>
                                <p className="font-semibold text-gray-700 font-raleway">
                                    BORROWED BOOKS
                                </p>
                            </div>
                            <div className="w-1/3 border-gray-100 border-r-2">
                                <h2 className="text-5xl text-black font-extrabold font-raleway pb-1">
                                    850
                                </h2>
                                <p className="font-semibold text-gray-700 font-raleway">
                                    ACTIVE USERS
                                </p>
                            </div>
                            <div className="w-1/3 border-gray-100 border-r-2">
                                <h2 className="text-5xl text-black font-extrabold font-raleway pb-1">
                                    3000
                                </h2>
                                <p className="font-semibold text-gray-700 font-raleway">
                                    LIBRARY CATALOGUE
                                </p>
                            </div>
                        </div>
                        <div className="flex mt-8 ">
                            <div className="w-full mx-2">
                                <div className="shadow-lg mr-2 bg-white">
                                    <h2 className="text-left text-gray-800 bg-white p-4 border-gray-100 border-b-2 font-raleway font-bold ">
                                        RECENTLY ADDED BOOKS (8)
                                    </h2>

                                    <table className="my-6  w-full">
                                        <thead>
                                            <tr className="bg-gray-10">
                                                <th className="font-raleway font-thin py-4 ">
                                                    TITLE
                                                </th>
                                                <th className="font-raleway font-thin py-4 ">
                                                    AUTHOR
                                                </th>
                                                <th className="font-raleway font-thin py-4 ">
                                                    YEAR
                                                </th>
                                                <th className="font-raleway font-thin py-4 ">
                                                    ISBN
                                                </th>
                                                <th className="font-raleway font-thin py-4 ">
                                                    COPIES AVAILABLE
                                                </th>
                                                <th className="font-raleway font-thin py-4 ">
                                                    ACTIONS
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="hover:bg-gray-10 border-b-2 border-gray-10 ">
                                                <td className="py-6 font-raleway  text-base">
                                                    Vuejs Cookbook
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    Kati Frantz
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    2019
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    123GH3KL2390
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    20
                                                </td>
                                                <td className="py-6 font-raleway text-blue-450 text-base">
                                                    <div className="flex justify-center">
                                                        <div className="flex  ">
                                                            <Link
                                                                to="/admin-dashboard"
                                                                className=" border-r pr-4"
                                                            >
                                                                View
                                                            </Link>
                                                        </div>
                                                        <div className="flex ">
                                                            <Link
                                                                to="/admin-dashboard"
                                                                className=" border-r pl-4  pr-4"
                                                            >
                                                                Edit
                                                            </Link>{' '}
                                                        </div>
                                                        <div className="flex ">
                                                            <Link
                                                                to="/admin-dashboard"
                                                                className="  pl-4"
                                                            >
                                                                Delete
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr className="hover:bg-gray-10 border-b-2 border-gray-10 ">
                                                <td className="py-6 font-raleway  text-base">
                                                    Vuejs Cookbook
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    Kati Frantz
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    2019
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    123GH3KL2390
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    20
                                                </td>
                                                <td className="py-6 font-raleway text-blue-450 text-base">
                                                    <div className="flex justify-center">
                                                        <div className="flex  ">
                                                            <Link
                                                                to="/admin-dashboard"
                                                                className=" border-r pr-4"
                                                            >
                                                                View
                                                            </Link>
                                                        </div>
                                                        <div className="flex ">
                                                            <Link
                                                                to="/admin-dashboard"
                                                                className=" border-r pl-4  pr-4"
                                                            >
                                                                Edit
                                                            </Link>{' '}
                                                        </div>
                                                        <div className="flex ">
                                                            <Link
                                                                to="/admin-dashboard"
                                                                className="  pl-4"
                                                            >
                                                                Delete
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr className="hover:bg-gray-10 border-b-2 border-gray-10 ">
                                                <td className="py-6 font-raleway  text-base">
                                                    Vuejs Cookbook
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    Kati Frantz
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    2019
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    123GH3KL2390
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    20
                                                </td>
                                                <td className="py-6 font-raleway text-blue-450 text-base">
                                                    <div className="flex justify-center">
                                                        <div className="flex  ">
                                                            <Link
                                                                to="/admin-dashboard"
                                                                className=" border-r pr-4"
                                                            >
                                                                View
                                                            </Link>
                                                        </div>
                                                        <div className="flex ">
                                                            <Link
                                                                to="/admin-dashboard"
                                                                className=" border-r pl-4  pr-4"
                                                            >
                                                                Edit
                                                            </Link>{' '}
                                                        </div>
                                                        <div className="flex ">
                                                            <Link
                                                                to="/admin-dashboard"
                                                                className="  pl-4"
                                                            >
                                                                Delete
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr className="hover:bg-gray-10 border-b-2 border-gray-10 ">
                                                <td className="py-6 font-raleway  text-base">
                                                    Vuejs Cookbook
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    Kati Frantz
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    2019
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    123GH3KL2390
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    20
                                                </td>
                                                <td className="py-6 font-raleway text-blue-450 text-base">
                                                    <div className="flex justify-center">
                                                        <div className="flex  ">
                                                            <Link
                                                                to="/admin-dashboard"
                                                                className=" border-r pr-4"
                                                            >
                                                                View
                                                            </Link>
                                                        </div>
                                                        <div className="flex ">
                                                            <Link
                                                                to="/admin-dashboard"
                                                                className=" border-r pl-4  pr-4"
                                                            >
                                                                Edit
                                                            </Link>{' '}
                                                        </div>
                                                        <div className="flex ">
                                                            <Link
                                                                to="/admin-dashboard"
                                                                className="  pl-4"
                                                            >
                                                                Delete
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr className="hover:bg-gray-10 border-b-2 border-gray-10 ">
                                                <td className="py-6 font-raleway  text-base">
                                                    Vuejs Cookbook
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    Kati Frantz
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    2019
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    123GH3KL2390
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    20
                                                </td>
                                                <td className="py-6 font-raleway text-blue-450 text-base">
                                                    <div className="flex justify-center">
                                                        <div className="flex  ">
                                                            <Link
                                                                to="/admin-dashboard"
                                                                className=" border-r pr-4"
                                                            >
                                                                View
                                                            </Link>
                                                        </div>
                                                        <div className="flex ">
                                                            <Link
                                                                to="/admin-dashboard"
                                                                className=" border-r pl-4  pr-4"
                                                            >
                                                                Edit
                                                            </Link>{' '}
                                                        </div>
                                                        <div className="flex ">
                                                            <Link
                                                                to="/admin-dashboard"
                                                                className="  pl-4"
                                                            >
                                                                Delete
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr className="hover:bg-gray-10 border-b-2 border-gray-10 ">
                                                <td className="py-6 font-raleway  text-base">
                                                    Vuejs Cookbook
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    Kati Frantz
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    2019
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    123GH3KL2390
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    20
                                                </td>
                                                <td className="py-6 font-raleway text-blue-450 text-base">
                                                    <div className="flex justify-center">
                                                        <div className="flex  ">
                                                            <Link
                                                                to="/admin-dashboard"
                                                                className=" border-r pr-4"
                                                            >
                                                                View
                                                            </Link>
                                                        </div>
                                                        <div className="flex ">
                                                            <Link
                                                                to="/admin-dashboard"
                                                                className=" border-r pl-4  pr-4"
                                                            >
                                                                Edit
                                                            </Link>{' '}
                                                        </div>
                                                        <div className="flex ">
                                                            <Link
                                                                to="/admin-dashboard"
                                                                className="  pl-4"
                                                            >
                                                                Delete
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr className="hover:bg-gray-10 border-b-2 border-gray-10 ">
                                                <td className="py-6 font-raleway  text-base">
                                                    Vuejs Cookbook
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    Kati Frantz
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    2019
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    123GH3KL2390
                                                </td>
                                                <td className="py-6 font-raleway  text-base">
                                                    20
                                                </td>
                                                <td className="py-6 font-raleway text-blue-450 text-base">
                                                    <div className="flex justify-center">
                                                        <div className="flex  ">
                                                            <Link
                                                                to="/admin-dashboard"
                                                                className=" border-r pr-4"
                                                            >
                                                                View
                                                            </Link>
                                                        </div>
                                                        <div className="flex ">
                                                            <Link
                                                                to="/admin-dashboard"
                                                                className=" border-r pl-4  pr-4"
                                                            >
                                                                Edit
                                                            </Link>{' '}
                                                        </div>
                                                        <div className="flex ">
                                                            <Link
                                                                to="/admin-dashboard"
                                                                className="  pl-4"
                                                            >
                                                                Delete
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <button className="bg-transparent text-blue-700 my-8 py-1 px-6 border border-blue-500  rounded-full">
                                        View All
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
};

export default Dashboard;
