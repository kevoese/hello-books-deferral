import React from 'react';
import classnames from 'classnames';

const Button = ({ clicked, children, isSubmitting }) => {
    return (
        <button
            type={clicked ? 'button' : 'submit'}
            onClick={clicked}
            disabled={isSubmitting}
            className={classnames(
                'font-raleway focus:outline-none bg-blue-550 hover:shadow-md outline-none w-auto text-center text-base text-white rounded-full mt-4 py-2 px-10',
                {
                    'bg-blue-550': !isSubmitting,
                    'bg-blue-400': isSubmitting
                }
            )}
        >
            {isSubmitting ? 'Working ...' : children}
        </button>
    );
};

export default Button;
