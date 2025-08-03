import React from 'react';

const DateRangePickers = ({ startDate, endDate, onChange }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onChange(name, value);
    };

    const renderDateInput = (label, name, value, placeholder = "Chọn ngày") => (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-semibold text-[#737373]">{label}</label>
            <div className="flex justify-between items-center w-full border border-[#E5E5E5] rounded-[8px] p-3">
                <input
                    type="text"
                    name={name}
                    value={value}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className="w-full text-[#737373] text-base outline-none"
                    onFocus={(e) => e.target.type = 'date'}
                    onBlur={(e) => {
                        if (!e.target.value) e.target.type = 'text';
                    }}
                />
            </div>
        </div>
    );

    return (
        <div className="flex gap-2">
            {renderDateInput("Từ ngày", "startDate", startDate)}
            {renderDateInput("Đến ngày", "endDate", endDate)}
        </div>
    );
};

export default DateRangePickers;
