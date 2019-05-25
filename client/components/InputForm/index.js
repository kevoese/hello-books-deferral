import React from 'react';
import Input from '@components/Input';

const InputForm = props => {
    const { name, labelname, errors, touched } = props;

    return (
        <div className="flex mt-4 mb-0 flex-wrap sm:flex-no-wrap">
            <label
                className="font-raleway py-2 sm:w-4/12 w-full px-4 mr-4 sm:px-0 text-base text-gray-550 text-left"
                htmlFor={name}
            >
                {labelname || name}
            </label>
            <div className="flex flex-col w-full sm:w-8/12">
                <Input {...props} />
                {errors[name] && touched[name] && (
                    <span className="font-raleway py-0 w-full px-4 text-sm sm:px-0 text-red-600 text-left pt-1">
                        {errors[name]}
                    </span>
                )}
            </div>
        </div>
    );
};

export default InputForm;
