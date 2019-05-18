import React from 'react';

const ForgotPassword = () => {
    return (
        <div className="absolute w-full h-full bg-gray-200">
            <div className="absolute w-3/5 md:w-1/2 lg:w-1/3 inset-1/5 md:inset-x-1/4 lg:inset-x-1/3 md:inset-y-1/5">
                <h2 className="text-3xl mb-3 text-center capitalize">
                    Reset Password
                </h2>
                <div className="bg-white rounded md:rounded-lg shadow md:shadow-md px-2 py-4 md:p-8 text-base md:text-lg leading-normal">
                    <form>
                        <div className="text-center">
                            <label className="inline">Email</label>
                            <input
                                className="bg-gray-200 w-4/5 ml-2 sm:ml-3 p-2 rounded-full inline"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                            />
                        </div>
                        <input
                            className="block bg-primary mx-auto px-5 py-2 md:px-6 rounded-full mt-4"
                            type="submit"
                            value="Reset"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
