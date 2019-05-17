import React from 'react';

const Book = () => {
    return (
        <div
            className="relative flex flex-col shadow-md h-80 w-3/4 bg-transparent mt-8
        lg:h-72 lg:w-1/3 mx-4"
        >
            <div className="flex justify-center mt-6">
                <img
                    src="/images/notebook.png"
                    className="h-48 w-48 justify-center z-30"
                />
            </div>
            <div
                className="absolute inset-x-0 bottom-1 border border-gray-100 h-40 mb-2 mx-4 
            flex flex-row p-2 justify-between"
            >
                <div className="flex flex-col w-3/5 mt-24">
                    <p className="text-sm tracking-wider font-semibold text-base font-robotoMono">
                        Vuejs cookbook
                    </p>
                    <p className="text-sm text-gray-700 font-robotoMono tracking-tight">
                        Laura Gift
                    </p>
                </div>

                <div className="flex flex-col w-2/5 mt-24">
                    <p className="uppercase text-red-400 text-xs font-semibold font-robotoMono mt-2">
                        Unavailable
                    </p>
                    <p>N500</p>
                </div>
            </div>
        </div>
    );
};

export default Book;
