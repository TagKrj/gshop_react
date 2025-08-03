import React, { useState } from 'react';

const TimeFilterChips = ({ selectedFilter, onFilterChange }) => {
    const timeOptions = ['1 tháng', '3 tháng', '6 tháng', '1 năm'];

    return (
        <div className="flex flex-wrap gap-2 py-1">
            {timeOptions.map((option) => (
                <button
                    key={option}
                    className={`rounded-full px-3 py-2 text-sm transition-colors cursor-pointer ${selectedFilter === option
                        ? 'bg-[#3538B5] text-white'
                        : 'bg-[#FAFAFA] text-[#404040]'
                        }`}
                    onClick={() => onFilterChange(option)}
                >
                    {option}
                </button>
            ))}
        </div>
    );
};

export default TimeFilterChips;
