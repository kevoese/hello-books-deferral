import React from 'react';
import Input from '@components/Input';
import Textarea from '@components/TextArea';

const InputForm = props => {
    const { block, inputtype, name, labelname, errors, touched } = props;

    return (
        <div
            className={`flex mt-4 mb-0 flex-wrap sm:flex-no-wrap ${
                block == 'true' ? 'flex-col' : ''
            }`}
        >
            <label
                className={`font-raleway py-2  w-full px-4 mr-4 sm:px-0 text-base text-gray-550 text-left ${
                    block == 'true' ? '' : 'sm:w-4/12'
                }`}
                htmlFor={name}
            >
                {labelname || name}
            </label>
            <div
                className={`flex flex-col w-full ${
                    block == 'true' ? '' : 'sm:w-8/12'
                }`}
            >
                {inputtype ? <Textarea {...props} /> : <Input {...props} />}
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
