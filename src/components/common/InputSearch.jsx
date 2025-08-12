import React from 'react';
import SearchIcon from '../../assets/icons/search-normal.svg';

const InputSearch = ({
    placeholder = "Tìm kiếm",
    value = "",
    onChange,
    className = "",
    ...props
}) => {
    return (
        <div className={`flex items-center flex-1 gap-2 px-4 py-3 bg-white border border-gray-200 rounded-[8px] focus-within:border-[#6366F1] focus-within:border-1 transition-colors duration-200 ${className}`}>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="flex-1 text-sm text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none"
                {...props}
            />
            <img
                src={SearchIcon}
                alt="Search"
                className="w-4 h-4 flex-shrink-0 cursor-pointer transition-all duration-200 hover:brightness-75"
            />
        </div>
    );
};

export default InputSearch;
