import React from 'react';
import Input from '@components/Input';

const InputForm = props => {
    const { name, labelName, errors, touched } = props

    return (
        <div>
            <div className="flex mt-4 mb-0 flex-wrap sm:flex-no-wrap">
                <label
                    className="font-raleway py-2 sm:w-5/12 w-full px-4 sm:px-0 text-base text-gray-550 text-left "
                    htmlFor={name}
                >
                    {labelName || name}
                </label>
                <Input {...props} />
            </div>
            {errors[name] && touched[name] && (
                <span className="font-raleway py-0 sm:w-5/12 w-full px-4 text-sm sm:px-0 text-red-500 text-center ">
                    {errors[name]}
                </span>
            )}
        </div>
    );
};

export default InputForm;
