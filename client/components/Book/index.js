import React from 'react';

function controlLength(title){
    // title.length > 30 ? title.slice(0, 29) : title
    if(title.length > 25){
        return title.slice(0, 24) + '...';
    }
    return title;
}

const Book = props => {
    return (
        <div
            className="relative flex flex-col shadow-md h-72 w-3/4 bg-transparent mt-8
        lg:h-64 lg:w-1/3 mx-4"
        >
            <div className="flex justify-center mt-4">
                <img
                    src="/images/notebook.png"
                    className="h-40 w-40 justify-center z-30"
                />
            </div>
            <div
                className="absolute inset-x-0 bottom-1 border border-gray-100 h-40 mx-3
            flex flex-row justify-between"
            >
                <div className="flex flex-col w-3/5 mt-24">
                    <p className="text-xs tracking-wider font-semibold text-base font-robotoMono">
                        {controlLength(props.title)}
                    </p>
                    <p className="text-sm text-gray-700 font-robotoMono tracking-tight">
                        {props.author}
                    </p>
                </div>

                <div className="flex flex-col w-2/5 mt-24 items-end">
                    <p className="uppercase text-red-400 text-xs font-semibold font-robotoMono mt-2">
                        {props.status}
                    </p>
                    <p>N{props.price}</p>
                </div>
            </div>
        </div>
    );
};

export default Book;
