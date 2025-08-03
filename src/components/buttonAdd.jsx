import React from 'react';
import addIcon from '../assets/icons/add.svg';

const ButtonAdd = ({
    onClick,
    className = '',
    disabled = false,
    ...props
}) => {
    return (
        <button
            type="button"
            className={`fixed bottom-6 right-6 inline-flex items-center justify-center rounded-full p-4 w-12 h-12 bg-[#6366F1] text-white shadow-lg hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 cursor-pointer disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed z-50 ${className}`}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            aria-label="Add item"
            {...props}
        >
            <img
                src={addIcon}
                alt="Add"
                className="w-6 h-6 filter brightness-0 invert"
            />
        </button>
    );
};

export default ButtonAdd;
