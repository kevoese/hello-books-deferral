import React from 'react';

const Register = () => {
    return (
        <div
            className="bg-no-repeat bg-center bg-cover  flex flex-col justify-center items-center sm:h-screen"
            style={{ background: `url(/images/12.jpg)` }}
        >
            <div className="inline-block px-0 py-5 sm:w-9/12 max-w-custom w-500">
                <h1 className=" text-5xl text-gray-1200 text-center my-10 mt-0">
                    Register
                </h1>
                <form className="shadow-custom px-16 py-5 pb-8 sm:w-12/12 sm:rounded-custom bg-white text-center">
                    <div className="flex my-6 flex-wrap sm:flex-no-wrap">
                        <label
                            className="py-2 sm:w-5/12 w-full px-4 sm:px-0 text-lg text-gray-1100 text-left "
                            htmlFor="firstname"
                        >
                            FirstName
                        </label>
                        <input
                            className="outline-none h-10 text-base px-4 bg-gray-1000 sm:w-7/12 w-full rounded-full"
                            type="text"
                            id="firstName"
                        />
                    </div>
                    <div className="flex my-6 flex-wrap sm:flex-no-wrap">
                        <label
                            className="py-2 sm:w-5/12 w-full px-4 sm:px-0 text-lg text-gray-1100 text-left"
                            htmlFor="lastName"
                        >
                            LastName
                        </label>
                        <input
                            className="outline-none h-10 text-base px-4 bg-gray-1000 sm:w-7/12 w-full rounded-full"
                            type="text"
                            id="lastName"
                        />
                    </div>
                    <div className="flex my-6 flex-wrap sm:flex-no-wrap">
                        <label
                            className="py-2 sm:w-5/12 w-full px-4 sm:px-0 text-lg text-gray-1100 text-left"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="outline-none h-10 text-base px-4 bg-gray-1000 sm:w-7/12 w-full rounded-full"
                            type="text"
                            id="email"
                        />
                    </div>
                    <div className="flex my-6 flex-wrap sm:flex-no-wrap">
                        <label
                            className="py-2 sm:w-5/12 w-full px-4 sm:px-0 text-lg text-gray-1100 text-left"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="outline-none h-10 text-base px-4 bg-gray-1000 sm:w-7/12 w-full rounded-full"
                            type="password"
                            id="password"
                        />
                    </div>
                    <div className="flex my-6 flex-wrap sm:flex-no-wrap">
                        <label
                            className="py-2 sm:w-5/12 w-full px-4 sm:px-0 text-lg text-gray-1100 text-left"
                            htmlFor="password_confirm"
                        >
                            Confirm Password
                        </label>
                        <input
                            className="outline-none h-10 text-base px-4 bg-gray-1000 sm:w-7/12 w-full rounded-full"
                            type="password"
                            id="password_confirm"
                        />
                    </div>

                    <button className="bg-blue-1200 hover:shadow-md outline-none w-auto text-center text-base font-bold text-white text-lg rounded-full py-3 px-8">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
