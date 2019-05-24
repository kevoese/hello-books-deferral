import React from 'react';

const Book = props => {
    return (
        <div
            className="relative flex flex-col h-72 w-3/4 bg-transparent shadow-md mt-8
        lg:h-64 lg:w-1/3 mx-4 cursor-pointer"
        >
            <div className="flex justify-center mt-4">
                <img
                    src="/images/notebook.png"
                    className="h-40 w-40 justify-center z-30"
                />
            </div>
            <div
                className="absolute inset-x-0 bottom-1 border border-gray-100 h-40 mx-3
            flex flex-row justify-between p-2"
            >
                <div className="flex flex-col w-3/5 mt-24 pt-2">
                    <p className="text-xxs tracking-wider text-base font-robotoMono">
                        {props.title}
                    </p>
                    <p className="text-sm text-gray-700 font-robotoMono tracking-tight">
                        {props.author}
                    </p>
                </div>

                <div className="flex flex-col w-2/5 mt-24 items-end">
                    <p className="uppercase text-red-400 font-semibold text-xs font-semibold font-robotoMono mt-2">
                        {props.status}
                    </p>
                    <p className="font-semibold">N{props.price}</p>
                </div>
            </div>
        </div>
    );
};

export default Book;
