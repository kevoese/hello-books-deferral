import React from 'react';

const ResetPassword = () => {
    return (
        <div
            className="absolute w-full h-full font-raleway"
            style={{ background: `url(/images/bg-12.png)` }}
        >
            <div className="absolute w-4/5 md:w-1/2 lg:w-2/5 inset-x-1/10 md:inset-x-1/4 lg:inset-x-3/10 inset-y-1/5 md:inset-y-1/5">
                <h2 className="text-3xl mb-3 text-center capitalize">
                    Reset Password
                </h2>
                <div className="bg-white rounded md:rounded-lg shadow md:shadow-md px-8 py-8 md:px-6 md:py-12 text-sm md:text-base leading-normal">
                    <form>
                        <div className="lg:mx-8">
                            <label className="inline-block w-1/3 lg:w-2/5">
                                New Password
                            </label>
                            <input
                                className="bg-gray-200 w-3/5 lg:w-3/5 p-2 rounded-lg inline"
                                name="email"
                                type="email"
                                placeholder="Enter new password"
                            />
                        </div>
                        <div className="lg:mx-8">
                            <label className="inline-block w-1/3 lg:w-2/5">
                                Confirm Password
                            </label>
                            <input
                                className="bg-gray-200 w-3/5 lg:w-3/5 mt-4 p-2 rounded-lg inline"
                                name="email"
                                type="email"
                                placeholder="Enter password again"
                            />
                        </div>
                        <input
                            className="block text-white border border-blue-500 bg-blue-500 shadow mx-auto px-5 py-2 md:px-6 rounded-full mt-4"
                            type="submit"
                            value="Submit"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
